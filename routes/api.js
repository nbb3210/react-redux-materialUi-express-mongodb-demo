var express = require('express')
var router = express.Router()
var controllers = require('../controllers')


router.get('/:resource', function (req, res, next) {
  var resource = req.params.resource
  var controller = controllers[resource]
  if (controller == null) {
    res.json({
      confirmation: 'fail',
      message: 'Invalid Resource'
    })
    return
  }

  controller.get(req.query)
    .then(function (results) {
      res.json({
        confirmation: 'success',
        results: results
      })
    })
    .catch(function (err) {
      res.json({
        confirmation: 'fail',
        message: err
      })
    })

})

router.get('/:resource/:id', function (req, res, next) {
  var resource = req.params.resource
  var controller = controllers[resource]
  if (controller == null) {
    res.json({
      confirmation: 'fail',
      message: 'Invalid Resource'
    })
    return
  }

  controller.getById(req.params.id)
    .then(function (result) {
      res.json({
        confirmation: 'success',
        result: result
      })
    })
    .catch(function (err) {
      res.json({
        confirmation: 'fail',
        message: 'Not Found'
      })
    })

})

router.get('/:resource/delete/:id', function (req, res, next) {
  var resource = req.params.resource
  var controller = controllers[resource]
  if (controller == null) {
    res.json({
      confirmation: 'fail',
      message: 'Invalid Resource'
    })
    return
  }

  controller.delete(req.params.id)
    .then(function (result) {
      res.json({
        confirmation: 'success',
        result: result
      })
    })
    .catch(function (err) {
      res.json({
        confirmation: 'fail',
        message: 'Not Found'
      })
    })

})

router.get('/:resource/others/:id', function (req, res, next) {
  var resource = req.params.resource
  var controller = controllers[resource]
  if (controller == null) {
    res.json({
      confirmation: 'fail',
      message: 'Invalid Resource'
    })
    return
  }

  controller.others(req.params.id)
    .then(function (results) {
      res.json({
        confirmation: 'success',
        results: results
      })
    })
    .catch(function (err) {
      res.json({
        confirmation: 'fail',
        message: err.message
      })
    })

})

router.post('/:resource/', function (req, res, next) {
  var resource = req.params.resource
  var controller = controllers[resource]
  if (controller == null) {
    res.json({
      confirmation: 'fail',
      message: 'Invalid Resource'
    })
    return
  }

  controller.post(req.body)
    .then(function (result) {
      res.json({
        confirmation: 'success',
        result: result
      })
    })
    .catch(function (err) {
      res.json({
        confirmation: 'fail',
        message: err
      })
    })

})

module.exports = router