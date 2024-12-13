const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sportSchema = new Schema(
  {
    sportType: {
      type: String,
      required: true, // Asegura que este campo sea obligatorio
      enum: ['football', 'basketball', 'tennis'], // Define los tipos de deporte permitidos
    },
    homeTeam: {
      type: String,
      required: true,
    },
    awayTeam: {
      type: String,
      required: true,
    },
    eventDate: {
      type: Date,
      required: true,
    },
    odds: {
      homeWin: {
        type: Number,
        required: true,
      },
      draw: {
        type: Number,
        required: true,
      },
      awayWin: {
        type: Number,
        required: true,
      },
    },
    status: {
      type: String,
      default: 'scheduled',
    },
    tournament: {
      type: String,
      required: true,
    },
    stadium: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

sportSchema.index({ eventDate: 1 });
sportSchema.index({ homeTeam: 1, awayTeam: 1 });

module.exports = mongoose.model('Sport', sportSchema);
