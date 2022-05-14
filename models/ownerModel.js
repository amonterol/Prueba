const mongoose = require("mongoose");

const ownerSchema = new mongoose.Schema(
  {
    owner_Id: {
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
      type: String,
    },
  },
  {
    timestamps: true, //important
  }
);

//module.exports = mongoose.model("Product", productSchema);

module.exports = mongoose.models.Owner || mongoose.model("Owner", ownerSchema);
