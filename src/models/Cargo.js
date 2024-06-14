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
        },
        salario: {
            type: Number,
            required: true
        }
    },
    { timestamps: true }
);

const Cargo = mongoose.model('Cargo', esquema);

module.exports = Cargo;
