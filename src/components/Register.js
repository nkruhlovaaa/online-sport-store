import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Додаємо ім’я та прізвище до профілю користувача
      await updateProfile(userCredential.user, {
        displayName: `${firstName} ${lastName}`,
      });
      alert("Реєстрація успішна!");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Реєстрація</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Ім’я"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        /><br />
        <input
          type="text"
          placeholder="Прізвище"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        /><br />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />
        <button type="submit">Зареєструватись</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Register;
