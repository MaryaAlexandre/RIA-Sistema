import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  listarProdutos,
  removerProduto
} from '../../api/produtoService';

export default function ProdutoList() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    carregarProdutos();
  }, []);

  const carregarProdutos = () => {
    listarProdutos()
      .then(res => setProdutos(res.data))
      .catch(err => console.error(err));
  };

  const handleRemover = (id) => {
    if (window.confirm('Deseja remover este produto?')) {
      removerProduto(id)
        .then(() => carregarProdutos())
        .catch(err => console.error(err));
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: '30px auto' }}>
      <h2>Lista de Produtos</h2>
      <table width="100%" border="1" cellPadding="8" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Quantidade</th>
            <th>Ativo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map(prod => (
            <tr key={prod.id}>
              <td><Link to={`/produtos/${prod.id}`}>{prod.nome}</Link></td>
              <td>{prod.quantidade}</td>
              <td>{prod.ativo ? 'Sim' : 'Não'}</td>
              <td>
                <Link to={`/produtos/editar/${prod.id}`} style={{ marginRight: 10 }}>Editar</Link>
                <button onClick={() => handleRemover(prod.id)}>Remover</button>
              </td>
            </tr>
          ))}
          {produtos.length === 0 && (
            <tr><td colSpan="4" style={{ textAlign: 'center' }}>Nenhum produto encontrado.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
