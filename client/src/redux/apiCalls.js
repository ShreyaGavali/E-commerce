import { loginFailure, loginStart, loginSuccess, registerFailure, registerStart, registerSuccess } from "./userRedux";
import { publicRequest, userRequest } from "../requestMethod";
import { addProductSuccess, addProductFailure, getCartStart, getCartSuccess, getCartFailure, clearCart, deleteProductStart, deleteProductSuccess, deleteProductFailure } from "./cartRedux";

// login
  export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
      const res = await publicRequest.post("/auth/login", user);
      dispatch(loginSuccess(res.data));
    } catch (err) {
      console.log(err.response);
      if (err.response && err.response.status === 401) {
        // Handle unauthorized error from backend
        dispatch(loginFailure("Invalid username or password"));
      } else if (err.response && err.response.status === 500) {
        // Handle server error
        dispatch(loginFailure("Internal server error. Please try again later."));
      } else {
        dispatch(loginFailure("Something went wrong. Please try again."));
      }
    }
  };

// register
export const registerUser = async (dispatch, user) => {
    dispatch(registerStart());
    try {
      const res = await publicRequest.post("/auth/", user); // Replace with your actual backend route
      dispatch(registerSuccess(res.data));
    } catch (err) {
      console.log(err.response.data);
      dispatch(registerFailure(err.response.data.message));
    }
};

export const createCart = async (dispatch, cartData, user) => {
  try {
    // Dispatch add product to the cart (can call the backend)
    const res = await userRequest.post("/cart/", {
      userId: user._id, // Pass the userId to associate the cart with the user
      products: [
        {
          productId: cartData._id, // Product ID from cartData
          quantity: cartData.quantity, // Quantity of the product
          color: cartData.color, // Selected color of the product
          size: cartData.size, // Selected size of the product
          image: cartData.image, // Product image
          price: cartData.price,
        },
      ],
    });

    // If successful, dispatch addProductSuccess with product details
    dispatch(
      addProductSuccess({
        productId: cartData._id,
        quantity: cartData.quantity,
        price: cartData.price, // Add price for calculating total
        color: cartData.color,
        size: cartData.size,
        image: cartData.image,
        price: cartData.price
      })
    );
  } catch (err) {
    // If an error occurs, dispatch addProductFailure
    dispatch(addProductFailure());
  }

};


export const deleteCart = async (userId, dispatch) => {
  try {
      await userRequest.delete(`/cart/${userId}`); // API call to delete the cart
      dispatch(clearCart()); // Clear the cart in Redux state
  } catch (err) {
      console.log(err);
  }
};

export const deleteProductFromCart = (id, productId) => async (dispatch) => {
  dispatch(deleteProductStart());
  try {
    // API call to delete the product from the cart
    const res = await userRequest.delete(`/cart/${id}/product`, {
      data: {
        id,
        productId
      }
    });

    // Dispatch success with updated cart data
    dispatch(deleteProductSuccess({
      products: res.data.cart.products, // Updated products in the cart
      total: res.data.cart.totalPrice, // Updated total price (if your backend returns it)
      quantity: res.data.cart.products.length, // Updated number of products in the cart
    }));
  } catch (err) {
    console.log(err);
    dispatch(deleteProductFailure());
  }
};
