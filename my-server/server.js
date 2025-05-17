const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Шлях до public
const publicPath = path.join(__dirname, 'public');
console.log("Public path is:", publicPath);

// Статичні файли
app.use(express.static(publicPath));

// ❌ Не додавай app.get('/') — express.static вже це робить

// API тест
app.get('/api/message', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

app.listen(PORT, () => {
  console.log(`Сервер працює на http://localhost:${PORT}`);
});
