var express = require('express')
var router = express.Router()
var controllers = require('../controllers')
var bcrypt = require('bcryptjs')

router.get('/:action', function (req, res, next) {
  var action = req.params.action

  if (action == 'user') {
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

    controllers.profiles.getById(req.session.user)
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
    res.status(200).json({
      message: 'logout'
    })
  }
})

router.post('/:action', function (req, res, next) {
  var action = req.params.action

  if (action == 'register') {
    controllers.profiles.get({ username: req.body.username })
      .then(function (profiles) {
        if (profiles.length == 0) {
          controllers.profiles.post(req.body)
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
        }else{
      res.status(200).json({
        message:'Username has been used!'
      })
        }
      })
      .catch(function (err) {
        res.status(500).json({
          message: err
        })
      })
  }

  if (action == 'login') {
    controllers.profiles.get({ username: req.body.username })
      .then(function (profiles) {
        if (profiles.length == 0) {
          res.status(200).json({
            message: 'Wrong Username!'
          })
          return
        }

        var profile = profiles[0]
        var isPasswordCorrect = bcrypt.compareSync(req.body.password, profile.password)
        if (isPasswordCorrect == false) {
          res.status(200).json({
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