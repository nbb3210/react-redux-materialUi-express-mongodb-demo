var mongoose = require('mongoose')

var PhotoSchema = new mongoose.Schema({
  profile_id: { type: String, default: '' },
  profile_name: { type: String, default: '' },
  public_id: { type: String, default: '' },
  name: { type: String, default: '' },
  caption: { type: String, default: '' },
  url: { type: String, default: '' },
  src: { type: String, default: '' },
  timestamp: { type: Date, default: Date.now }
})

module.exports = mongoose.model('PhotoSchema', PhotoSchema)