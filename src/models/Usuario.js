const mongoose = require('mongoose');

const esquema = new mongoose.Schema(
    {
        nomeCompleto: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        senha: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

const Usuario = mongoose.model('Usuario', esquema);

module.exports = Usuario;
