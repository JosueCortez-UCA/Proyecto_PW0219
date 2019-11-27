const mongoose = require('mongoose');
const { Schema } = mongoose;

const ReservSchema = new Schema({
  lugar: {
    type: String,
    required: true
  },
  fecha_emision: {
    type: Date,
    default: Date.now
  },
  fecha_remision: {
    type: Date
  },
  fecha_reserva: {
    type: Date,
    required: true
  },
  horas: {
    type: Number,
    required: true
  },
  estado: {
    type: String,
    required: true
  },
  justificacion: {
    type: String,
    required: true
  },
  cantidad: {
    type: Number
  },
  acuse: {
    type: String
  },
  tipo_reserva: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model('Reserv', ReservSchema);
