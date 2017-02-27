var Photo = require('../models/Photo')
var Promise = require('bluebird')

module.exports = {

  get: function (params) {
    return new Promise(function (resolve, reject) {

      var filters = {
        sort: {
          timestamp: -1
        }
      }

      Photo.find(params, null, filters, function (err, photos) {
        if (err) {
          reject(er)
          return
        }

        resolve(photos)

      })
    })
  },

  getById: function (id) {
    return new Promise(function (resolve, reject) {

      Photo.findById(id, function (err, photo) {
        if (err) {
          reject(err)
          return
        }

        resolve(photo)

      })
    })
  },

  getByProfileId: function (profile_id) {
    return new Promise(function (resolve, reject) {

      var filters = {
        sort: {
          timestamp: -1
        }
      }

      Photo.find({ profile_id: { $eq: profile_id } }, null, filters, function (err, photos) {
        if (err) {
          reject(er)
          return
        }

        resolve(photos)
        
      })
    })
  },

  post: function (params) {
    return new Promise(function (resolve, reject) {

      Photo.create(params, function (err, photo) {
        if (err) {
          reject(er)
          return
        }

        resolve(photo)

      })
    })
  },

  delete: function (id) {
    return new Promise(function (resolve, reject) {

      Photo.findByIdAndRemove(id, function (err, photo) {
        if (err) {
          reject(err)
          return
        }

        resolve(photo)
      })
    })
  }

}