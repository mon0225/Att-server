const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const testSchema = new Schema({
    pregunta: String,
    respuesta: Boolean
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})


const Test = mongoose.model('Test', testSchema);
module.exports = Test;