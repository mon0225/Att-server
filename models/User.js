const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const Emotion = require("../models/Emotion");
const Feelings = require("../models/Feelings")

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  antiguedad: String,
  nivel: String,
  emotion: [Emotion.schema],
  feeling: [Feelings.schema],
  role: {
    type: String,
    enum: ['USER', 'ADMIN'],
    default: 'USER'
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
