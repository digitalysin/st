'use strict';

let baseUrl = "http://localhost:9000/v1"

let assert = require('assert')
let massive = require('massive')
let connectionString = process.env['CONNECTION_STRING']
let db = massive.connectSync({ connectionString: connectionString })
let request = require('request')
let cmd = require('node-cmd')
let server = require('../server')

beforeEach((done) => {
  cmd.get('psql salestock_test -f ./db/migrate.sql', (data) => {
    server.start((error) => {
      done()
    })
  })
})

afterEach((done) => {
  server.stop(() => {
    done()
  })
})


describe('GET /categories', () => {
  describe('when categories does exist', () => {

    it('has content', (done) => {
      db.categories.saveSync({ name: 'shirt' })
      db.categories.saveSync({ name: 'hat' })

      request(baseUrl + '/categories', (error, response, body) => {

        let json = JSON.parse(body)
        let shirt = json[0]
        let hat   = json[1]

        assert.equal('shirt', shirt.name)
        assert.equal('hat', hat.name)
        assert.equal(2, json.length)
        done()
      })
    })

  })

  describe('when categories does not exist', () => {
    it('has no content', (done) => {
      db.runSync('truncate table categories')

      request(baseUrl + '/categories', (error, response, body) => {
        assert.equal(0, JSON.parse(body).length)
        done()
      })
    })
  })
})


describe('POST /categories', () => {
  describe('when name payload does not exists', () => {
    it('response with bad request', (done) => {
      request({ url: baseUrl + '/categories', method: 'POST', body: {}, json: true } , (error, response, body) => {
        assert.equal(400, response.statusCode)
        done()
      })
    })
  })

  describe('when name payload is not string', () => {
    it('response with bad request', (done) => {
      request({ url: baseUrl + '/categories', method: 'POST', body: { name: 1 }, json: true } , (error, response, body) => {
        assert.equal(400, response.statusCode)
        done()
      })
    })
  })

  describe('when sucessfully create a category', () => {
    it('response with 201', (done) => {
      request({ url: baseUrl + '/categories', method: 'POST', body: { name: 'hat' }, json: true }, (error, response) => {
        assert.equal(201, response.statusCode)
        done()
      })
    })
  })

})

describe('PATCH /categories', () => {

  describe('when category is not found', () => {
    it('response with bad request', (done) => {
      request({ url: baseUrl + '/categories/-1', method: 'PATCH', body: { name: 'hat' }, json: true}, (error, response, body) => {
        assert.equal(400, response.statusCode)
        done()
      })
    })
  })
})


/* the rest of the test should be the same .... */
