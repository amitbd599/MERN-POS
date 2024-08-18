const mongoose = require("mongoose");
const DataSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    contactInfo: {
      phone: { type: String, required: true },
      email: { type: String, required: true },
      address: { type: String, required: true },
    },
    productsSupplied: [{ type: mongoose.Schema.Types.ObjectId, ref: 'products' }],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const SupplierModel = mongoose.model("suppliers", DataSchema);

module.exports = SupplierModel;
