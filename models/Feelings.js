const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const feelingsSchema = new Schema({
  feeling: {
    type: String,
    enum: ['HAPPY', 'MEH', 'UNHAPPY'],
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});
const Feelings = mongoose.model('Feelings', feelingsSchema);
module.exports = Feelings;
