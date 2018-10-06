const mongoose = require('mongoose');
const Schema = mongoose.Schema


const observacionesSchema = new Schema ({
    fecha: String,
    texto: String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});


const Observaciones = mongoose.model('Observaciones',observacionesSchema);
module.exports = Observaciones;