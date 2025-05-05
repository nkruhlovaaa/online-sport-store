import React, { useState, useEffect } from 'react';

import './ProductList.css'; // імпортуйте стилі

const products = [
  {
    image: "/images/tshirtpuma.jpg",
    name: "Футболка Puma",
    price: "999",
    available: "Так",
    rating: "4",
    description: "Легка та стильна футболка Puma, виготовлена з дихаючого матеріалу, який забезпечує комфорт під час тренувань і повсякденного носіння.",
  },
  {
    image: "images/tshirtnike.jpg",
    name: "Футболка Nike",
    price: "899",
    available: "Так",
    rating: "5",
    description: "Футболка Nike, виготовлена з високоякісного бавовняного матеріалу, який забезпечує комфорт на весь день.",
  },
  {
    image: "images/tshirtadidas.jpg",
    name: "Футболка Adidas Originals",
    price: "1099",
    available: "Так",
    rating: "4",
    description: "Футболка Adidas Originals з класичним дизайном та унікальним стилем.",
  },
  {
    image: "images/tsirtunderarmour.jpg",
    name: "Футболка Under Armour",
    price: "1299",
    available: "Ні",
    rating: "5",
    description: "Футболка Under Armour з технологією HeatGear, що забезпечує комфорт та підтримку під час фізичних навантажень.",
  },
  {
    image: "images/tshirtreebok.jpg",
    name: "Футболка Reebok Classic",
    price: "950",
    available: "Так",
    rating: "4",
    description: "Футболка Reebok Classic з мінімалістичним дизайном.",
  },
  {
    image: "images/tshirtnewbalance.jpg",
    name: "Футболка New Balance",
    price: "799",
    available: "Так",
    rating: "4",
    description: "Легка і комфортна футболка New Balance для активного відпочинку.",
  },
  {
    image: "images/tshirtchampion.jpg",
    name: "Футболка Champion",
    price: "1150",
    available: "Так",
    rating: "5",
    description: "Футболка Champion поєднує в собі стиль і зручність. Виготовлена з високоякісної бавовни, що дозволяє шкірі дихати та забезпечує комфорт протягом всього дня.",
  },
  {
    image: "images/tshirtvans.jpg",
    name: "Футболка Vans",
    price: "899",
    available: "Так",
    rating: "4",
    description: "Футболка Vans з стильним принтом і комфортним кроєм.",
  },
  {
    image: "images/nikesweatpants.jpg",
    name: "Спортивні штани Nike Tech Fleece",
    price: "2200",
    available: "Ні",
    rating: "5",
    description: "Комфортні та стильні спортивні штани Nike Tech Fleece.",
  },
  {
    image: "images/sweatpantsadidas.jpg",
    name: "Спортивні штани Adidas Tiro 21",
    price: "1800",
    available: "Так",
    rating: "4",
    description: "Спортивні штани Adidas Tiro 21 для тренувань та активного способу життя.",
  },
  {
    image: "images/sweatpantsunderarmour.jpg",
    name: "Спортивні штани Under Armour Rival Fleece",
    price: "2100",
    available: "Так",
    rating: "5",
    description: "Спортивні штани Under Armour Rival Fleece – це ідеальний вибір для тренувань в холодну погоду.",
  },
  {
    image: "images/sweatpantspuma.jpg",
    name: "Спортивні штани Puma Essential",
    price: "1500",
    available: "Так",
    rating: "4",
    description: "Спортивні штани Puma Essential поєднують стиль та функціональність.",
  },
  {
    image: "images/sweatpantsreebok.jpg",
    name: "Спортивні штани Reebok Identity",
    price: "1700",
    available: "Так",
    rating: "4",
    description: "Спортивні штани Reebok Identity, створені для комфорту і свободи рухів.",
  },
  {
    image: "images/sweatpantsnikedna.jpg",
    name: "Спортивні штани Nike Dri-FIT",
    price: "2500",
    available: "Так",
    rating: "4",
    description: "Штани з технологією Dri-FIT для виведення вологи, забезпечують комфорт під час тренувань.",
  },
  {
    image: "images/sweatpantsadidaszip.jpg",
    name: "Спортивні штани Adidas Essentials",
    price: "2000",
    available: "Так",
    rating: "4",
    description: "Комфортні штани для активних тренувань і відпочинку на кожен день.",
  },
  {
    image: "images/sweatpantsdnewbalance.jpg",
    name: "Спортивні штани New Balance Accelerate",
    price: "2300",
    available: "Так",
    rating: "5",
    description: "Легкі та дихаючі штани для бігу та спортивних активностей.",
  },
  {
    image: "images/sweatpantsrebookwork.jpg",
    name: "Спортивні штани Reebok Workout Ready",
    price: "2200",
    available: "Так",
    rating: "4",
    description: "Зручні та міцні штани, ідеальні для важких тренувань та фітнесу.",
  },
  {
    image: "images/sweatpantspumaa.jpg",
    name: "Спортивні штани Puma",
    price: "2100",
    available: "Так",
    rating: "4",
    description: "Стильні штани для активних тренувань з еластичного матеріалу для максимального комфорту.",
  },
  {
    image: "images/blousenike.jpg",
    name: "Худі Nike Sportswear",
    price: "2800",
    available: "Ні",
    rating: "5",
    description: "М'яке та тепле худі для комфортного носіння в будь-яку пору року.",
  },
  {
    image: "images/blouseadidasor.jpg",
    name: "Худі Adidas Originals",
    price: "2700",
    available: "Так",
    rating: "4",
    description: "Стильне худі з капюшоном для активного відпочинку та спорту.",
  },
  {
    image: "images/blousepuma.jpg",
    name: "Худі Puma Essential",
    price: "2500",
    available: "Так",
    rating: "4",
    description: "Класичне худі з м'якої тканини для тренувань та вільного часу.",
  },
  {
    image: "images/blouseunderarmour.jpg",
    name: "Худі Under Armour Tech",
    price: "3000",
    available: "Ні",
    rating: "4",
    description: "Технологічне худі з швидковисихаючого матеріалу для комфортних тренувань.",
  },
  {
    image: "images/sweatshirtnike.jpg",
    name: "Світшот Nike Club",
    price: "2200",
    available: "Так",
    rating: "5",
    description: "Класичний світшот для повсякденного носіння з комфортної бавовни.",
  },
  {
    image: "images/sweatshirtadidas.jpg",
    name: "Світшот Adidas Essential",
    price: "2300",
    available: "Так",
    rating: "4",
    description: "Стильний світшот для активних людей, що поєднує комфорт і функціональність.",
  },
  {
    image: "images/sweatshirtreebok.jpg",
    name: "Світшот Reebok Training",
    price: "2100",
    available: "Так",
    rating: "4",
    description: "Зручний і стильний світшот для спортивних тренувань і активного відпочинку.",
  },
  {
    image: "images/sweatshirtunder.jpg",
    name: "Світшот Under Armour Sportstyle",
    price: "2400",
    available: "Ні",
    rating: "4",
    description: "Спортивний світшот для зручності під час тренувань та повсякденного використання.",
  },
  {
    image: "images/sneakersnike.jpg",
    name: "Кросівки Nike Air Zoom",
    price: "3200",
    available: "Так",
    rating: "5",
    description: "Легкі та зручні кросівки для бігу на різних поверхнях.",
  },
  {
    image: "images/sneakersnikezoom.jpg",
    name: "Кросівки Nike Air Max 270",
    price: "5000",
    available: "Так",
    rating: "5",
    description: "Комфортні та стильні кросівки з технологією амортизації для щоденних прогулянок.",
  },
  {
    image: "images/sneakersadidas.jpg",
    name: "Кросівки Adidas Ultraboost 22",
    price: "5500",
    available: "Так",
    rating: "5",
    description: "Високий рівень комфорту та підтримки, ідеальні для бігу та активних тренувань.",
  },
  {
    image: "images/sneakerspuma.jpg",
    name: "Кросівки Puma Ignite",
    price: "4500",
    available: "Так",
    rating: "4",
    description: "Легкі та зручні кросівки з чудовою амортизацією для активних тренувань і повсякденного носіння.",
  },
  {
    image: "images/sneakersreebok.jpg",
    name: "Кросівки Reebok Nano X1",
    price: "4800",
    available: "Ні",
    rating: "5",
    description: "Надійні кросівки для тренувань в залі та на відкритому повітрі, створені для максимального комфорту.",
  },
  {
    image: "images/sneakersunderarmour.jpg",
    name: "Кросівки Under Armour HOVR Phantom",
    price: "5200",
    available: "Так",
    rating: "5",
    description: "Технологічні кросівки з передовою амортизацією для бігу та тренувань.",
  },
  {
    image: "images/sneakersnewbalance.jpg",
    name: "Кросівки New Balance 574",
    price: "4700",
    available: "Так",
    rating: "4",
    description: "Стильні та зручні кросівки для прогулянок та активного способу життя.",
  },
  {
    image: "images/sneakersnewbalance990.jpg",
    name: "Кросівки New Balance 990v5",
    price: "4900",
    available: "Ні",
    rating: "5",
    description: "Преміум кросівки для активних людей, що поєднують стиль, комфорт та підтримку під час кожного кроку.",
  }
  // Додавайте інші товари в такому ж форматі
];

const ProductCard = ({ product, isInCart, onAddToCart }) => (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p className="price">Ціна: {product.price} грн</p>
      <p>В наявності: {product.available}</p>
      <p>Рейтинг: {'★'.repeat(product.rating)}{'☆'.repeat(5 - product.rating)}</p>
      <p>Опис: {product.description}</p>
      <button onClick={onAddToCart} disabled={isInCart}>
        {isInCart ? "Товар у кошику" : "Додати до кошика"}
      </button>
    </div>
  );
  
  const ProductList = () => {
    const [cartItems, setCartItems] = useState([]);
    const [sortOption, setSortOption] = useState("none");
  
    useEffect(() => {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      const productNames = storedCart.map((item) => item.name);
      setCartItems(productNames);
    }, []);
  
    const handleAddToCart = (product) => {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      const existingProduct = storedCart.find(item => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        storedCart.push({ ...product, quantity: 1 });
      }
      localStorage.setItem("cart", JSON.stringify(storedCart));
      setCartItems([...cartItems, product.name]);
    };
  
    const sortedProducts = [...products].sort((a, b) => {
      if (sortOption === "price") return a.price - b.price;
      if (sortOption === "rating") return b.rating - a.rating;
      return 0;
    });
  
    return (
      <div>
        <div style={{ marginBottom: "20px" }}>
          <label>Сортувати за: </label>
          <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
            <option value="none">Без сортування</option>
            <option value="price">Ціною (зростання)</option>
            <option value="rating">Рейтингом (спадання)</option>
          </select>
        </div>
        <div className="product-grid">
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isInCart={cartItems.includes(product.name)}
              onAddToCart={() => handleAddToCart(product)}
            />
          ))}
        </div>
      </div>
    );
  };
  
  export default ProductList;