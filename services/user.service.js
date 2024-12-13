const catchServiceAsync = require('../utils/catch-service-async');
const BaseService = require('./base.service');

let _user = null;

module.exports = class UserService extends BaseService {
  constructor({ User }) {
    super(User);
    _user = User;
  }

  // Create the user
  createUser = catchServiceAsync(async (body) => {
    console.log(body);
    const newUser = new _user(body);
    await newUser.save();
    return { message: 'User created successfully' };
  });

  // Get all users by id
  getAllUserId = catchServiceAsync(async (id) => {
    const users = await _user.find({ _id: id });
    return { data: users, message: 'Users retrieved successfully' };
  });
};
