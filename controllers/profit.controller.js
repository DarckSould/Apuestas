// profitController.js
const catchControllerAsync = require('../utils/catch-controller-async');
const BaseController = require('./base.controller');

let _profitService = null;

module.exports = class ProfitController extends BaseController {
  constructor({ ProfitService }) {
    super(ProfitService);
    _profitService = ProfitService; // Inyección de dependencias
  }

  // Crear una nueva ganancia
  createProfit = catchControllerAsync(async (req, res) => {
    const result = await _profitService.createProfit(req.body);
    res.status(201).send(result);
  });

  // Obtener todas las ganancias
  getAllProfits = catchControllerAsync(async (req, res) => {
    const result = await _profitService.getAllProfits();
    res.status(200).send(result);
  });

  // Obtener una ganancia por su ID
  getProfitById = catchControllerAsync(async (req, res) => {
    const { id } = req.query; // Usamos query para obtener el id
    const result = await _profitService.getProfitById(id);
    res.status(200).send(result);
  });

  // Actualizar una ganancia por su ID
  updateProfit = catchControllerAsync(async (req, res) => {
    const { id } = req.query; // Usamos query para obtener el id
    const updatedData = req.body;
    const result = await _profitService.updateProfit(id, updatedData);
    res.status(200).send(result);
  });

  // Eliminar una ganancia por su ID
  deleteProfit = catchControllerAsync(async (req, res) => {
    const { id } = req.query; // Usamos query para obtener el id
    const result = await _profitService.deleteProfit(id);
    res.status(200).send(result);
  });
};
