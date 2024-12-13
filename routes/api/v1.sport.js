// routes/sportsRoutes.js
const express = require('express');
const router = express.Router();

module.exports = ({ SportController }) => {
  // Ruta para obtener todos los eventos deportivos
  router.get('/getAllEvents', SportController.getAllEvents);

  // Ruta para obtener un evento deportivo por su ID
  router.get('/:id', SportController.getEventById);

  // Ruta para crear un nuevo evento deportivo
  router.post('/create', SportController.createEvent);

  // Ruta para actualizar un evento deportivo por su ID
  router.put('/:id', SportController.updateEvent);

  // Ruta para eliminar un evento deportivo por su ID
  router.delete('/:id', SportController.deleteEvent);

  return router;
};
