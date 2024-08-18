const mongoose = require("mongoose");
const DataSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true },
    phone: { type: String, unique: true },
    address: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const CustomerModel = mongoose.model("customers", DataSchema);

module.exports = CustomerModel;
