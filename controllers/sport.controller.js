// sportsController.js
const catchControllerAsync = require('../utils/catch-controller-async');
const BaseController = require('./base.controller');

let _sportService = null;

module.exports = class SportsController extends BaseController {
  constructor({ SportService }) {
    super(SportService);
    _sportService = SportService; // Inyección de dependencias
  }

  // Crear un nuevo evento deportivo
  createEvent = catchControllerAsync(async (req, res) => {
    const result = await _sportService.createEvent(req.body);
    res.status(201).send(result);
  });

  // Obtener eventos deportivos filtrados por tipo de deporte
  getAllEvents = catchControllerAsync(async (req, res) => {
    const { sportType } = req.query; // Obtenemos el parámetro sportType de la consulta
    const result = await _sportService.getAllEvents(sportType);
    res.status(200).send(result);
  });

  // Obtener un evento deportivo por su ID
  getEventById = catchControllerAsync(async (req, res) => {
    const { id } = req.query; // Usamos query para obtener el id
    const result = await _sportService.getEventById(id);
    res.status(200).send(result);
  });

  // Actualizar un evento deportivo por su ID
  updateEvent = catchControllerAsync(async (req, res) => {
    const { id } = req.query; // Usamos query para obtener el id
    const updatedData = req.body;
    const result = await _sportService.updateEvent(id, updatedData);
    res.status(200).send(result);
  });

  // Eliminar un evento deportivo por su ID
  deleteEvent = catchControllerAsync(async (req, res) => {
    const { id } = req.query; // Usamos query para obtener el id
    const result = await _sportService.deleteEvent(id);
    res.status(200).send(result);
  });
};
