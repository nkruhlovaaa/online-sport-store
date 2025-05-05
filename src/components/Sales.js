import React from 'react';
import './Sales.css';

const Sales = () => {
  return (
    <section id="sales">
      <div className="container">
        <h2>Акції</h2>
        <p>Не пропустіть наші спеціальні пропозиції та знижки на спортивні товари!</p>
        <div className="sale-item">
          <h3>Знижка 20% на кросівки Nike</h3>
          <p>Придбайте кросівки Nike Air Zoom зі знижкою 20%! Акція діє тільки до кінця місяця.</p>
        </div>
        <div className="sale-item">
          <h3>Футболка Puma за ціною 699 грн</h3>
          <p>Отримайте футболку Puma за спеціальною ціною! Лише на обмежену кількість товарів.</p>
        </div>
        <div className="sale-item">
          <h3>Безкоштовна доставка</h3>
          <p>Від 799 грн безкоштовна доставка до вашого дому!</p>
        </div>
      </div>
    </section>
  );
};

export default Sales;
