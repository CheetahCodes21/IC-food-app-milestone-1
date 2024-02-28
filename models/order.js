const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  foodId: { type: mongoose.Schema.Types.ObjectId, ref: "Food", required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'cancelled'],
    default: 'pending',
  },
  paymentMode: { type: String, enum: ["cash", "card", "UPI"], required: true },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
