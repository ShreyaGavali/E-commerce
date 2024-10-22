import Cart from '../models/cartModel.js';

// create
export const createCart = (async (req,res) => {
    try {
        const { userId, products } = req.body;
    
        // Check if the cart for the user already exists
        let cart = await Cart.findOne({ userId });
    
        if (cart) {
          // If cart exists, update the cart by adding new products
          products.forEach((newProduct) => {
            const existingProductIndex = cart.products.findIndex(
              (product) =>
                product.productId === newProduct.productId &&
                product.color === newProduct.color &&
                product.size === newProduct.size
            );
    
            if (existingProductIndex >= 0) {
              // If product exists in the cart, update the quantity
              cart.products[existingProductIndex].quantity += newProduct.quantity || 1;
            } else {
              // Add the new product to the cart
              cart.products.push(newProduct);
            }
          });
    
          // Save the updated cart
          cart = await cart.save();
        } else {
          // If cart doesn't exist, create a new cart
          cart = new Cart({
            userId,
            products,
          });
    
          await cart.save();
        }
    
        res.status(201).json({ success: true, cart });
      } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
      }
});

// update
export const updateCart = (async (re, res) => {
    try{
        const updatedCart = await Cart.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        return res.status(200).json(updatedCart);
    }catch (err){
        return res.status(500).json(err);
    }
});

// delete
export const deleteCartAfterOrder = async (req, res) => {
  try {
      // Find the cart by user ID and delete it
      const cart = await Cart.findOneAndDelete({ userId: req.params.id });

      if (!cart) {
          return res.status(404).json("Cart not found");
      }

      return res.status(200).json("Cart and products deleted successfully");
  } catch (err) {
      return res.status(500).json(err);
  }
};


// get user cart
export const getCart = (async (req, res) => {
    try{
        const cart = await Cart.findOne({userId: req.params.id});
        return res.status(200).json(cart);
    } catch (err){
        return res.status(500).json(err);
    }
});

// get all cart 
export const getAllCart = (async (req, res) => {
    try{
        const carts = await Cart.find();
        return res.status(200).json(carts);
    }catch(err){
        return res.status(500).json(err);
    }
});

// DELETE route to remove a product from the cart
export const deleteCartProduct = (async (req, res) => {
  const { id: userId } = req.params;
  const { productId } = req.body;

  if (!userId || !productId) {
    console.log("userid",userId);
    console.log("productid",productId);
    return res.status(400).json({ message: 'userId and productId are required' });
  }

  try {
    // Find the cart by userId
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Filter out the product to be removed
    const updatedProducts = cart.products.filter(product => product._id.toString() !== productId);

    if (cart.products.length === updatedProducts.length) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    // Update the cart with the new products array
    cart.products = updatedProducts;
    await cart.save();

    res.status(200).json({ message: 'Product removed from cart', cart });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

