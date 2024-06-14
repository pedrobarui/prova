const Tarefa = require('../models/Tarefa');

async function adicionar(req, res) {
    const novaTarefa = new Tarefa(req.body);
    const tarefaCriada = await novaTarefa.save();
    res.status(201).json(tarefaCriada);
}

async function obterTodas(req, res) {
    res.json(await Tarefa.find().populate(['funcionario', 'projeto']));
}

async function obterPorId(req, res) {
    const tarefa = await Tarefa.findById(req.params.id).populate(['funcionario', 'projeto']);
    if (tarefa) {
        res.json(tarefa);
    } else {
        res.status(404).json({ mensagem: "Tarefa não encontrada!" });
    }
}

async function editar(req, res) {
    const tarefaAtualizada = await Tarefa.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (tarefaAtualizada) {
        res.json(tarefaAtualizada);
    } else {
        res.status(404).json({ mensagem: "Tarefa não encontrada!" });
    }
}

async function remover(req, res) {
    const tarefaRemovida = await Tarefa.findByIdAndDelete(req.params.id);
    if (tarefaRemovida) {
        res.json({
            mensagem: "Tarefa removida com sucesso!",
            tarefaRemovida
        });
    } else {
        res.status(404).json({ mensagem: "Tarefa não encontrada!" });
    }
}

module.exports = {
    adicionar,
    obterTodas,
    obterPorId,
    editar,
    remover
};
