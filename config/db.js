const mongoose = require("mongoose");
require("dotenv").config();
mongoose.set("strictQuery", true);

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

async function connectDB() {
  try {
    await mongoose.connect(
      `mongodb+srv://${dbUser}:${dbPassword}@cluster0.8p1hxvu.mongodb.net/estoque_api?retryWrites=true&w=majority&appName=Cluster0`
    );
    console.log("Conectou ao banco de dados!");
  } catch (error) {
    console.error("Erro ao conectar no banco:", error);
    throw error;
  }
}

module.exports = connectDB;