var express = require('express')
var router = express.Router()
var controllers = require('../controllers')
var bcrypt = require('bcryptjs')

router.get('/:action', function (req, res, next) {
  var action = req.params.action

  if (action == 'currentuser') {
    if (req.session == null) {
      res.status(200).json({
        user: null
      })
      return
    }

    if (req.session.user == null) {
      res.status(200).json({
        user: null
      })
      return
    }

    controllers.profile.getById(req.session.user)
      .then(function (profile) {
        res.status(200).json({
          user: profile
        })
      })
      .catch(function (err) {
        res.status(500).json({
          message: err
        })
      })
  }

  if (action == 'logout') {
    req.session.reset()
    res.status(204).json({
      message: 'logout'
    })
  }
})

router.post('/:action', function (req, res, next) {
  var action = req.params.action

  if (action == 'register') {
    controllers.profile.post(req.body)
      .then(function (profile) {
        req.session.user = profile._id
        res.status(200).json({
          user: profile
        })
      })
      .catch(function (err) {
        res.status(500).json({
          message: err
        })
      })
  }

  if (action == 'login') {
    controllers.profile.get({ username: req.body.username })
      .then(function (profiles) {
        if (profiles.length == 0) {
          res.status(404).json({
            message: 'Profile not found'
          })
          return
        }

        var profile = profiles[0]
        var isPasswordCorrect = bcrypt.compareSync(req.body.password, profile.password)
        if (isPasswordCorrect == false) {
          res.status(409).json({            
            message: 'Wrong Password!'
          })
          return
        }

        req.session.user = profile._id
        res.status(200).json({
          user: profile
        })
      })
      .catch(function (err) {
        res.status(500).json({          
          message: err
        })
      })
  }

})

module.exports = router