const mongoose = require('mongoose');
const { Schema } = mongoose;

const NoteSchema = new Schema({
  lugar: {
    type: String,
    required: true
  },
  fecha_emision: {
    type: String,
    required: true
  },
  fecha_reserva: {
    type: String,
    required: true
  },
  hora: {
    type: String,
    required: true
  },
  tipo_reserva: {
    type: String,
    required: true
  },
  estado: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  user: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Note', NoteSchema);
