const Projeto = require('../models/Projeto');

async function adicionar(req, res) {
    const novoProjeto = new Projeto(req.body);
    const projetoCriado = await novoProjeto.save();
    res.status(201).json(projetoCriado);
}

async function obterTodos(req, res) {
    res.json(await Projeto.find());
}

async function obterPorId(req, res) {
    const projeto = await Projeto.findById(req.params.id);
    if (projeto) {
        res.json(projeto);
    } else {
        res.status(404).json({ mensagem: "Projeto não encontrado!" });
    }
}

async function editar(req, res) {
    const projetoAtualizado = await Projeto.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (projetoAtualizado) {
        res.json(projetoAtualizado);
    } else {
        res.status(404).json({ mensagem: "Projeto não encontrado!" });
    }
}

async function remover(req, res) {
    const projetoRemovido = await Projeto.findByIdAndDelete(req.params.id);
    if (projetoRemovido) {
        res.json({
            mensagem: "Projeto removido com sucesso!",
            projetoRemovido
        });
    } else {
        res.status(404).json({ mensagem: "Projeto não encontrado!" });
    }
}

module.exports = {
    adicionar,
    obterTodos,
    obterPorId,
    editar,
    remover
};
