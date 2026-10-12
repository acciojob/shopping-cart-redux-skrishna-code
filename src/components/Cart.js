
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  applyCoupon,
  removeCoupon,
  clearCouponError
} from "../features/cart/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const [couponCode, setCouponCode] = useState("");

  const {
    cart,
    appliedCoupon,
    discountPercentage,
    couponError
  } = useSelector((state) => state.cart);

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const discount = Math.round(
    subtotal * discountPercentage / 100
  );

  const total = subtotal - discount;

  const handleApplyCoupon = (event) => {
    event.preventDefault();
    dispatch(applyCoupon(couponCode));
  };

  return (
    <section className="panel">
      <h2>Shopping Cart</h2>

      {cart.length === 0 ? (
        <p className="empty-message">Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} />

                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>₹{item.price.toLocaleString("en-IN")}</p>

                  <div className="quantity-controls">
                    <button
                      aria-label={`Decrease ${item.name} quantity`}
                      onClick={() =>
                        dispatch(decreaseQuantity(item.id))
                      }
                      disabled={item.quantity <= 1}
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      aria-label={`Increase ${item.name} quantity`}
                      onClick={() =>
                        dispatch(increaseQuantity(item.id))
                      }
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  className="remove-button"
                  onClick={() => dispatch(removeFromCart(item.id))}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <form className="coupon-form" onSubmit={handleApplyCoupon}>
            <label htmlFor="coupon">Discount coupon</label>

            <div className="coupon-input-row">
              <input
                id="coupon"
                type="text"
                value={couponCode}
                onChange={(event) => {
                  setCouponCode(event.target.value);
                  dispatch(clearCouponError());
                }}
                placeholder="Enter coupon code"
              />

              <button type="submit" className="primary-button">
                Apply
              </button>
            </div>
          </form>

          {couponError && (
            <p className="error-message">{couponError}</p>
          )}

          {appliedCoupon && (
            <p className="success-message">
              {appliedCoupon} applied ({discountPercentage}% off)
              <button
                type="button"
                className="text-button"
                onClick={() => dispatch(removeCoupon())}
              >
                Remove coupon
              </button>
            </p>
          )}

          <div className="price-summary">
            <div>
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString("en-IN")}</span>
            </div>

            <div>
              <span>Discount</span>
              <span>-₹{discount.toLocaleString("en-IN")}</span>
            </div>

            <div className="grand-total">
              <strong>Total</strong>
              <strong>₹{total.toLocaleString("en-IN")}</strong>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default Cart;
