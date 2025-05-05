import React from 'react';

const Profile = () => {
  return (
    <div>
      <header>
        <div className="container">
          <h1>Мій профіль</h1>
        </div>
      </header>

      <main>
        <section id="profile-info">
          <div className="container">
            <h2>Особисті дані</h2>
            <p><strong>Ім'я:</strong> Анастасія Круглова</p>
            <p><strong>Email:</strong> nast.kruhlova@gmail.com</p>
            <p><strong>Телефон:</strong> +38 099 123 45 67</p>

            <h3>Адреса доставки</h3>
            <p>Вулиця: Шевченка, 12</p>
            <p>Місто: Львів</p>
            <p>Поштовий індекс: 61000</p>

            <h3>Мої замовлення</h3>
            <ul>
              <li>Худі Under Armour Tech — статус: В обробці</li>
              <li>Кросівки Nike Air Zoom — статус: Доставлено</li>
            </ul>

            <h3>Редагувати профіль</h3>
            <form onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="edit-name">Ім'я:</label>
              <input type="text" id="edit-name" name="name" defaultValue="Анастасія Круглова" required />
              <br />
              <label htmlFor="edit-email">Email:</label>
              <input type="email" id="edit-email" name="email" defaultValue="nast.kruhlova@gmail.com" required />
              <br />
              <label htmlFor="edit-phone">Телефон:</label>
              <input type="tel" id="edit-phone" name="phone" defaultValue="+38 099 123 45 67" required />
              <br />
              <label htmlFor="edit-street">Вулиця:</label>
              <input type="text" id="edit-street" name="street" defaultValue="Шевченка, 12" required />
              <br />
              <label htmlFor="edit-city">Місто:</label>
              <input type="text" id="edit-city" name="city" defaultValue="Львів" required />
              <br />
              <label htmlFor="edit-postcode">Поштовий індекс:</label>
              <input type="text" id="edit-postcode" name="postcode" defaultValue="61000" required />
              <br />
              <button type="submit">Зберегти зміни</button>
            </form>
          </div>
        </section>
      </main>

      <footer>
        <div className="container">
          <p>&copy; 2025 Спортивний магазин. Усі права захищено.</p>
        </div>
      </footer>
    </div>
  );
};

export default Profile;
