import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "./firebase";

// Додати продукт
const addProduct = async (product) => {
  await addDoc(collection(db, "products"), product);
};

// Додати акцію
const addSale = async (sale) => {
  await addDoc(collection(db, "sales"), sale);
};

// Отримати всі продукти
const fetchProducts = async () => {
  const snapshot = await getDocs(collection(db, "products"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Отримати всі акції
const fetchSales = async () => {
  const snapshot = await getDocs(collection(db, "sales"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export { addProduct, addSale, fetchProducts, fetchSales };
