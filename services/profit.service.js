// profitService.js
const catchServiceAsync = require('../utils/catch-service-async');
const BaseService = require('./base.service');

let _profit = null;

module.exports = class ProfitService extends BaseService {
  constructor({ Profit }) {
    super(Profit);
    _profit = Profit;
  }

  // Crear una nueva ganancia
  createProfit = catchServiceAsync(async (body) => {
    const newProfit = new _profit(body);
    await newProfit.save();
    return { message: 'Profit created successfully' };
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
