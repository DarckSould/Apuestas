const catchServiceAsync = require('../utils/catch-service-async');
const BaseService = require('./base.service');

let _bet = null;
let _sport = null; // Inyectamos el modelo de eventos deportivos

module.exports = class BetService extends BaseService {
  constructor({ Bet, Sport }) {
    super(Bet);
    _bet = Bet; // Inyección de dependencias para Bet
    _sport = Sport; // Inyección de dependencias para Sport (eventos deportivos)
  }

  // Crear una nueva apuesta
  createBet = catchServiceAsync(async (body) => {
    const { userId, eventId, betAmount, betType } = body;

    // Verificar si el evento existe
    const event = await _sport.findById(eventId);
    if (!event) {
      throw new Error('Event not found');
    }

    // Calcular la ganancia potencial según las probabilidades del evento
    let potentialPayout = 0;
    if (betType === '1') {
      potentialPayout = betAmount * event.odds.homeWin;
    } else if (betType === 'X') {
      potentialPayout = betAmount * event.odds.draw;
    } else if (betType === '2') {
      potentialPayout = betAmount * event.odds.awayWin;
    }

    // Crear la apuesta
    const newBet = new _bet({
      userId,
      eventId,
      betAmount,
      betType,
      odds: event.odds,
      potentialPayout,
    });

    await newBet.save();

    return { message: 'Bet created successfully', bet: newBet };
  });

  // Obtener todas las apuestas
  getAllBets = catchServiceAsync(async () => {
    const bets = await _bet.find().populate('eventId'); // Populate eventId to get event details
    return { data: bets, message: 'Bets retrieved successfully' };
  });

  // Obtener las apuestas de un usuario específico
  getBetsByUserId = catchServiceAsync(async (userId) => {
    const bets = await _bet.find({ userId }).populate('eventId');
    return { data: bets, message: 'User bets retrieved successfully' };
  });

  // Obtener una apuesta por su ID
  getBetById = catchServiceAsync(async (id) => {
    const bet = await _bet.findById(id).populate('eventId');
    if (!bet) {
      throw new Error('Bet not found');
    }
    return { data: bet, message: 'Bet retrieved successfully' };
  });

  // Actualizar una apuesta por su ID
  updateBet = catchServiceAsync(async (id, updatedData) => {
    const bet = await _bet.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    if (!bet) {
      throw new Error('Bet not found');
    }
    return { data: bet, message: 'Bet updated successfully' };
  });

  // Eliminar una apuesta por su ID
  deleteBet = catchServiceAsync(async (id) => {
    const bet = await _bet.findByIdAndDelete(id);
    if (!bet) {
      throw new Error('Bet not found');
    }
    return { message: 'Bet deleted successfully' };
  });
};
