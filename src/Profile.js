import React, { useState } from "react";

function Profile() {
  const [name, setName] = useState("Анастасія Круглова");
  const [email, setEmail] = useState("nast.kruhlova@gmail.com");
  const [phone, setPhone] = useState("+38 099 123 45 67");
  const [street, setStreet] = useState("Шевченка, 12");
  const [city, setCity] = useState("Львів");
  const [postcode, setPostcode] = useState("61000");

  const handleSave = (e) => {
    e.preventDefault();
    // Тут можна додати збереження змін профілю
  };

  return (
    <div className="container">
      <h2>Особисті дані</h2>
      <p><strong>Ім'я:</strong> {name}</p>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Телефон:</strong> {phone}</p>

      <h3>Адреса доставки</h3>
      <p>Вулиця: {street}</p>
      <p>Місто: {city}</p>
      <p>Поштовий індекс: {postcode}</p>

      <h3>Мої замовлення</h3>
      <ul>
        <li>Худі Under Armour Tech — статус: В обробці</li>
        <li>Кросівки Nike Air Zoom — статус: Доставлено</li>
      </ul>

      <h3>Редагувати профіль</h3>
      <form onSubmit={handleSave}>
        <label htmlFor="edit-name">Ім'я:</label>
        <input
          type="text"
          id="edit-name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <label htmlFor="edit-email">Email:</label>
        <input
          type="email"
          id="edit-email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label htmlFor="edit-phone">Телефон:</label>
        <input
          type="tel"
          id="edit-phone"
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <br />
        <label htmlFor="edit-street">Вулиця:</label>
        <input
          type="text"
          id="edit-street"
          name="street"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
        />
        <br />
        <label htmlFor="edit-city">Місто:</label>
        <input
          type="text"
          id="edit-city"
          name="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <br />
        <label htmlFor="edit-postcode">Поштовий індекс:</label>
        <input
          type="text"
          id="edit-postcode"
          name="postcode"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
        />
        <br />
        <button type="submit">Зберегти зміни</button>
      </form>
    </div>
  );
}

export default Profile;
