import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/Login/Register.jsx';

import Navbar from './components/Navbar/Navbar.jsx';
import Login from './components/Login/Login.jsx';
import ProdutoList from './components/ProdutoList/ProdutoList.jsx';
import ProdutoDetail from './components/ProdutoDetail/ProdutoDetail.jsx';
import ProdutoForm from './components/ProdutoForm/ProdutoForm.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';




export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
          
          <Route path="/" element={
            <PrivateRoute>
              <ProdutoList />
            </PrivateRoute>
          } />

          <Route path="/produtos/novo" element={
            <PrivateRoute>
              <ProdutoForm />
            </PrivateRoute>
          } />

          <Route path="/produtos/editar/:id" element={
            <PrivateRoute>
              <ProdutoForm />
            </PrivateRoute>
          } />

          <Route path="/produtos/:id" element={
            <PrivateRoute>
              <ProdutoDetail />
            </PrivateRoute>
          } />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
