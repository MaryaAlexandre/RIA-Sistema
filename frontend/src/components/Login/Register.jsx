import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');

    try {
      const res = await fetch('https://congenial-sniffle-v6rv7vq469x3x54q-4000.app.github.dev/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
        });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Erro ao cadastrar');
      }

      alert('Cadastro realizado com sucesso!');
      navigate('/login');
    } catch (err) {
      setErro(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Cadastro</h2>

      {erro && <p style={{ color: 'red' }}>{erro}</p>}

      <div>
        <label>Usuário:</label>
        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Senha:</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit">Cadastrar</button>
    </form>
  );
}
