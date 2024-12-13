const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for profit calculations
const profitSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Referencia al modelo de usuario
    required: true,
  },
  eventId: {
    type: Schema.Types.ObjectId,
    ref: 'Sport', // Referencia al modelo de evento deportivo
    required: true,
  },
  betId: {
    type: Schema.Types.ObjectId,
    ref: 'Bet', // Reference to the related bet
    required: true,
  },
  profit: {
    type: Number,
    required: true, // Calculated profit (negative for losses)
  },
  potentialPayout: {
    type: Number,
    required: true, // Simulated potential payout based on the bet
  },
  calculatedAt: {
    type: Date,
    default: Date.now, // Time the profit was calculated
  },
});

module.exports = mongoose.model('Profit', profitSchema);
