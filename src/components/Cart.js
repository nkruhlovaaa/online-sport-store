import React, { useState, useEffect } from "react";
import './Cart.css';  // Імпорт CSS для Cart

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
    updateTotalPrice(storedCart);
  }, []);

  const updateTotalPrice = (cartItems) => {
    const total = cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0);
    setTotalPrice(total);
  };

  const handleQuantityChange = (id, action) => {
    let updatedCart = [...cart];
    const product = updatedCart.find((item) => item.id === id);
    if (product) {
      if (action === "increase") {
        product.quantity += 1;
      } else if (action === "decrease" && product.quantity > 1) {
        product.quantity -= 1;
      } else if (product.quantity === 1) {
        updatedCart = updatedCart.filter((item) => item.id !== id);
      }
    }
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    updateTotalPrice(updatedCart);
  };

  const clearCart = () => {
    localStorage.removeItem("cart");
    setCart([]);
    setTotalPrice(0);
  };

  return (
    <section id="cart">
      <div className="container">
        <h2>Ваш кошик</h2>
        <ul id="cart-items">
          {cart.map((item) => (
            <li key={item.id}>
              {item.name} - <span className="quantity">{item.quantity}</span> x {item.price} грн
              <button className="decrease" onClick={() => handleQuantityChange(item.id, "decrease")}>-</button>
              <button className="increase" onClick={() => handleQuantityChange(item.id, "increase")}>+</button>
            </li>
          ))}
        </ul>
        <p><strong>Загальна сума: </strong>{totalPrice} грн</p>
        <button id="clear-cart" onClick={clearCart}>Очистити кошик</button>
      </div>
    </section>
  );
};

export default Cart;
