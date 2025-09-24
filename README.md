# 🛍️ StockFlow  
> **Gerenciamento de Estoque com Dashboard, Upload de Imagens e Autenticação JWT**  

Um sistema completo para controle de produtos com **backend em Node.js + Express + MongoDB**,  
**frontend em HTML + TailwindCSS + JS**, autenticação via **JWT** e envio de notificações por **e-mail (Nodemailer)**.  

O projeto foi pensado para ser simples de rodar, mas robusto em boas práticas: separação por camadas (models, controllers, routes), autenticação segura, uploads de imagens, dashboard administrativo e uma loja para os usuários finais.  

---

## 🚀 Tecnologias utilizadas
- **Backend**: Node.js, Express, Mongoose, Multer, JWT, Nodemailer  
- **Frontend**: HTML5, TailwindCSS, JavaScript Vanilla  
- **Banco de Dados**: MongoDB Atlas  
- **Infraestrutura**: Configuração via `.env` e servidor Express  
- **Autenticação**: JWT + Middleware de roles (user/admin)  

---

## 📂 Estrutura do projeto
```
StockFlow/
├── server.js              # Ponto de entrada do backend
├── config/
│   ├── db.js              # Conexão com MongoDB
│   └── multer.js          # Configuração de upload
├── controllers/           # Lógica de negócio
│   ├── authController.js
│   ├── produtoController.js
│   └── dashboardController.js
├── middleware/
│   └── authMiddleware.js  # JWT e controle de acesso
├── models/                # Schemas Mongoose
│   ├── Produto.js
│   └── User.js
├── routes/                # Definição de rotas REST
│   ├── produtoRoutes.js
│   ├── authRoutes.js
│   ├── adminRoutes.js
│   └── userRoutes.js
├── front/                 # Frontend estático
│   ├── loja.html
│   ├── login.html
│   └── estoque.html
├── uploads/               # Pasta de imagens enviadas
└── .env                   # Variáveis de ambiente
```

---

## 🔑 Funcionalidades principais
- **Autenticação JWT**: login e cadastro de usuários, controle de acesso por role (`user` ou `admin`)  
- **Gestão de Produtos (CRUD)**:
  - Cadastrar, editar, excluir e listar produtos  
  - Upload de imagem com pré-visualização (Multer + FileReader)  
- **Dashboard Administrativo**:
  - Total de produtos  
  - Estoque baixo (<5 unidades)  
  - Valor total em estoque  
  - Produto mais barato e mais caro  
  - Gráfico dinâmico com Chart.js  
- **Loja (Frontend público)**:
  - Exibição de produtos em cards  
  - Layout responsivo, moderno e intuitivo  
- **Notificações por E-mail**:
  - Admin recebe alerta de novo produto cadastrado  
  - Usuários cadastrados recebem novidades da loja  

---

## ⚙️ Instalação e execução

### Pré-requisitos
- Node.js >= 18  
- Conta no MongoDB Atlas (ou MongoDB local)  
- Credenciais SMTP (ex: Gmail App Passwords)  

### Passo a passo
```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/stockflow.git
cd stockflow

# 2. Instale dependências
npm install

# 3. Crie a pasta de uploads
mkdir uploads

# 4. Configure o .env (exemplo abaixo)
PORT=3000
DB_USER=seuUsuario
DB_PASS=suaSenha
SECRET=suaChaveJWT
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=seuEmail@gmail.com
SMTP_PASS=suaSenhaOuAppPassword
ADMIN_EMAIL=admin@empresa.com

# 5. Rode o servidor
npm run dev    # para desenvolvimento (nodemon)
# ou
npm start
```

Frontend acessível em:  
- `http://localhost:3000/loja.html` → Loja pública  
- `http://localhost:3000/login.html` → Login / Cadastro  
- `http://localhost:3000/estoque.html` → Dashboard (admin)  

---

## 📡 Endpoints principais

### Autenticação
- `POST /auth/register` → cria usuário  
- `POST /auth/login` → retorna `{ token, role }`  

### Produtos
- `GET /produtos` → lista produtos (público)  
- `POST /produtos` → cria produto (**admin**)  
- `PUT /produtos/:id` → atualiza produto (**admin**)  
- `DELETE /produtos/:id` → exclui produto (**admin**)  

### Dashboard
- `GET /admin/dashboard` (**admin**) → retorna estatísticas do estoque  

### Uploads
- `GET /uploads/:filename` → acessa imagem de produto  

---

## 🧩 Exemplo de uso com curl

### Login e salvar token
```bash
curl -X POST http://localhost:3000/auth/login  -H "Content-Type: application/json"  -d '{"email":"admin@exemplo.com","password":"123456"}'
```

### Cadastrar produto
```bash
curl -X POST http://localhost:3000/produtos  -H "Authorization: Bearer SEU_TOKEN_AQUI"  -F "nome=Shampoo"  -F "descricao=Produto test"  -F "preco=19.90"  -F "estoque=10"  -F "categoria=Cabelos"  -F "imagem=@/caminho/imagem.jpg"
```

---

## 📊 Dashboard em ação
- Estatísticas rápidas sobre estoque  
- Gráfico de estoque baixo vs normal  
- Integração com **Chart.js** para visual dinâmico  

---

## 🔐 Segurança
- Senhas com hash (bcrypt)  
- Tokens JWT com expiração  
- Controle de acesso via middleware (`checkToken`, `checkAdmin`)  
- Upload validado (extensão + limite de 5MB)  

---

## 🚀 Próximos passos
- Integração com **Cloud Storage (S3, Firebase)** para imagens  
- Melhorias em UX do frontend da loja  
- Sistema de pedidos/carrinho  
- Testes automatizados (Jest/Supertest)  
- Deploy (Render, Railway ou AWS)  

---

## ✨ Autor
Projeto desenvolvido por **Camila Peretto**  
> 💡 Focado em boas práticas de backend + frontend e escalabilidade.  
