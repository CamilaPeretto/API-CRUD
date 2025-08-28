const mongoose = require('mongoose');

const ProdutoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricao: { type: String },
  preco: { type: Number, required: true, min: 0 },
  categoria: { type: String, required: true },
  estoque: { type: Number, required: true, min: 0 },
  image: { type: String, default: null }
}, { timestamps: true });

module.exports = mongoose.model('Produto', ProdutoSchema);
