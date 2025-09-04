const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { name, email, cpf, password, confirmPassword } = req.body;

  if (!name || !email || !cpf || !password || !confirmPassword)
    return res.status(422).json({ msg: 'Todos os campos são obrigatórios' });

  if (password !== confirmPassword)
    return res.status(422).json({ msg: 'Senhas não conferem' });

  const userExists = await User.findOne({ email });
  if (userExists)
    return res.status(422).json({ msg: 'E-mail já cadastrado' });

  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = new User({
    name,
    email,
    cpf,
    password: hashedPassword,
  });

  try {
    await user.save();
    res.status(201).json({ msg: 'Usuário criado com sucesso!' });
  } catch (error) {
    res.status(500).json({ msg: 'Erro no servidor ao criar usuário' });
  }

};


exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(422).json({ msg: 'E-mail e senha são obrigatórios' });

  const user = await User.findOne({ email }).select('+password');
  if (!user) return res.status(404).json({ msg: 'Usuário não encontrado' });

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) return res.status(422).json({ msg: 'Senha inválida' });

  try {
    const token = jwt.sign(
      { id: user._id, role: user.role }, 
      process.env.SECRET,
      { expiresIn: "1h" }
    );
    
    res.status(200).json({ msg: 'Autenticado com sucesso', token, role: user.role });
  } catch (error) {
    res.status(500).json({ msg: 'Erro ao gerar token' });
  }
};
