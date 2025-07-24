import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Aqui simula autenticação e token JWT
    if (email === 'admin' && password === '123') {
      login('fake-jwt-token');
      navigate('/');
    } else {
      alert('Credenciais inválidas');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '50px auto' }}>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={{ width: '100%', marginBottom: 10, padding: 8 }}
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        style={{ width: '100%', marginBottom: 10, padding: 8 }}
      />
      <button type="submit" style={{ width: '100%', padding: 10 }}>
        Entrar
      </button>
      <p>Ainda não tem conta? <a href="/register">Cadastre-se aqui</a></p>
    </form>
  );
}
