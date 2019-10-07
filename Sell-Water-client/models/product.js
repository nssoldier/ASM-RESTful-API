const mongoose = require("mongoose");

const model = mongoose.model(
  "product",
  new mongoose.Schema(
    {
      name: { type: String, required: true },
      price: Number,
      desc: String,
      type: String,
      deleted: Boolean,
      image: String
    },
    {
      timestamps: true
    }
  ),
  "product"
);

model.schema.index({ name: "text" });

module.exports = model;
