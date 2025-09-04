const Produto = require("../models/Produto");
const nodemailer = require("nodemailer");
const User = require("../models/User");

async function enviarEmail(to, subject, html) {
  try {
    const transportador = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transportador.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to,
      subject,
      html,
    });
  } catch (erro) {
    console.error("Erro ao enviar e-mail:", erro.message);
  }
}

exports.getAll = async (req, res) => {
  try {
    const produtos = await Produto.find();
    res.json(produtos);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar produtos" });
  }
};

exports.create = async (req, res) => {
  console.log("REQ.BODY:", req.body);
  console.log("REQ.FILE:", req.file);
  
  const { nome, descricao, preco, estoque, categoria } = req.body;
  const image = req.file ? req.file.filename : null;

  try {
    console.log("Tentando salvar produto:", { nome, descricao, preco, estoque, categoria, image });
    const novoProduto = new Produto({ nome, descricao, preco, estoque, categoria, image });
    await novoProduto.save();
    console.log("Produto salvo com sucesso:", novoProduto);

    // Envia e-mail para o admin (não trava o cadastro)
    enviarEmail(process.env.ADMIN_EMAIL, "Produto adicionado ao estoque",
      `<h2>Novo Produto Adicionado!</h2>
       <p>Produto <strong>${nome}</strong> adicionado com sucesso ao estoque.</p>
       ${image ? `<p>Imagem: <strong>${image}</strong></p>` : ''}`
    ).catch(err => console.error("Erro ao enviar email para admin:", err));

    // Envia e-mail para os usuários
    const usuarios = await User.find({}, "email");
    const emailsUsuarios = usuarios.map(u => u.email);
    if (emailsUsuarios.length > 0) {
      enviarEmail(emailsUsuarios.join(","), "Novo produto na loja!",
        `<h2>Novidade na Loja!</h2>
         <p>Um novo produto foi adicionado: <strong>${nome}</strong>. Confira!</p>
         ${image ? `<p>Imagem: <strong>${image}</strong></p>` : ''}`
      ).catch(err => console.error("Erro ao enviar email para usuarios:", err));
    }

    res.status(201).json(novoProduto);

  } catch (erro) {
    console.error("Erro ao salvar produto:", erro);
    res.status(500).json({ erro: "Erro ao cadastrar produto." });
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { nome, descricao, preco, estoque } = req.body;
  try {
    const produto = await Produto.findByIdAndUpdate(id, { nome, descricao, preco, estoque }, { new: true });
    if (!produto) return res.status(404).json({ erro: "Produto não encontrado" });
    res.json(produto);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao atualizar produto" });
  }
};

exports.remove = async (req, res) => {
  const { id } = req.params;
  try {
    const produto = await Produto.findByIdAndDelete(id);
    if (!produto) return res.status(404).json({ erro: "Produto não encontrado" });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ erro: "Erro ao deletar produto" });
  }
};
