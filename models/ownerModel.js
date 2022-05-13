const mongoose = require("mongoose");

const ownerSchema = new mongoose.Schema(
  {
    owner_id: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.Owner || mongoose.model("Owner", ownerSchema);
