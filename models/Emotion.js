const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const emotionSchema = new Schema({
      percentil: Number,
  }, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const Emotion = mongoose.model('Emotion', emotionSchema);
module.exports = Emotion;
