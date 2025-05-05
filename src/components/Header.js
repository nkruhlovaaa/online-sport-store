import React from 'react';
import { useNavigate } from 'react-router-dom';  // Імпортуємо хук для програмного переходу
import './Header.css';

const Header = () => {
  const navigate = useNavigate();  // Ініціалізація хука navigate

  const goToProfile = () => {
    navigate('/profile');  // Перехід на сторінку профілю
  };

  return (
    <header>
      <div className="container">
        <h1>Спортивний магазин</h1>
        <nav>
          <ul>
            <li><a href="#products">Товар</a></li>
            <li><a href="#sales">Акції</a></li>
            <li><button onClick={goToProfile}>Мій профіль</button></li>  {/* Кнопка для переходу */}
            <li><a href="#about">Про нас</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
