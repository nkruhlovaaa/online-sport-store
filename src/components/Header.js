import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

const AppWithHeader = () => {
  const navigate = useNavigate();

  return (
    <div>
      <header>
        <div className="container">
          <h1>Спортивний магазин</h1>
          <nav>
            <ul>
              <li><button onClick={() => navigate("/")}>Товари</button></li>
              <li><button onClick={() => navigate("/sales")}>Акції</button></li>
              <li><button onClick={() => navigate("/cart")}>Кошик</button></li>
              <li><button onClick={() => navigate("/about")}>Про нас</button></li>
              <li><button onClick={() => navigate("/profile")}>Мій профіль</button></li>
              <li><button onClick={() => navigate("/login")}>Увійти</button></li>
              <li><button onClick={() => navigate("/register")}>Реєстрація</button></li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </div>
  );
};
