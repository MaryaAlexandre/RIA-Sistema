import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';

export default function Navbar() {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{ padding: '10px', backgroundColor: '#282c34', color: 'white' }}>
      <Link to="/" style={{ marginRight: 20, color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>
        Produtos
      </Link>

      {isAuthenticated ? (
        <>
          <Link to="/produtos/novo" style={{ marginRight: 20, color: 'white', textDecoration: 'none' }}>
            Novo Produto
          </Link>
          <button onClick={handleLogout} style={{ cursor: 'pointer' }}>
            Sair
          </button>
        </>
      ) : (
        <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>
          Login
        </Link>
      )}
    </nav>
  );
}
