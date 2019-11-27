const express = require('express');
const router = express.Router();

// Models
const Reserv = require('../models/Reserv');

// Helpers
const { isAuthenticated } = require('../helpers/auth');

// Nueva reserva
router.get('/reserv/add', isAuthenticated, (req, res) => {
  res.render('reserv/new-reserv');
});

router.post('/reserv/new-reserv', isAuthenticated, async (req, res) => {
  const {lugar, fecha_emision, fecha_reserva, horas, estado, justificacion, cantidad, tipo_reserva} = req.body;
  const errors = [];
  if (!lugar) {
    errors.push({text: 'Por favor, indique el aula.'});
  }
  if (!fecha_emision) {
    errors.push({text: 'Por favor, indique la fecha de emisión'});
  }
  if (!fecha_reserva) {
    errors.push({text: 'Por favor, indique la fecha de la solicitud'});
  }
  if (!horas) {
    errors.push({text: 'Por favor, indique cuantas hora'});
  }
  if (!estado) {
    errors.push({text: 'Por favor, indique el estado de la solicitud'});
  }
  if (!justificacion) {
    errors.push({text: 'Por favor, indique el motivo de la solicitud'});
  }
  if (!cantidad) {
    errors.push({text: 'Por favor, indique la cantidad de equipo a utilizar'});
  }
  if (!tipo_reserva) {
    errors.push({text: 'Por favor, indique el tipo de la solicitud'});
  }

  if (errors.length > 0) {
    res.render('reserv/new-reserv', {
      errors,
      lugar,
      fecha_emision,
      fecha_reserva,
      horas,
      estado,
      justificacion,
      cantidad,
      tipo_reserva
    });
  } else {
    const newReserv = new Reserv({lugar, fecha_emision, fecha_reserva, horas, estado, justificacion, cantidad, tipo_reserva});
    newReserv.user = req.user.id;
    newReserv.fecha_emision = "10/10/10";
    newReserv.fecha_remision = null;
    newReserv.acuse = null;
    await newReserv.save();
    req.flash('success_msg', 'Solicitud de reserva enviada con éxito');
    res.redirect('/reserv');
  }
});

// Get de todas las solicitudes
router.get('/reserv', isAuthenticated, async (req, res) => {
  const reserv = await Reserv.find({user: req.user.id}).sort({date: 'desc'});
  res.render('reserv/all-reserv', { reserv });
});

// Editar solicitudes
router.get('/reserv/edit/:id', isAuthenticated, async (req, res) => {
  const reserv = await Reserv.findById(req.params.id);
  if(reserv.user != req.user.id) {
    req.flash('error_msg', 'No autorizado');
    return res.redirect('/reserv');
  } 
  res.render('reserv/edit-reserv', { reserv });
});

router.put('/reserv/edit-reserv/:id', isAuthenticated, async (req, res) => {
  const {lugar, fecha_emision, fecha_reserva, horas, estado, justificacion, cantidad, tipo_reserva} = req.body;
  await Reserv.findByIdAndUpdate(req.params.id, {lugar, fecha_emision, fecha_reserva, horas, estado, justificacion, cantidad, tipo_reserva});
  req.flash('success_msg', 'Solicitud modificada con éxito');
  res.redirect('/reserv');
});

// Delete de solicitudes
router.delete('/reserv/delete/:id', isAuthenticated, async (req, res) => {
  await Reserv.findByIdAndDelete(req.params.id);
  req.flash('success_msg', 'Solicitud borrada con éxito');
  res.redirect('/reserv');
});

module.exports = router;
