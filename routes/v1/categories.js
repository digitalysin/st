'use strict';

let CategoryService = require('../../services/category_service')
let joi = require('joi')

module.exports = [
  /* --- show all categories */
  {
    method: 'GET',
    path: '/v1/categories',
    handler: (req, reply) => {
      new CategoryService(req, reply).index()
    }
  },

  /* --- show category */
  {
    method: 'GET',
    path: '/v1/categories/{id}',
    handler: (req, reply) => {
      new CategoryService(req, reply).show()
    },
    config: {
      validate: {
        params: { id: joi.number().required() }
      }
    }
  },

  /* --- create category */
  {
    method: 'POST',
    path: '/v1/categories',
    handler: (req, reply) => {
      new CategoryService(req, reply).create()
    },
    config: {
      validate: {
        payload: { name: joi.string().required() }
      }
    }
  },

  /* --- update category */
  {
    method: 'PATCH',
    path: '/v1/categories/{id}',
    handler: (req, reply) => {
      new CategoryService(req, reply).update()
    },
    config: {
      validate: {
        payload: { name: joi.string().required() },
        params: { id: joi.number().required() }
      }
    }
  },

  {
    method: 'DELETE',
    path: '/v1/categories/{id}',
    handler: (req, reply) => {
      new CategorryService(req, reply).destroy()
    },
    config: {
      validate: {
        params: { id: joi.number().required() }
      }
    }
  }
]
