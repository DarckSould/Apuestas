const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true, // The username must be unique
    trim: true, // Removes any leading/trailing spaces
  },
  email: {
    type: String,
    required: true,
    unique: true, // The email must be unique
    lowercase: true, // Convert email to lowercase
    trim: true, // Removes any leading/trailing spaces
  },
  password: {
    type: String,
    required: true,
    minlength: 6, // Minimum length for the password
  },
  createdAt: {
    type: Date,
    default: Date.now, // Date when the user was created
  },
});

module.exports = mongoose.model('User', userSchema);
