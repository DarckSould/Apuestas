const { Router } = require('express');

module.exports = function ({ BetController }) {
  const router = Router();

  // Obtener todas las apuestas
  router.get('/bets', BetController.getAllBets);

  // Obtener las apuestas de un usuario específico
  router.get('/bets/user', BetController.getBetsByUserId);

  // Obtener una apuesta por su ID
  router.get('/bets/id', BetController.getBetById);

  // Crear una nueva apuesta
  router.post('/bets', BetController.createBet);

  // Actualizar una apuesta por su ID
  router.put('/bets/id', BetController.updateBet);

  // Eliminar una apuesta por su ID
  router.delete('/bets/id', BetController.deleteBet);

  return router;
};
