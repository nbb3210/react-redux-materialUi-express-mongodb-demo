var ProfileController = require('./ProfileController')
var PhotoController = require('./PhotoController')
var CommentController = require('./CommentController')

module.exports = {

  profiles: ProfileController,
  photos: PhotoController,
  comments: CommentController

}