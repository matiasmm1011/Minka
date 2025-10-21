// backend/models/Usuario.js
const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  telefono: {
    type: String,
    required: true,
    trim: true
  },
  tipoUsuario: {
    type: String,
    enum: ['cliente', 'profesional', 'ambos'],
    default: 'cliente'
  },
  mensaje: {
    type: String,
    default: ''
  },
  fechaRegistro: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Usuario', usuarioSchema);