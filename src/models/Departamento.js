const mongoose = require('mongoose');

const esquema = new mongoose.Schema(
    {
        nome: {
            type: String,
            required: true
        },
        descricao: {
            type: String,
            required: false
        }
    },
    { timestamps: true }
);

const Departamento = mongoose.model('Departamento', esquema);

module.exports = Departamento;
