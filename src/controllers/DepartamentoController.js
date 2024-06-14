const Departamento = require('../models/Departamento');

async function obterTodos(req, res) {
    res.json(await Departamento.find());
}

async function obterPorID(req, res) {
    const departamento = await Departamento.findById(req.params.id);
    if (departamento) {
        res.json(departamento);
    } else {
        res.status(404).json({ mensagem: "Departamento não localizado!" });
    }
}

async function adicionar(req, res) {
    const novoDepartamento = new Departamento(req.body);
    const departamentoCriado = await novoDepartamento.save();
    res.status(201).json(departamentoCriado);
}

async function editar(req, res) {
    const departamentoAtualizado = await Departamento.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (departamentoAtualizado) {
        res.json({
            mensagem: "Departamento atualizado com sucesso!",
            departamentoAtualizado
        });
    } else {
        res.status(404).json({ mensagem: "Departamento não localizado!" });
    }
}

async function remover(req, res) {
    const departamentoRemovido = await Departamento.findByIdAndDelete(req.params.id);
    if (departamentoRemovido) {
        res.json({
            mensagem: "Departamento removido com sucesso!",
            departamentoRemovido
        });
    } else {
        res.status(404).json({ mensagem: "Departamento não localizado!" });
    }
}

module.exports = {
    obterTodos,
    obterPorID,
    adicionar,
    editar,
    remover
};
