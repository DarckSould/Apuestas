const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const catchServiceAsync = require('../utils/catch-service-async');
const BaseService = require('./base.service');

let _user = null;

module.exports = class UserService extends BaseService {
  constructor({ User }) {
    super(User);
    _user = User;
  }

  // Crear el usuario
  createUser = catchServiceAsync(async (body) => {
    const newUser = new _user(body);
    await newUser.save();
    return { message: 'Usuario creado exitosamente' };
  });

  // Obtener los usuarios por ID
  getAllUserId = catchServiceAsync(async (id) => {
    const users = await _user.find({ _id: id });
    return { data: users, message: 'Usuarios obtenidos exitosamente' };
  });
};
