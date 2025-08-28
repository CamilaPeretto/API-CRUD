const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, select: false },
  cpf: {
    type: String, required: true,
    validate: {
      validator: v => /^\d{11}$/.test(v),
      message: props => `${props.value} não é um CPF válido!`
    }
  },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
