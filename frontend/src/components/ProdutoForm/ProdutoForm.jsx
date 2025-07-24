import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './ProdutoForm.module.css';
import {
  obterProduto,
  criarProduto,
  atualizarProduto
} from '../../api/produtoService';

export default function ProdutoForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: { nome: '', preco: '', disponivel: false }
  });

  useEffect(() => {
    if (id) {
      obterProduto(id)
        .then(response => {
          const produto = response.data;
          setValue('nome', produto.nome);
          setValue('preco', produto.preco);
          setValue('disponivel', produto.disponivel);
        })
        .catch(err => console.error('Erro ao carregar produto:', err));
    }
  }, [id, setValue]);

  const onSubmit = data => {
    const action = id ? atualizarProduto : criarProduto;

    action(id, data)
      .then(() => navigate('/'))
      .catch(err => console.error('Erro ao salvar produto:', err));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <h2 className={styles.title}>{id ? 'Editar Produto' : 'Novo Produto'}</h2>
      
      <label className={styles.label}>Nome:</label>
      <input {...register('nome', { required: true })} className={styles.input} />

      <label className={styles.label}>Preço:</label>
      <input
        type="number"
        step="0.01"
        {...register('preco', { required: true, min: 0 })}
        className={styles.input}
      />

      <label className={styles.checkboxLabel}>
        <input type="checkbox" {...register('disponivel')} />
        Disponível
      </label>

      <button type="submit" className={styles.btn}>
        {id ? 'Atualizar' : 'Cadastrar'}
      </button>
    </form>
  );
}
