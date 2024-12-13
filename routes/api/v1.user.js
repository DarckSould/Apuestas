const { Router } = require('express');

module.exports = function ({ UserController }) {
  const router = Router();

  // Ruta para obtener el userId basado en el nombre de usuario
  router.get('/getUserId', UserController.getAllUserId); // Cambiado a AdminController

  // Ruta para crear un nuevo administrador
  router.post('/create', UserController.createUser); // Cambiado a AdminController

  // Ruta para la validación de login
  router.post('/getUserId', UserController.getAllUserId);

  return router;
};
