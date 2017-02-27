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

  getByPhotoId: function (photo_id) {
    return new Promise(function (resolve, reject) {

      var filters = {
        sort: {
          timestamp: -1
        }
      }

      Comment.find({ photo_id: { $eq: photo_id } }, null, filters, function (err, comments) {
        if (err) {
          reject(er)
          return
        }

        resolve(comments)
        
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