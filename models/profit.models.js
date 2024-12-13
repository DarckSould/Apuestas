const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for profit calculations
const profitSchema = new Schema({
  user: {
    type: String,
    required: true, // User for whom the profit is calculated
    trim: true,
  },
  event: {
    type: Schema.Types.ObjectId,
    ref: 'SportsEvent', // Reference to the sports event
    required: true,
  },
  bet: {
    type: Schema.Types.ObjectId,
    ref: 'Bet', // Reference to the related bet
    required: true,
  },
  profit: {
    type: Number,
    required: true, // Calculated profit (negative for losses)
  },
  calculatedAt: {
    type: Date,
    default: Date.now, // Time the profit was calculated
  },
});

module.exports = mongoose.model('Profit', profitSchema);
