
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleWishlist,
  addToCart
} from "../features/cart/cartSlice";

const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.cart.wishlist);

  return (
    <section className="panel">
      <h2>My Wishlist ({wishlist.length})</h2>

      {wishlist.length === 0 ? (
        <p className="empty-message">
          Your wishlist is empty.
        </p>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map((product) => (
            <article className="wishlist-item" key={product.id}>
              <img src={product.image} alt={product.name} />

              <div>
                <h3>{product.name}</h3>
                <p>₹{product.price.toLocaleString("en-IN")}</p>

                <button
                  className="primary-button"
                  onClick={() => dispatch(addToCart(product.id))}
                >
                  Add to Cart
                </button>

                <button
                  className="secondary-button"
                  onClick={() =>
                    dispatch(toggleWishlist(product.id))
                  }
                >
                  Remove
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default Wishlist;
