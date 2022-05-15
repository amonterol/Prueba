const mongoose = require("mongoose");

const ownerSchema = new mongoose.Schema(
  {
    ownerId: {
      type: Number,
      unique: true,
      trim: true,
      required: true,
    },
    name: {
      type: String,
      trim: true,
      required: true,
    },
    telephone: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
    },
    identificationNumber: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, //important
  }
);

module.exports = mongoose.models.Owner || mongoose.model("owner", ownerSchema);
