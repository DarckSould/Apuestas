const catchServiceAsync = require('../utils/catch-service-async');
const BaseService = require('./base.service');

let _profit = null;
let _bet = null;
let _sport = null;

module.exports = class ProfitService extends BaseService {
  constructor({ Profit, Bet, Sport }) {
    super(Profit);
    _profit = Profit;
    _bet = Bet;
    _sport = Sport;
  }

  // Crear una nueva ganancia simulada
  createProfit = catchServiceAsync(async (body) => {
    const { betId } = body; // betId recibido en el body

    // Obtener la apuesta relacionada
    const bet = await _bet.findById(betId).populate('eventId');
    if (!bet) {
      throw new Error('Bet not found');
    }

    const event = bet.eventId; // Evento deportivo relacionado con la apuesta
    const { betAmount, betType } = bet;

    // Calcular la ganancia potencial según las probabilidades del evento
    let potentialPayout = 0;
    if (betType === '1') {
      potentialPayout = betAmount * event.odds.homeWin;
    } else if (betType === 'X') {
      potentialPayout = betAmount * event.odds.draw;
    } else if (betType === '2') {
      potentialPayout = betAmount * event.odds.awayWin;
    }

    // Crear la nueva ganancia con la ganancia potencial calculada
    const newProfit = new _profit({
      userId: bet.userId,
      eventId: bet.eventId,
      betId: bet._id,
      profit: 0, // Se asigna 0 inicialmente hasta que se calcule el resultado
      potentialPayout: potentialPayout,
    });

    // Guardar la ganancia simulada
    await newProfit.save();

    return { message: 'Profit created successfully', profit: newProfit };
  });

  // Obtener todas las ganancias
  getAllProfits = catchServiceAsync(async () => {
    const profits = await _profit.find();
    return { data: profits, message: 'Profits retrieved successfully' };
  });

  // Obtener una ganancia por su ID
  getProfitById = catchServiceAsync(async (id) => {
    const profit = await _profit.findById(id);
    if (!profit) {
      throw new Error('Profit not found');
    }
    return { data: profit, message: 'Profit retrieved successfully' };
  });

  // Actualizar una ganancia por su ID
  updateProfit = catchServiceAsync(async (id, updatedData) => {
    const profit = await _profit.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    if (!profit) {
      throw new Error('Profit not found');
    }
    return { data: profit, message: 'Profit updated successfully' };
  });

  // Eliminar una ganancia por su ID
  deleteProfit = catchServiceAsync(async (id) => {
    const profit = await _profit.findByIdAndDelete(id);
    if (!profit) {
      throw new Error('Profit not found');
    }
    return { message: 'Profit deleted successfully' };
  });
};
