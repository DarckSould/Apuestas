const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Modelo de Apuesta
const betSchema = new Schema(
  {
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
    betAmount: {
      type: Number,
      required: true, // Asegura que este campo sea obligatorio
    },
    betType: {
      type: String,
      enum: ['1', 'X', '2'], // 1: Local, X: Empate, 2: Visitante
      required: true, // Asegura que este campo sea obligatorio
    },
    odds: {
      type: Object,
      required: true, // Asegura que este campo sea obligatorio
    },
    potentialPayout: {
      type: Number,
      required: true, // Asegura que este campo sea obligatorio
    },
    status: {
      type: String,
      default: 'pending', // Estado de la apuesta (pending, won, lost)
    },
  },
  { timestamps: true } // Esto agrega los campos `createdAt` y `updatedAt`
);

module.exports = mongoose.model('Bet', betSchema);
