const mongoose = require("mongoose");
const validator = require("validator");
const DataSchema = mongoose.Schema(
  {
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'orders', required: true },
    amountPaid: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    paymentDate: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const PaymentModel = mongoose.model("payments", DataSchema);

module.exports = PaymentModel;
