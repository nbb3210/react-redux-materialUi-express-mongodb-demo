var mongoose = require('mongoose')

var CommentSchema = new mongoose.Schema({
  profile_id: { type: String, default: '' },
  profile_name: { type: String, default: '' },
  photo_id: { type: String, default: '' },
  content: { type: String, default: '' },
  timestamp: { type: Date, default: Date.now }
})

module.exports = mongoose.model('CommentSchema', CommentSchema)