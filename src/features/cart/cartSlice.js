
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 1999,
      category: "Electronics",
      image: "https://placehold.co/300x200?text=Headphones"
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 2499,
      category: "Electronics",
      image: "https://placehold.co/300x200?text=Smart+Watch"
    },
    {
      id: 3,
      name: "Running Shoes",
      price: 1799,
      category: "Fashion",
      image: "https://placehold.co/300x200?text=Shoes"
    },
    {
      id: 4,
      name: "Backpack",
      price: 999,
      category: "Accessories",
      image: "https://placehold.co/300x200?text=Backpack"
    },
    {
      id: 5,
      name: "Bluetooth Speaker",
      price: 1499,
      category: "Electronics",
      image: "https://placehold.co/300x200?text=Speaker"
    },
    {
      id: 6,
      name: "Sunglasses",
      price: 799,
      category: "Fashion",
      image: "https://placehold.co/300x200?text=Sunglasses"
    }
  ],
  cart: [],
  wishlist: [],
  appliedCoupon: null,
  discountPercentage: 0,
  couponError: ""
};

const coupons = {
  SAVE10: 10,
  SAVE20: 20,
  WELCOME15: 15
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = state.products.find(
        (item) => item.id === action.payload
      );

      if (!product) return;

      const existingItem = state.cart.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ ...product, quantity: 1 });
      }
    },

    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(
        (item) => item.id !== action.payload
      );
    },

    increaseQuantity: (state, action) => {
      const item = state.cart.find(
        (product) => product.id === action.payload
      );

      if (item) item.quantity += 1;
    },

    decreaseQuantity: (state, action) => {
      const item = state.cart.find(
        (product) => product.id === action.payload
      );

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },

    toggleWishlist: (state, action) => {
      const productId = action.payload;
      const exists = state.wishlist.some(
        (item) => item.id === productId
      );

      if (exists) {
        state.wishlist = state.wishlist.filter(
          (item) => item.id !== productId
        );
      } else {
        const product = state.products.find(
          (item) => item.id === productId
        );

        if (product) state.wishlist.push(product);
      }
    },

    applyCoupon: (state, action) => {
      const code = String(action.payload).trim().toUpperCase();

      if (coupons[code]) {
        state.appliedCoupon = code;
        state.discountPercentage = coupons[code];
        state.couponError = "";
      } else {
        state.couponError = "Invalid coupon code.";
      }
    },

    removeCoupon: (state) => {
      state.appliedCoupon = null;
      state.discountPercentage = 0;
      state.couponError = "";
    },

    clearCouponError: (state) => {
      state.couponError = "";
    }
  }
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  toggleWishlist,
  applyCoupon,
  removeCoupon,
  clearCouponError
} = cartSlice.actions;

export default cartSlice.reducer;
