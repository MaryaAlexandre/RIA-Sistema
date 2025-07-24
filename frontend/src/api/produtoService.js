import axios from 'axios';

const API_URL = 'http://localhost:4000/produtos';

export const listarProdutos = () => axios.get(API_URL);
export const obterProduto = (id) => axios.get(`${API_URL}/${id}`);
export const criarProduto = (produto) => axios.post(API_URL, produto);
export const atualizarProduto = (id, produto) => axios.put(`${API_URL}/${id}`, produto);
export const removerProduto = (id) => axios.delete(`${API_URL}/${id}`);
