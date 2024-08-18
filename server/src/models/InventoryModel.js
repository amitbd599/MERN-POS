const mongoose = require("mongoose");
const DataSchema = mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'products', required: true },
    quantityChanged: { type: Number, required: true },
    changeType: { type: String, enum: ['Sale', 'Restock'], required: true },
    date: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const InventoryModel = mongoose.model("inventories", DataSchema);

module.exports = InventoryModel;
