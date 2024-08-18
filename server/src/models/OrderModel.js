const mongoose = require("mongoose");
const DataSchema = mongoose.Schema(
  {
    orderNumber: { type: String, required: true, unique: true },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'customers', required: true },
    products: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'products', required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    paymentStatus: { type: String, enum: ['Paid', 'Pending', 'Cancelled'], default: 'Pending' },
    orderDate: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const OrderCollectionModel = mongoose.model("orders", DataSchema);

module.exports = OrderCollectionModel;
