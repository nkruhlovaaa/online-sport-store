const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// 👉 Реєстрація
export async function register(username, password) {
  const res = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  return res.json();
}

// 👉 Вхід
export async function login(username, password) {
  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  return res.json();
}

// 👉 Профіль
export async function getProfile(token) {
  const res = await fetch(`${API_URL}/profile`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
}

// 👉 Додати товар до списку бажаного
export async function addToWishlist(token, item) {
  const res = await fetch(`${API_URL}/wishlist`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(item)
  });
  return res.json();
}

// 👉 Отримати список бажаного
export async function getWishlist(token) {
  const res = await fetch(`${API_URL}/wishlist`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
}
