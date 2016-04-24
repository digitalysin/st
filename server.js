'use strict';

let Hapi = require('hapi')
let massive = require('massive')
let _ = require('lodash')

const server = new Hapi.Server()

const options = {
  opsInterval: 1000,
  filter: { access_token: 'Access Token Censored', password: 'Password Censored' },
  reporters: [{
    reporter: require('good-console'), events: { log: '*', response: '*', request: '*' }
  }]
}

server.app.db = massive.connectSync({ connectionString: process.env['CONNECTION_STRING']})

server.connection({ host: 'localhost', port: 9000 })

server.register({ register: require('good'), options: options }, (error) => {
  if(error) throw error
})

server.register({ register: require('hapi-boom-decorators') }, (error) => {
  if(error) throw error;
})

server.route({
  method: 'GET', path: '/', handler: (req, reply) => {
    return reply("Salestock API Endpoint")
  }
})

server.route(require('./routes/v1/categories'))
server.route(require('./routes/v1/products'))

module.exports = server
