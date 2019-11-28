const mongoose = require('mongoose');
const { Schema } = mongoose;

const LabSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  capacidad: {
    type: String,
    required: true
  },
  habilitado: {
    type: String
  },
});

module.exports = mongoose.model('Lab', LabSchema);
