const catchControllerAsync = require('../utils/catch-controller-async');
const BaseController = require('./base.controller');

let _userService = null;

module.exports = class UserController extends BaseController {
  constructor({ UserService }) {
    super(UserService);
    _userService = UserService;
  }

  // Crear el usuario
  createUser = catchControllerAsync(async (req, res) => {
    const result = await _userService.createUser(req.body);
    res.status(200).send(result);
  });

  // Obtener el usuario por id
  getAllUserId = catchControllerAsync(async (req, res) => {
    const { id } = req.query;
    const result = await _userService.getAllUserId(id);
    res.status(200).send(result);
  });
};
