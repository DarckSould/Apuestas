const catchControllerAsync = require('../utils/catch-controller-async');
const BaseController = require('./base.controller');

let _betService = null;

module.exports = class BetController extends BaseController {
  constructor({ BetService }) {
    super(BetService);
    _betService = BetService;
  }

  // Crear una nueva apuesta
  createBet = catchControllerAsync(async (req, res) => {
    const result = await _betService.createBet(req.body);
    res.status(201).send(result);
  });

  // Obtener todas las apuestas
  getAllBets = catchControllerAsync(async (req, res) => {
    const result = await _betService.getAllBets();
    res.status(200).send(result);
  });

  // Obtener las apuestas de un usuario específico
  getBetsByUserId = catchControllerAsync(async (req, res) => {
    const { userId } = req.query; // Obtener userId desde los query params
    const result = await _betService.getBetsByUserId(userId);
    res.status(200).send(result);
  });

  // Obtener una apuesta por su ID
  getBetById = catchControllerAsync(async (req, res) => {
    const { id } = req.query; // Obtener id desde los query params
    const result = await _betService.getBetById(id);
    res.status(200).send(result);
  });

  // Actualizar una apuesta por su ID
  updateBet = catchControllerAsync(async (req, res) => {
    const { id } = req.query; // Obtener id desde los query params
    const updatedData = req.body;
    const result = await _betService.updateBet(id, updatedData);
    res.status(200).send(result);
  });

  // Eliminar una apuesta por su ID
  deleteBet = catchControllerAsync(async (req, res) => {
    const { id } = req.query; // Obtener id desde los query params
    const result = await _betService.deleteBet(id);
    res.status(200).send(result);
  });
};
