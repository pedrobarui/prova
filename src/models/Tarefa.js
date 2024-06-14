const mongoose = require('mongoose');

const esquema = new mongoose.Schema(
    {
        titulo: {
            type: String,
            required: true
        },
        descricao: {
            type: String,
            required: false
        },
        dataInicio: {
            type: Date,
            required: false
        },
        dataFim: {
            type: Date,
            required: false
        },
        funcionario: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Funcionario',
            required: false
        },
        projeto: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Projeto',
            required: false
        }
    },
    {
        timestamps: true
    }
);

const Tarefa = mongoose.model('Tarefa', esquema);

module.exports = Tarefa;
