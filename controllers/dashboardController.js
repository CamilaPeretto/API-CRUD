
const Produto = require('../models/Produto');

exports.getDashboard = async (req, res) => {
  try {
    const produtos = await Produto.find();

    const totalProdutos = produtos.length;
    const estoqueBaixo = produtos.filter(p => p.estoque < 5).length;
    const valorTotalEstoque = produtos.reduce((acc, p) => acc + p.preco * p.estoque, 0);

    const produtosOrdenados = [...produtos].sort((a, b) => a.preco - b.preco);
    const maisBarato = produtosOrdenados[0] || null;
    const maisCaro = produtosOrdenados[produtosOrdenados.length - 1] || null;

    res.json({
      totalProdutos,
      estoqueBaixo,
      valorTotalEstoque,
      maisBarato,
      maisCaro,
    });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao gerar dashboard' });
  }
};
