const catchServiceAsync = require('../utils/catch-service-async');
const BaseService = require('./base.service');

let _sport = null;

module.exports = class SportService extends BaseService {
  constructor({ Sport }) {
    super(Sport);
    _sport = Sport; // Inyección de dependencias
  }

  // Crear un nuevo evento deportivo
  createEvent = catchServiceAsync(async (body) => {
    const newEvent = new _sport(body);
    await newEvent.save();
    return { message: 'Sport event created successfully' };
  });

  // Obtener todos los eventos deportivos filtrados por tipo de deporte
  getAllEvents = catchServiceAsync(async (sportType) => {
    let events;

    if (sportType) {
      // Si se proporciona un sportType, filtramos por ese tipo de deporte
      events = await _sport.find({ sportType });
    } else {
      // Si no se proporciona sportType, devolvemos todos los eventos
      events = await _sport.find();
    }

    return { data: events, message: 'Sport events retrieved successfully' };
  });

  // Obtener un evento deportivo por su ID
  getEventById = catchServiceAsync(async (id) => {
    const event = await _sport.findById(id);
    if (!event) {
      throw new Error('Event not found');
    }
    return { data: event, message: 'Sport event retrieved successfully' };
  });

  // Actualizar un evento deportivo por su ID
  updateEvent = catchServiceAsync(async (id, updatedData) => {
    const event = await _sport.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    if (!event) {
      throw new Error('Event not found');
    }
    return { data: event, message: 'Sport event updated successfully' };
  });

  // Eliminar un evento deportivo por su ID
  deleteEvent = catchServiceAsync(async (id) => {
    const event = await _sport.findByIdAndDelete(id);
    if (!event) {
      throw new Error('Event not found');
    }
    return { message: 'Sport event deleted successfully' };
  });
};
