const mongoose = require("mongoose");

const propertyTypeSchema = new mongoose.Schema(
  {
    propertyTypeId: {
      type: Number,
      unique: true,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models.PropertyType ||
  mongoose.model("propertyType", propertyTypeSchema);
