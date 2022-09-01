const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
      unique: true
   },
   link: {
      type: String,
      required: true,
      unique: true
   }
})
const ROOM = mongoose.model('ROOM', roomSchema)

module.exports = ROOM