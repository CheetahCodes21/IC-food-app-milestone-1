// const mongoose = require("mongoose");

// const orderSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   foodId: { type: mongoose.Schema.Types.ObjectId, ref: "Food", required: true },
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: Date,
//   status: {
//     type: String,
//     enum: ['pending', 'processing', 'completed', 'cancelled'],
//     default: 'pending',
//   },
//   paymentMode: { type: String, enum: ["cash", "card", "UPI"], required: true },
// });

// const Order = mongoose.model("Order", orderSchema);

// module.exports = Order;

const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  foodId: {
    type: String,
    required: true
  },
  paymentMode: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  orderId: {
    type: String,
    unique: true,
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  imageLink: String,
  fileData: String, 
  createdAt: {
    type: Date,
    default: Date.now
  },
  status: { 
    type: String, 
    default: "pending" },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;