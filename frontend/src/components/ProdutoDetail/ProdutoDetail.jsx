import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { obterProduto } from '../../api/produtoService';

export default function ProdutoDetail() {
  const { id } = useParams();
  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    obterProduto(id)
      .then(res => {
        setProduto(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (!produto) return <p>Produto não encontrado.</p>;

  return (
    <div style={{ maxWidth: 600, margin: '30px auto' }}>
      <h2>Detalhes do Produto</h2>
      <p><strong>Nome:</strong> {produto.nome}</p>
      <p><strong>Quantidade:</strong> {produto.quantidade}</p>
      <p><strong>Ativo:</strong> {produto.ativo ? 'Sim' : 'Não'}</p>
      <Link to="/" style={{ display: 'inline-block', marginTop: 20 }}>
        Voltar à lista
      </Link>
    </div>
  );
}
