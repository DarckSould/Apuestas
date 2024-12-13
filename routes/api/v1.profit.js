// routes/profitRoutes.js
const express = require('express');
const router = express.Router();

module.exports = ({ ProfitController }) => {
  // Ruta para obtener todas las ganancias
  router.get('/', ProfitController.getAllProfits);

  // Ruta para obtener una ganancia por su ID
  router.get('/:id', ProfitController.getProfitById);

  // Ruta para crear una nueva ganancia
  router.post('/', ProfitController.createProfit);

  // Ruta para actualizar una ganancia por su ID
  router.put('/:id', ProfitController.updateProfit);

  // Ruta para eliminar una ganancia por su ID
  router.delete('/:id', ProfitController.deleteProfit);

  return router;
};
