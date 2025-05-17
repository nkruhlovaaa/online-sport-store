import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";  // Імпортуємо Firebase Auth

import './ProductList.css'; // імпортуємо стилі

const products = [
  {
    id: "tshirtpuma-1", 
    image: "/images/tshirtpuma.jpg",
    name: "Футболка Puma",
    price: 999, // зроби числом, не рядком!
    discount: 20, // знижка в %
    available: "Так",
    rating: "4",
    description: "Легка та стильна футболка Puma, виготовлена з дихаючого матеріалу, який забезпечує комфорт під час тренувань і повсякденного носіння.",
  },
  {
    id: "tshirtnike-2", 
    image: "images/tshirtnike.jpg",
    name: "Футболка Nike",
    price: "899",
    available: "Так",
    rating: "5",
    description: "Футболка Nike, виготовлена з високоякісного бавовняного матеріалу, який забезпечує комфорт на весь день.",
  },
  {
    id: "tshirtadidas-3", 
    image: "images/tshirtadidas.jpg",
    name: "Футболка Adidas Originals",
    price: 1099,
    discount: 10,
    available: "Так",
    rating: "4",
    description: "Футболка Adidas Originals з класичним дизайном та унікальним стилем.",
  },
  {
    id: "tsirtunderarmour-4", 
    image: "images/tsirtunderarmour.jpg",
    name: "Футболка Under Armour",
    price: "1299",
    available: "Ні",
    rating: "5",
    description: "Футболка Under Armour з технологією HeatGear, що забезпечує комфорт та підтримку під час фізичних навантажень.",
  },
  {
    id: "tshirtreebok-5", 
    image: "images/tshirtreebok.jpg",
    name: "Футболка Reebok Classic",
    price: "950",
    available: "Так",
    rating: "4",
    description: "Футболка Reebok Classic з мінімалістичним дизайном.",
  },
  {
    id: "tshirtnewbalance-6", 
    image: "images/tshirtnewbalance.jpg",
    name: "Футболка New Balance",
    price: 799,
    discount: 15,
    available: "Так",
    rating: "4",
    description: "Легка і комфортна футболка New Balance для активного відпочинку.",
  },
  {
    id: "tshirtchampion-7", 
    image: "images/tshirtchampion.jpg",
    name: "Футболка Champion",
    price: "1150",
    available: "Так",
    rating: "5",
    description: "Футболка Champion поєднує в собі стиль і зручність. Виготовлена з високоякісної бавовни, що дозволяє шкірі дихати та забезпечує комфорт протягом всього дня.",
  },
  {
    id: "tshirtvans-8", 
    image: "images/tshirtvans.jpg",
    name: "Футболка Vans",
    price: "899",
    available: "Так",
    rating: "4",
    description: "Футболка Vans з стильним принтом і комфортним кроєм.",
  },
  {
    id: "nikesweatpants-9", 
    image: "images/nikesweatpants.jpg",
    name: "Спортивні штани Nike Tech Fleece",
    price: "2200",
    available: "Ні",
    rating: "5",
    description: "Комфортні та стильні спортивні штани Nike Tech Fleece.",
  },
  {
    id: "sweatpantsadidas-10", 
    image: "images/sweatpantsadidas.jpg",
    name: "Спортивні штани Adidas Tiro 21",
    price: 1800,
    discount: 5,
    available: "Так",
    rating: "4",
    description: "Спортивні штани Adidas Tiro 21 для тренувань та активного способу життя.",
  },
  {
    id: "sweatpantsunderarmour-12", 
    image: "images/sweatpantsunderarmour.jpg",
    name: "Спортивні штани Under Armour Rival Fleece",
    price: "2100",
    available: "Так",
    rating: "5",
    description: "Спортивні штани Under Armour Rival Fleece – це ідеальний вибір для тренувань в холодну погоду.",
  },
  {
    id: "sweatpantspuma-13", 
    image: "images/sweatpantspuma.jpg",
    name: "Спортивні штани Puma Essential",
    price: 1500,
    discount: 10,
    available: "Так",
    rating: "4",
    description: "Спортивні штани Puma Essential поєднують стиль та функціональність.",
  },
  {
    id: "sweatpantsreebok-14", 
    image: "images/sweatpantsreebok.jpg",
    name: "Спортивні штани Reebok Identity",
    price: "1700",
    available: "Так",
    rating: "4",
    description: "Спортивні штани Reebok Identity, створені для комфорту і свободи рухів.",
  },
  {
    id: "sweatpantsnikedna-15", 
    image: "images/sweatpantsnikedna.jpg",
    name: "Спортивні штани Nike Dri-FIT",
    price: "2500",
    available: "Так",
    rating: "4",
    description: "Штани з технологією Dri-FIT для виведення вологи, забезпечують комфорт під час тренувань.",
  },
  {
    id: "sweatpantsadidaszip-16", 
    image: "images/sweatpantsadidaszip.jpg",
    name: "Спортивні штани Adidas Essentials",
    price: "2000",
    available: "Так",
    rating: "4",
    description: "Комфортні штани для активних тренувань і відпочинку на кожен день.",
  },
  {
    id: "sweatpantsdnewbalance-17", 
    image: "images/sweatpantsdnewbalance.jpg",
    name: "Спортивні штани New Balance Accelerate",
    price: "2300",
    available: "Так",
    rating: "5",
    description: "Легкі та дихаючі штани для бігу та спортивних активностей.",
  },
  {
    id: "sweatpantsrebookwork-18", 
    image: "images/sweatpantsrebookwork.jpg",
    name: "Спортивні штани Reebok Workout Ready",
    price: "2200",
    available: "Так",
    rating: "4",
    description: "Зручні та міцні штани, ідеальні для важких тренувань та фітнесу.",
  },
  {
    id: "sweatpantspumaa-19", 
    image: "images/sweatpantspumaa.jpg",
    name: "Спортивні штани Puma",
    price: "2100",
    available: "Так",
    rating: "4",
    description: "Стильні штани для активних тренувань з еластичного матеріалу для максимального комфорту.",
  },
  {
    id: "blousenike-20", 
    image: "images/blousenike.jpg",
    name: "Худі Nike Sportswear",
    price: 2800,
    discount: 15,
    available: "Ні",
    rating: "5",
    description: "М'яке та тепле худі для комфортного носіння в будь-яку пору року.",
  },
  {
    id: "blouseadidasor-21", 
    image: "images/blouseadidasor.jpg",
    name: "Худі Adidas Originals",
    price: "2700",
    available: "Так",
    rating: "4",
    description: "Стильне худі з капюшоном для активного відпочинку та спорту.",
  },
  {
    id: "blousepuma-22", 
    image: "images/blousepuma.jpg",
    name: "Худі Puma Essential",
    price: "2500",
    available: "Так",
    rating: "4",
    description: "Класичне худі з м'якої тканини для тренувань та вільного часу.",
  },
  {
    id: "blouseunderarmour-23", 
    image: "images/blouseunderarmour.jpg",
    name: "Худі Under Armour Tech",
    price: "3000",
    available: "Ні",
    rating: "4",
    description: "Технологічне худі з швидковисихаючого матеріалу для комфортних тренувань.",
  },
  {
    id: "sweatshirtnike-24", 
    image: "images/sweatshirtnike.jpg",
    name: "Світшот Nike Club",
    price: "2200",
    available: "Так",
    rating: "5",
    description: "Класичний світшот для повсякденного носіння з комфортної бавовни.",
  },
  {
    id: "sweatshirtadidas-25", 
    image: "images/sweatshirtadidas.jpg",
    name: "Світшот Adidas Essential",
    price: "2300",
    available: "Так",
    rating: "4",
    description: "Стильний світшот для активних людей, що поєднує комфорт і функціональність.",
  },
  {
    id: "sweatshirtreebok-26", 
    image: "images/sweatshirtreebok.jpg",
    name: "Світшот Reebok Training",
    price: "2100",
    available: "Так",
    rating: "4",
    description: "Зручний і стильний світшот для спортивних тренувань і активного відпочинку.",
  },
  {
    id: "sweatshirtunder-27", 
    image: "images/sweatshirtunder.jpg",
    name: "Світшот Under Armour Sportstyle",
    price: "2400",
    available: "Ні",
    rating: "4",
    description: "Спортивний світшот для зручності під час тренувань та повсякденного використання.",
  },
  {
    id: "sneakersnike-28", 
    image: "images/sneakersnike.jpg",
    name: "Кросівки Nike Air Zoom",
    price: "3200",
    available: "Так",
    rating: "5",
    description: "Легкі та зручні кросівки для бігу на різних поверхнях.",
  },
  {
    id: "sneakersnikezoom-29", 
    image: "images/sneakersnikezoom.jpg",
    name: "Кросівки Nike Air Max 270",
    price: "5000",
    available: "Так",
    rating: "5",
    description: "Комфортні та стильні кросівки з технологією амортизації для щоденних прогулянок.",
  },
  {
    id: "sneakersadidas-30", 
    image: "images/sneakersadidas.jpg",
    name: "Кросівки Adidas Ultraboost 22",
    price: "5500",
    available: "Так",
    rating: "5",
    description: "Високий рівень комфорту та підтримки, ідеальні для бігу та активних тренувань.",
  },
  {
    id: "sneakerspuma-31", 
    image: "images/sneakerspuma.jpg",
    name: "Кросівки Puma Ignite",
    price: "4500",
    available: "Так",
    rating: "4",
    description: "Легкі та зручні кросівки з чудовою амортизацією для активних тренувань і повсякденного носіння.",
  },
  {
    id: "sneakersreebok-32", 
    image: "images/sneakersreebok.jpg",
    name: "Кросівки Reebok Nano X1",
    price: "4800",
    available: "Ні",
    rating: "5",
    description: "Надійні кросівки для тренувань в залі та на відкритому повітрі, створені для максимального комфорту.",
  },
  {
    id: "sneakersunderarmour-33", 
    image: "images/sneakersunderarmour.jpg",
    name: "Кросівки Under Armour HOVR Phantom",
    price: "5200",
    available: "Так",
    rating: "5",
    description: "Технологічні кросівки з передовою амортизацією для бігу та тренувань.",
  },
  {
    id: "sneakersnewbalance-34", 
    image: "images/sneakersnewbalance.jpg",
    name: "Кросівки New Balance 574",
    price: "4700",
    available: "Так",
    rating: "4",
    description: "Стильні та зручні кросівки для прогулянок та активного способу життя.",
  },
  {
    id: "sneakersnewbalance990-35", 
    image: "images/sneakersnewbalance990.jpg",
    name: "Кросівки New Balance 990v5",
    price: "4900",
    available: "Ні",
    rating: "5",
    description: "Преміум кросівки для активних людей, що поєднують стиль, комфорт та підтримку під час кожного кроку.",
  }
  // Додавайте інші товари в такому ж форматі
];


const ProductCard = ({ product, isInCart, onAddToCart, addToWishlist, uid }) => {
  // Обчислення зниженої ціни
  const discountedPrice = product.discount 
    ? product.price * (1 - product.discount / 100) 
    : product.price;

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p className="price">
        {/* Перекреслена ціна і нова ціна зі знижкою */}
        {product.discount && <span className="old-price">{product.price} грн</span>}
        <span className={product.discount ? "discounted-price" : ""}>
          {discountedPrice} грн
        </span>
      </p>
      <p>В наявності: {product.available}</p>
      <p>Рейтинг: {'★'.repeat(product.rating)}{'☆'.repeat(5 - product.rating)}</p>
      <p>Опис: {product.description}</p>
      <button onClick={onAddToCart} disabled={isInCart}>
        {isInCart ? "Товар у кошику" : "Додати до кошика"}
      </button>
      <button onClick={() => addToWishlist(product, uid)}>
        🤍 Додати до бажаного
      </button>
    </div>
  );
};

const ProductList = () => {
  const [cartItems, setCartItems] = useState([]);
  const [sortOption, setSortOption] = useState("none");
  const [uid, setUid] = useState(null);  // Стан для збереження UID користувача

  // Перевірка автентифікації користувача
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid); // Отримуємо UID користувача
      } else {
        setUid(null); // Якщо користувач не автентифікований
      }
    });

    return () => unsubscribe();  // Очищаємо підписку
  }, []);

  // Використання localStorage для кошика
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

  const addToWishlist = (product, uid) => {
    const wishlistKey = `wishlist-${uid}`;
    const wishlist = JSON.parse(localStorage.getItem(wishlistKey)) || [];
    const exists = wishlist.find(item => item.id === product.id);
    if (!exists) {
      wishlist.push(product);
      localStorage.setItem(wishlistKey, JSON.stringify(wishlist));
      alert(`${product.name} додано до списку бажаного`);
    } else {
      alert(`${product.name} вже у списку бажаного`);
    }
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
            addToWishlist={addToWishlist}
            uid={uid} // Передаємо UID користувача в ProductCard
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
