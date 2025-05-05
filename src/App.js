import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate
} from "react-router-dom";

import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Sales from './components/Sales';
import About from './components/About';
import Profile from './components/Profile/Profile';
import './App.css';

const HomePage = () => (
  <>
    <ProductList />
  </>
);

const App = () => {
  return (
    <Router>
      <AppWithHeader />
    </Router>
  );
};

const AppWithHeader = () => {
  const navigate = useNavigate();

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
        </Routes>
      </main>
    </div>
  );
};

export default App;
