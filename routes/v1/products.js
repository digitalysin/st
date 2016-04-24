'use strict';

let joi = require('joi')
let ProductService = require('../../services/product_service')

module.exports = [

  {
    method: 'GET',
    path: '/v1/products',
    handler: (req, reply) => {
      new ProductService(req, reply).index()
    },
    config: {
      validate: {
        query: {
          category_id: joi.number().integer().positive(),
          color: joi.string(),
          priceMin: joi.number().integer().min(0),
          priceMax: joi.number().integer().min(1)
        }
      }
    }
  },

  {
    method: 'GET',
    path: '/v1/products/{id}',
    handler: (req, reply) => {
      new ProductService(req, reply).show()
    },
    config: {
      validate: {
        params: { id: joi.number().integer().positive().required() }
      }
    }
  },

  {
    method: 'POST',
    path: '/v1/products',
    handler: (req, reply) => {
      new ProductService(req, reply).create()
    },
    config: {
      validate: {
        payload: {
          name: joi.string().max(255).required(),
          color: joi.string().max(255).required(),
          size: joi.string().max(255).required(),
          price: joi.number().integer().positive().required(),
          category_id: joi.number().integer().positive()
        }
      }
    }
  },

  {
    method: 'PATCH',
    path: '/v1/products/{id}',
    handler: (req, reply) => {
      new ProductService(req, reply).update()
    },
    config: {
      validate: {
        params: {
          id: joi.number().integer().positive().required()
        },
        payload: {
          name: joi.string().max(255).required(),
          color: joi.string().max(255).required(),
          size: joi.string().max(255).required(),
          price: joi.number().integer().positive().required(),
          category_id: joi.number().integer().positive()
        }
      }
    }
  },

  {
    method: 'DELETE',
    path: '/v1/products/{id}',
    handler: (req, reply) => {
      new ProductService(reply, reply).destroy()
    },
    config: {
      validate: {
        params: { id: joi.number().integer().positive().required() }
      }
    }
  }

]
