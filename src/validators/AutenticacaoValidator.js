const yup = require('yup');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

const jwt = require('jsonwebtoken');

const registroSchema = yup.object().shape({
    nome: yup
        .string()
        .required("Campo obrigatório"),
    email: yup
        .string()
        .email("E-mail inválido")
        .required("Campo obrigatório"),
    senha: yup
        .string()
        .required("Campo obrigatório"),
});

function validarNovoUsuario(req, res, next) {
    registroSchema
        .validate(req.body, { abortEarly: false })
        .then(() => next())
        .catch(err => {
            const erros = err.inner.map(e => ({
                campo: e.path,
                erros: e.errors
            }));

            res.status(400).json({
                mensagem: "Falha na validação dos campos",
                erros
            });
        });
}

const loginSchema = yup.object().shape({
    email: yup
        .string()
        .email("E-mail inválido")
        .required("Campo obrigatório"),
    senha: yup
        .string()
        .required("Campo obrigatório"),
});

function validarLoginUsuario(req, res, next) {
    loginSchema
        .validate(req.body, { abortEarly: false })
        .then(() => next())
        .catch(err => {
            const erros = err.inner.map(e => ({
                campo: e.path,
                erros: e.errors
            }));

            res.status(400).json({
                mensagem: "Falha na validação dos campos",
                erros
            });
        });
}

async function verificarToken(req, res, next) {
    try {
        const header = req.get('Authorization');
        if (!header) {
            return res.status(401).json({ mensagem: "Token não encontrado" });
        }
        
        const authorization = header.split(' ');
        if (authorization.length !== 2 || authorization[0] !== 'Bearer') {
            return res.status(401).json({ mensagem: "Token mal formatado" });
        }

        const token = authorization[1];
        jwt.verify(token, JWT_SECRET);
        next();
    } catch (err) {
        return res.status(401).json({ mensagem: "Token inválido" });
    }
}

module.exports = {
    validarNovoUsuario,
    validarLoginUsuario,
    verificarToken
};
