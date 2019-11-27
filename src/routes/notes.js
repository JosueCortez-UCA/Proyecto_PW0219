const express = require('express');
const router = express.Router();

// Models
const Note = require('../models/Note');

// Helpers
const { isAuthenticated } = require('../helpers/auth');

// Nueva reserva
router.get('/notes/add', isAuthenticated, (req, res) => {
  res.render('notes/new-note');
});

router.post('/notes/new-note', isAuthenticated, async (req, res) => {
  const {lugar, fecha_emision, fecha_reserva, hora, tipo_reserva, estado} = req.body;
  const errors = [];
  if (!lugar) {
    errors.push({text: 'Por favor, digite un aula.'});
  }
  if (!fecha_emision) {
    errors.push({text: 'Por favor, indique la fecha de emisión'});
  }
  if (!fecha_reserva) {
    errors.push({text: 'Por favor, indique la fecha de la solicitud'});
  }
  if (!hora) {
    errors.push({text: 'Por favor, indique la hora'});
  }
  if (!tipo_reserva) {
    errors.push({text: 'Por favor, indique el tipo de la solicitud'});
  }
  if (!estado) {
    errors.push({text: 'Por favor, indique el estado de la solicitud'});
  }
  if (errors.length > 0) {
    res.render('notes/new-note', {
      errors,
      lugar,
      fecha_emision,
      fecha_reserva,
      hora,
      tipo_reserva,
      estado
    });
  } else {
    const newNote = new Note({lugar, fecha_emision, fecha_reserva, hora, tipo_reserva, estado});
    newNote.user = req.user.id;
    await newNote.save();
    req.flash('success_msg', 'Solicitud de reserva enviada con éxito');
    res.redirect('/notes');
  }
});

// Get de todas las solicitudes
router.get('/notes', isAuthenticated, async (req, res) => {
  const notes = await Note.find({user: req.user.id}).sort({date: 'desc'});
  res.render('notes/all-notes', { notes });
});

// Editar solicitudes
router.get('/notes/edit/:id', isAuthenticated, async (req, res) => {
  const note = await Note.findById(req.params.id);
  if(note.user != req.user.id) {
    req.flash('error_msg', 'No autorizado');
    return res.redirect('/notes');
  } 
  res.render('notes/edit-note', { note });
});

router.put('/notes/edit-note/:id', isAuthenticated, async (req, res) => {
  const {lugar, fecha_emision, fecha_reserva, hora, tipo_reserva, estado} = req.body;
  await Note.findByIdAndUpdate(req.params.id, {lugar, fecha_emision, fecha_reserva, hora, tipo_reserva, estado});
  req.flash('success_msg', 'Solicitud modificada con éxito');
  res.redirect('/notes');
});

// Delete de solicitudes
router.delete('/notes/delete/:id', isAuthenticated, async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  req.flash('success_msg', 'Solicitud borrada con éxito');
  res.redirect('/notes');
});

module.exports = router;
