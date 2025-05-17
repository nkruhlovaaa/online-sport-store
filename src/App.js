import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

import Wishlist from './components/Wishlist'; 
import Register from './components/Register';
import Login from './components/Login';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Sales from './components/Sales';
import About from './components/About';
import Profile from './components/Profile/Profile';
import './App.css';

const HomePage = () => <ProductList />;

const App = () => (
  <Router>
    <AppWithHeader />
  </Router>
);

const AppWithHeader = () => {
  const navigate = useNavigate();
  const [uid, setUid] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
      } else {
        setUid(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <header>
        <div className="container">
          <h1>Спортивний магазин</h1>
          <nav>
            <ul>
              <li><button onClick={() => navigate("/")}>Товари</button></li>
              <li><button onClick={() => navigate("/sales")}>Акції</button></li>
              <li><button onClick={() => navigate("/cart")}>Кошик</button></li>
              <li><button onClick={() => navigate("/about")}>Про нас</button></li>
              <li><button onClick={() => navigate("/profile")}>Мій профіль</button></li>
              <li><Link to="/register">Реєстрація</Link></li>
              <li><Link to="/login">Вхід</Link></li>
              
              <li><button onClick={() => navigate("/wishlist")}>Бажане</button></li>
              
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/wishlist" element={<Wishlist uid={uid} />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
