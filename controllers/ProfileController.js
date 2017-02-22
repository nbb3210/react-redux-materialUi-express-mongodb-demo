var Profile = require('../models/Profile')
var Promise = require('bluebird')
var bcrypt = require('bcryptjs')

module.exports = {

  get: function (params) {
    return new Promise(function (resolve, reject) {

      Profile.find(params, function (err, profiles) {
        if (err) {
          reject(er)
          return
        }

        resolve(profiles)

      })
    })
  },

  getById: function (id) {
    return new Promise(function (resolve, reject) {

      Profile.findById(id, function (err, profile) {
        if (err) {
          reject(er)
          return
        }

        resolve(profile)

      })
    })
  },

  post: function (params) {
    return new Promise(function (resolve, reject) {

      if (params['password']) {
        params['password'] = bcrypt.hashSync(params.password, 10)
      }

      Profile.create(params, function (err, profile) {
        if (err) {
          reject(er)
          return
        }

        resolve(profile)

      })
    })
  }

}