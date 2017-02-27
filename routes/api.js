var express = require('express')
var router = express.Router()
var controllers = require('../controllers')


router.get('/:resource', function (req, res, next) {
  var resource = req.params.resource
  var controller = controllers[resource]
  if (controller == null) {
    res.status(400).json({
      message: 'Invalid Resource'
    })
    return
  }

  controller.get()
    .then(function (results) {
      res.status(200).json({
        results: results
      })
    })
    .catch(function (err) {
      res.status(500).json({
        message: err
      })
    })

})

router.get('/:resource/:id', function (req, res, next) {
  var resource = req.params.resource
  var controller = controllers[resource]
  if (controller == null) {
    res.statuts(400).json({
      message: 'Invalid Resource'
    })
    return
  }

  controller.getById(req.params.id)
    .then(function (result) {
      res.status(200).json({
        result: result
      })
    })
    .catch(function (err) {
      res.status(500).json({
        message: err
      })
    })

})

router.delete('/:resource/:id', function (req, res, next) {
  var resource = req.params.resource
  var controller = controllers[resource]
  if (controller == null) {
    res.status(400).json({
      message: 'Invalid Resource'
    })
    return
  }

  controller.delete(req.params.id)
    .then(function (result) {
      res.status(204).json({
        result: {}
      })
    })
    .catch(function (err) {
      res.status(500).json({
        message: err
      })
    })

})

router.post('/:resource/', function (req, res, next) {
  var resource = req.params.resource
  var controller = controllers[resource]
  if (controller == null) {
    res.status(400).json({
      message: 'Invalid Resource'
    })
    return
  }

  controller.post(req.body)
    .then(function (result) {
      res.status(201).json({
        result: result
      })
    })
    .catch(function (err) {
      res.status(500).json({
        message: err
      })
    })

})

router.get('/profiles/:profile_id/photos', function (req, res, next) {
  controllers.photos.getByProfileId(req.params.profile_id)
    .then(function (results) {
      res.status(200).json({
        results: results
      })
    })
    .catch(function (err) {
      res.status(500).json({
        message: err
      })
    })
})

router.get('/photos/:photo_id/comments', function (req, res, next) {
  controllers.comments.getByPhotoId(req.params.photo_id)
    .then(function (results) {
      res.status(200).json({
        results: results
      })
    })
    .catch(function (err) {
      res.status(500).json({
        message: err
      })
    })
})

module.exports = router