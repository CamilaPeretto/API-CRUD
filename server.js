const express = require("express");
const path = require('path');
const cors = require("cors");
const connectDB = require("./config/db");

const produtoRoutes = require("./routes/produtoRoutes");
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'front'))); 

app.get("/", (req, res) => {
  res.send("API CRUD de Produtos");
});

app.use("/produtos", produtoRoutes);
app.use('/user', userRoutes);
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use("/uploads", express.static("uploads"));

async function startServer() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error("Falha ao iniciar o servidor:", error);
  }
}

startServer();
