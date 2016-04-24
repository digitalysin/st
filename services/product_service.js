'use strict';

let _ = require('lodash')

class ProductService {
  constructor(request, reply) {
    this.request = request
    this.reply = reply
    this.db = request.server.app.db
  }

  index() {
    let db = this.db
    let request = this.request
    let query = request.query

    let criteria = []
    let values   = []
    let index    = 0

    let category_id = _.toInteger(_.get(query, 'category_id'))
    let color      = _.get(query, 'color')
    let priceMin   = _.toInteger(_.get(query, 'priceMin'))
    let priceMax   = _.toInteger(_.get(query, 'priceMax'))

    if(category_id > 0) {
      index += 1
      criteria.push("category_id = $" + index)
      values.push(category_id)
    }

    if(!_.isEmpty(color)) {
      index += 1
      criteria.push("color = $" + index)
      values.push(color)
    }

    if(priceMax > priceMin) {
      let priceMinIndex = index + 1
      let priceMaxIndex = index + 2
      criteria.push("price between $" + priceMinIndex + " AND $" + priceMaxIndex)
      values.push(priceMin)
      values.push(priceMax)
    }

    let sql = criteria.join(' OR ')

    if(!_.isEmpty(sql)) {
      db.products.where(sql, values, (error, products) => {
        if(error) return this.reply.badImplementation()
        
        this.reply(products)
      })
    }
    else {
      db.products.find({}, (error, products) => {
        if(error) return this.reply.badImplementation()
        
        this.reply(products)
      })
    }
  }

  show() {
    let db = this.db
    let request = this.request

    db.products.find({ id: request.params.id }, (error, product) => {
      if(error) return this.reply.badImplementation()
      if(_.isEmpty(product)) return this.reply.badRequest()

      this.reply(product)
    })
  }

  create() {
    let db = this.db
    let request = this.request

    let payload = request.payload

    payload.created_at = new Date()
    payload.updated_at = new Date()

    db.categories.findOne({ id: payload.category_id }, (error, category) => {
      if(error) return this.reply.badImplementation()

      if(_.isEmpty(category)) return this.reply.badRequest()

      db.products.save(payload, (error, product) => {
        if(error) return this.reply.badImplementation()

        this.reply(product).code(201)
      })
    })
  }

  update() {
    let db = this.db
    let request = this.request
    let payload = request.payload

    payload.updated_at = new Date()

    db.categories.findOne({ id: payload.category_id }, (error, category) => {
      if(error) return this.reply.badImplementation()

      if(_.isEmpty(category)) return this.reply.badRequest()

      db.products.findOne({ id: request.params.id }, (error, product) => {
        if(error) return this.reply.badImplementation()
        if(_.isEmpty(product)) return this.reply.badRequest()

        product = _.merge(product, payload)

        db.products.save(product, (error, product) => {
          if(error) return this.return.badImplementation()

          this.reply(product)
        })
      })

    })
  }
}

module.exports = ProductService
