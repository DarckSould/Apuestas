const express = require('express');
const router = express.Router();

module.exports = ({ ProfitController }) => {
  // Obtener todas las ganancias
  router.get('/profits', ProfitController.getAllProfits);

  // Obtener ganancia por ID
  router.get('/profits', ProfitController.getProfitById);

  // Crear ganancia
  router.post('/create', ProfitController.createProfit);

  // Actualizar ganancia por ID
  router.put('/profits', ProfitController.updateProfit);

  // Eliminar ganancia por ID
  router.delete('/profits', ProfitController.deleteProfit);

  return router;
};
