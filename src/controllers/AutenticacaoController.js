const Usuario = require('../models/Usuario');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function registrar(req, res) {
    const { nome, email, senha } = req.body;

    const usuarioExistente = await Usuario.findOne({ email });

    if (usuarioExistente) {
        return res.status(400).json({ mensagem: "Este e-mail já está registrado!" });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const usuarioNovo = new Usuario({
        nome,
        email,
        senha: senhaCriptografada
    });

    await usuarioNovo.save();

    res.status(201).json({ mensagem: "Usuário criado com sucesso!" });
}

async function login(req, res) {
    const { email, senha } = req.body;

    const usuarioEncontrado = await Usuario.findOne({ email });

    if (!usuarioEncontrado) {
        return res.status(401).json({ mensagem: "Usuário não encontrado!" });
    }

    const senhaCorreta = await bcrypt.compare(senha, usuarioEncontrado.senha);

    if (!senhaCorreta) {
        return res.status(401).json({ mensagem: "Senha incorreta!" });
    }

    const token = jwt.sign(
        {
            nome: usuarioEncontrado.nome,
            email: usuarioEncontrado.email
        },
        JWT_SECRET,
        {
            expiresIn: '10m'
        }
    );

    res.json({
        mensagem: "Login realizado com sucesso!",
        token
    });
}

module.exports = {
    registrar,
    login
};
