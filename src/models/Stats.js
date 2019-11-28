const mongoose = require('mongoose');
const { Schema } = mongoose;

const LabSchema = new Schema({
  nombre: {
    type: String
  },
  capacidad: {
    type: String
  },
  habilitado: {
    type: String
  },
});

module.exports = mongoose.model('Lab', LabSchema);
