import React from "react";
import ReactDOM from "react-dom/client"; // Замість 'react-dom'
import './index.css';
import App from './App';

// Створення кореня
const root = ReactDOM.createRoot(document.getElementById('root'));

// Рендеринг компонента
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);