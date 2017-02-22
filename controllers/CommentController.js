var Comment = require('../models/Comment')
var Promise = require('bluebird')

module.exports = {

  get: function (params) {
    return new Promise(function (resolve, reject) {

      Comment.find(params, function (err, comments) {
        if (err) {
          reject(er)
          return
        }

        resolve(comments)

      })
    })
  },

  getById: function (id) {
    return new Promise(function (resolve, reject) {

      Comment.findById(id, function (err, comment) {
        if (err) {
          reject(er)
          return
        }

        resolve(comment)
        
      })
    })
  },

  post: function (params) {
    return new Promise(function (resolve, reject) {

      Comment.create(params, function (err, comment) {
        if (err) {
          reject(er)
          return
        }

        resolve(comment)

      })
    })
  },

  delete: function (id) {
    return new Promise(function (resolve, reject) {

      Comment.findByIdAndRemove(id, function (err, comment) {
        if (err) {
          reject(err)
          return
        }

        resolve(comment)
      })
    })
  }

}