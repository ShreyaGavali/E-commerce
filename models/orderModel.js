import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  products: [
    {
      productId: {
        type: String,
      },
      quantity: {
        type: Number,
        default: 1,
      },
      image:{
        type: String,
        require: true
      },
      price:{
        type: Number,
        required: true
      }
    },
  ],
  amount: {
    type: Number,
    required: true
  },
  address: {
    type: Object,
    required: true,
  },
  status: {
    type: String,
    default: "pending"
  },
},
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);
export default Order;
