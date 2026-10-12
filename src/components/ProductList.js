
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  toggleWishlist
} from "../features/cart/cartSlice";

const ProductList = () => {
  const dispatch = useDispatch();

  const { products, wishlist, cart } = useSelector(
    (state) => state.cart
  );

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <section>
      <h2>Products</h2>
      <p className="section-subtitle">
        Discover products for your everyday needs.
      </p>

      <div className="product-grid">
        {products.map((product) => {
          const isWishlisted = wishlist.some(
            (item) => item.id === product.id
          );

          return (
            <article className="product-card" key={product.id}>
              <img src={product.image} alt={product.name} />

              <div className="product-info">
                <p className="category">{product.category}</p>
                <h3>{product.name}</h3>
                <p className="price">
                  ₹{product.price.toLocaleString("en-IN")}
                </p>

                <button
                  className="primary-button"
                  onClick={() => dispatch(addToCart(product.id))}
                >
                  Add to Cart
                </button>

                <button
                  className="secondary-button"
                  onClick={() => dispatch(toggleWishlist(product.id))}
                >
                  {isWishlisted
                    ? "Remove from Wishlist"
                    : "Add to Wishlist"}
                </button>
              </div>
            </article>
          );
        })}
      </div>

      <p className="cart-count">
        Items in cart: {cartCount}
      </p>
    </section>
  );
};

export default ProductList;
