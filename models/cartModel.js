import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  products: [
    {
      productId: {
        type: String,
        required: true
      },
      quantity: {
        type: Number,
        default: 1,
      },
      color: {
        type: String,
        required: true
      },
      size: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      price:{
        type: Number,
        required: true,
      }
    },
  ], 
},
  { timestamps: true }
);

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;