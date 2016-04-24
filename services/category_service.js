'use strict';

let _ = require('lodash')

class CategoryService {

  constructor(request, reply) {
    this.request = request
    this.reply   = reply
    this.db = request.server.app.db
  }

  index() {
    let db = this.db

    db.categories.find({}, (error, categories) => {
      if(error) return this.reply.badImplementation()

      this.reply(categories)
    })
  }

  show() {
    let db = this.db
    let id = this.request.params.id

    db.categories.findOne({ id: id }, (error, category) => {
      if(error) return this.reply.badImplementation()

      if(_.isEmpty(category)) return this.reply.notFound()

      this.reply(category)
    })
  }

  create() {
    let db = this.db
    let payload = this.request.payload

    payload.created_at = new Date()
    payload.updated_at = new Date()

    db.categories.save(payload, (error, category) => {
      if(error) return this.reply.badImplementation()

      this.reply(category).code(201)
    })
  }

  update() {
    let db = this.db
    let id = this.request.params.id
    let payload = this.request.payload

    db.categories.findOne({ id: id }, (error, category) => {
      if(error) return this.reply.badImplementation()

      if(_.isEmpty(category)) return this.reply.badRequest()

      category.name = payload.name

      db.categories.save(category, (error, category) => {
        if(error) return this.reply.badImplementation()

        this.reply(category)
      })
    })
  }

  destroy() {
    let db = this.db
    let id = this.request.params.id

    db.categories.findOne({ id: id }, (error, category) => {
      if(error) this.reply.badImplementation()
      if(_.isEmpty(category)) this.reply.badRequest()

      db.categories.save(category, (error, category) => {
        this.reply(category)
      })
    })
  }

}

module.exports = CategoryService
