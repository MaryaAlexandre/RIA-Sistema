const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs'); 
const app = express();
const PORT = 4000;
const SECRET = 'chave_secreta_jwt';

// Middleware
app.use(cors());
app.use(bodyParser.json());

// "Banco de dados" simulado
let users = [
  {
    id: 1,
    username: 'admin',
    passwordHash: bcrypt.hashSync('1234', 8),
  }
];
let nextUserId = 2;

let produtos = [
  { id: 1, nome: 'Produto 1', preco: 10, disponivel: true },
  { id: 2, nome: 'Produto 2', preco: 20, disponivel: false }
];
let currentId = 3;

// Middleware de autenticação
function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ error: 'Token não fornecido' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token inválido' });

  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token inválido ou expirado' });
    req.user = user;
    next();
  });
}

// Login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username);
  if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
    return res.status(401).json({ error: 'Usuário ou senha inválidos' });
  }

  const token = jwt.sign({ username }, SECRET, { expiresIn: '1h' });
  res.json({ token });
});

// Cadastro
app.post('/register', (req, res) => {
  const { username, password } = req.body;

  const userExists = users.some(u => u.username === username);
  if (userExists) return res.status(400).json({ error: 'Usuário já existe' });

  const passwordHash = bcrypt.hashSync(password, 8);
  const newUser = { id: nextUserId++, username, passwordHash };
  users.push(newUser);

  const token = jwt.sign({ username }, SECRET, { expiresIn: '1h' });
  res.status(201).json({ token });
});

// CRUD Produtos (protegido)
app.get('/produtos', authMiddleware, (req, res) => {
  res.json(produtos);
});

app.get('/produtos/:id', authMiddleware, (req, res) => {
  const produto = produtos.find(p => p.id == req.params.id);
  if (!produto) return res.status(404).json({ error: 'Produto não encontrado' });
  res.json(produto);
});

app.post('/produtos', authMiddleware, (req, res) => {
  const { nome, preco, disponivel } = req.body;
  const novoProduto = { id: currentId++, nome, preco, disponivel };
  produtos.push(novoProduto);
  res.status(201).json(novoProduto);
});

app.put('/produtos/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  const index = produtos.findIndex(p => p.id == id);
  if (index < 0) return res.status(404).json({ error: 'Produto não encontrado' });

  const { nome, preco, disponivel } = req.body;
  produtos[index] = { id: +id, nome, preco, disponivel };
  res.json(produtos[index]);
});

app.delete('/produtos/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  const index = produtos.findIndex(p => p.id == id);
  if (index < 0) return res.status(404).json({ error: 'Produto não encontrado' });

  produtos.splice(index, 1);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`✅ Backend rodando em http://localhost:${PORT}`);
});
