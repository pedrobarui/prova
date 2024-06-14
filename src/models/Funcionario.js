const mongoose = require('mongoose');

const esquema = new mongoose.Schema(
    {
        nomeCompleto: {
            type: String,
            required: true
        },
        cpf: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        telefone: {
            type: String,
            required: true
        },
        dataContratacao: {
            type: Date,
            required: true
        },
        dataNascimento: {
            type: Date,
            required: true
        },
        genero: {
            type: String,
            required: true
        },
        endereco: {
            cep: String,
            uf: String,
            localidade: String,
            bairro: String,
            logradouro: String,
            numero: String,
            complemento: String
        },
        cargo: {
            type: mongoose.Types.ObjectId,
            ref: 'Cargo',
            required: false
        },
        departamento: {
            type: mongoose.Types.ObjectId,
            ref: 'Departamento',
            required: false
        },
    },
    { timestamps: true }
);

const Funcionario = mongoose.model('Funcionario', esquema);

module.exports = Funcionario;
