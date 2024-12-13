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
    const result = await _profitService.createProfit(req.body); // Body debe tener el betId
    res.status(201).send(result); // Respondemos con el mensaje de éxito y la ganancia creada
  });

  // Obtener todas las ganancias
  getAllProfits = catchControllerAsync(async (req, res) => {
    const result = await _profitService.getAllProfits();
    res.status(200).send(result); // Respondemos con todas las ganancias
  });

  // Obtener una ganancia por su ID
  getProfitById = catchControllerAsync(async (req, res) => {
    const { id } = req.query; // Usamos query para obtener el id
    const result = await _profitService.getProfitById(id);
    res.status(200).send(result); // Respondemos con la ganancia encontrada
  });

  // Actualizar una ganancia por su ID
  updateProfit = catchControllerAsync(async (req, res) => {
    const { id } = req.query; // Usamos query para obtener el id
    const updatedData = req.body;
    const result = await _profitService.updateProfit(id, updatedData);
    res.status(200).send(result); // Respondemos con la ganancia actualizada
  });

  // Eliminar una ganancia por su ID
  deleteProfit = catchControllerAsync(async (req, res) => {
    const { id } = req.query; // Usamos query para obtener el id
    const result = await _profitService.deleteProfit(id);
    res.status(200).send(result); // Respondemos con el mensaje de éxito tras eliminación
  });
};
