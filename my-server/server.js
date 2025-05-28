const { db } = require('./firebaseConfig');
const express = require('express');
const cors = require('cors');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = 5000;
const SECRET_KEY = 'my_secret_key';

// Middleware
app.use(cors());
app.use(express.json());

// Статичні файли
const publicPath = path.join(__dirname, 'public');
console.log("Public path is:", publicPath);
app.use(express.static(publicPath));

// ✅ API тест
app.get('/api/message', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

// ✅ Реєстрація з Firestore
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const snapshot = await db.collection('users')
      .where('username', '==', username)
      .get();

    if (!snapshot.empty) {
      return res.status(400).json({ message: 'Користувач вже існує' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUserRef = await db.collection('users').add({
      username,
      password: hashedPassword
    });

    res.json({ message: 'Реєстрація успішна', userId: newUserRef.id });
  } catch (error) {
    res.status(500).json({ message: 'Помилка реєстрації', error: error.message });
  }
});

// ✅ Логін з Firestore
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const snapshot = await db.collection('users')
      .where('username', '==', username)
      .get();

    if (snapshot.empty) {
      return res.status(400).json({ message: 'Користувача не знайдено' });
    }

    const userDoc = snapshot.docs[0];
    const user = userDoc.data();

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Невірний пароль' });
    }

    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Помилка входу', error: error.message });
  }
});

// 🔐 Middleware перевірки токена
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ message: 'Токен відсутній' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: 'Недійсний токен' });
  }
}

// ✅ Захищений маршрут профілю
app.get('/profile', authMiddleware, (req, res) => {
  res.json({ message: `Вітаю, ${req.user.username}` });
});

app.get('/api/protected', authMiddleware, (req, res) => {
  res.json({
    message: 'Це захищений маршрут. Ви авторизовані!',
    user: req.user
  });
});

// ✅ Додати користувача до Firestore
app.post('/api/users', async (req, res) => {
  try {
    const userData = req.body;
    const docRef = await db.collection('users').add(userData);
    res.status(201).json({ id: docRef.id, ...userData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Отримати всіх користувачів
app.get('/api/users', async (req, res) => {
  try {
    const snapshot = await db.collection('users').get();
    const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Додати товар до списку бажаного з валідацією та перевіркою на дубль
app.post('/wishlist', authMiddleware, async (req, res) => {
  const { name, image, price } = req.body;
  const userId = req.user.username;

  // 🔍 Валідація
  if (!name || !image || !price) {
    return res.status(400).json({ message: 'Усі поля (name, image, price) є обовʼязковими' });
  }

  try {
    // ❗ Перевірка на дубль
    const snapshot = await db.collection('wishlist')
      .where('userId', '==', userId)
      .where('name', '==', name)
      .get();

    if (!snapshot.empty) {
      return res.status(409).json({ message: 'Цей товар уже є у вашому списку бажаного' });
    }

    // ✅ Додаємо
    const docRef = await db.collection('wishlist').add({
      userId,
      name,
      image,
      price
    });

    res.status(201).json({ message: 'Товар додано до списку бажаного', id: docRef.id });
  } catch (error) {
    res.status(500).json({ message: 'Помилка при додаванні', error: error.message });
  }
});

// ✅ Отримати список бажаного користувача
app.get('/wishlist', authMiddleware, async (req, res) => {
  const userId = req.user.username;

  try {
    const snapshot = await db.collection('wishlist')
      .where('userId', '==', userId)
      .get();

    const wishlist = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: 'Помилка при отриманні списку', error: error.message });
  }
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер працює на http://localhost:${PORT}`);
});
