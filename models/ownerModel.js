const mongoose = require("mongoose");

const ownerSchema = new mongoose.Schema(
  {
    owner_id: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    number: {
      type: String,
      trim: true,
      required: true,
    },
    address: {
      type: String,
      trim: true,
      required: true,
    },
    area: {
      type: Number,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    constructionArea: {
      type: String,
      required: true,
    },
    images: {
      type: Array,
      required: true,
    },
    ownerTypeId: {
      type: Number,
      trim: true,
      required: true,
    },
    OwnerId: {
      type: Number,
      trim: true,
      required: true,
    },
  },
  {
    timestamps: true, //important
  }
);

//module.exports = mongoose.model("Product", productSchema);

module.exports = mongoose.models.owner || mongoose.model("owner", ownerSchema);
