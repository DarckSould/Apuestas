const mongoose = require("mongoose");
const { Schema } = mongoose;
const faqSchema = new Schema(
  {
    faqs_id: {
      type: Number,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);


const Faqs = (module.exports = mongoose.model("Faqs", faqSchema));
