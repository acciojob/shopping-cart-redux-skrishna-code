
import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Wishlist from "./components/Wishlist";
import "./styles.css";

const App = () => {
  return (
    <Provider store={store}>
      <div className="app">
        <header className="navbar">
          <h1>ShopEase</h1>
          <p>Shopping made simple</p>
        </header>

        <main className="main-content">
          <ProductList />

          <div className="cart-wishlist-layout">
            <Cart />
            <Wishlist />
          </div>
        </main>

        <footer>
          ShopEase Shopping Cart — React & Redux
        </footer>
      </div>
    </Provider>
  );
};

createRoot(document.getElementById("root")).render(<App />);
