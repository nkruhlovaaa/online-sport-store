// src/components/Wishlist.js
import React, { useEffect, useState } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../firebase";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const auth = getAuth();
      const uid = auth.currentUser?.uid;

      if (!uid) {
        console.log("Користувач не авторизований");
        return;
      }

      const wishlistRef = collection(db, "wishlist", uid, "wishlist");
      const snapshot = await getDocs(wishlistRef);
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setWishlistItems(items);
    } catch (error) {
      console.error("Помилка при завантаженні списку бажаного:", error);
    }
  };

  const addToWishlist = async (product) => {
    try {
      const auth = getAuth();
      const uid = auth.currentUser?.uid;

      if (!uid) {
        console.log("Користувач не авторизований");
        return;
      }

      const wishlistRef = collection(db, "wishlist", uid, "wishlist");
      await addDoc(wishlistRef, product);
      alert("Товар додано до списку бажаного!");
      fetchWishlist();
    } catch (error) {
      console.error("Помилка при додаванні до списку бажаного:", error);
    }
  };

  const products = [
    
    {
      name: "Футболка Puma",
      price: 999,
      discount: 30,
      image: "https://ua.puma.com/uk/puma-x-charlotte-rohde-tee-unisex-629415-01.html"
    },
    {
      name: "Футболка Nike",
      price: 899,
      discount: 10,
      image: "https://modivo.ua/p/nike-futbolka-dc7817-zelenii-loose-fit-0000305366092"
    },
    {
      name: "Футболка Adidas Originals",
      price: 1099,
      discount: 20,
      image: "https://modivo.ua/p/adidas-futbolka-adicolor-classics-3-stripes-t-shirt-ia4845-chornii-slim-fit"
    }
  ];

  return (
    <div>
      <h2>Список бажаного</h2>

      {products.map((product, index) => {
        const discountPrice = product.discount
          ? (product.price * (1 - product.discount / 100)).toFixed(2)
          : product.price;

        return (
          <div key={index} className="product">
            <img src={product.image} alt={product.name} width="100" />
            <p>{product.name}</p>
            {product.discount ? (
              <p>
                <span style={{ textDecoration: "line-through", color: "gray" }}>
                  {product.price} грн
                </span>{" "}
                <span style={{ color: "red", fontWeight: "bold" }}>
                  {discountPrice} грн
                </span>{" "}
                (-{product.discount}%)
              </p>
            ) : (
              <p>Ціна: {product.price} грн</p>
            )}
            <button onClick={() => addToWishlist(product)}>Додати</button>
          </div>
        );
      })}

      <h3>Ваш список бажаного</h3>
      {wishlistItems.length === 0 ? (
        <p>Список бажаного порожній</p>
      ) : (
        <ul>
          {wishlistItems.map(item => (
            <li key={item.id}>
              <img src={item.image} alt={item.name} width="100" />
              <p>{item.name}</p>
              {item.discount ? (
                <p>
                  <span style={{ textDecoration: "line-through", color: "gray" }}>
                    {item.price} грн
                  </span>{" "}
                  <span style={{ color: "red", fontWeight: "bold" }}>
                    {(item.price * (1 - item.discount / 100)).toFixed(2)} грн
                  </span>{" "}
                  (-{item.discount}%)
                </p>
              ) : (
                <p>Ціна: {item.price} грн</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Wishlist;
