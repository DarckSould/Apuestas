const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sportSchema = new Schema(
  {
    homeTeam: {
      type: String,
      required: true, // Asegura que este campo sea obligatorio
    },
    awayTeam: {
      type: String,
      required: true, // Asegura que este campo sea obligatorio
    },
    eventDate: {
      type: Date,
      required: true, // Asegura que este campo sea obligatorio
    },
    odds: {
      homeWin: {
        type: Number,
        required: true, // Asegura que este campo sea obligatorio
      },
      draw: {
        type: Number,
        required: true, // Asegura que este campo sea obligatorio
      },
      awayWin: {
        type: Number,
        required: true, // Asegura que este campo sea obligatorio
      },
    },
    status: {
      type: String,
      default: 'scheduled', // Valor predeterminado para eventos programados
    },
    tournament: {
      type: String,
      required: true, // Asegura que este campo sea obligatorio
    },
    stadium: {
      type: String,
      required: true, // Asegura que este campo sea obligatorio
    },
  },
  { timestamps: true } // Esto agrega los campos `createdAt` y `updatedAt`
);

sportSchema.index({ eventDate: 1 });
sportSchema.index({ homeTeam: 1, awayTeam: 1 });

module.exports = mongoose.model('Sport', sportSchema);
