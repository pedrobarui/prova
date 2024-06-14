const Funcionario = require('../models/Funcionario');

async function obterTodos(req, res) {
    res.json(await Funcionario.find().populate(['cargo', 'departamento']));
}

async function obterPorID(req, res) {
    const funcionario = await Funcionario.findById(req.params.id).populate(['cargo', 'departamento']);
    if (funcionario) {
        res.json(funcionario);
    } else {
        res.status(404).json({ mensagem: "Funcionário não localizado!" });
    }
}

async function adicionar(req, res) {
    const novoFuncionario = new Funcionario(req.body);
    const funcionarioCriado = await novoFuncionario.save();
    res.status(201).json(funcionarioCriado);
}

async function editar(req, res) {
    const funcionarioAtualizado = await Funcionario.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (funcionarioAtualizado) {
        res.json({
            mensagem: "Funcionário atualizado com sucesso!",
            funcionarioAtualizado
        });
    } else {
        res.status(404).json({ mensagem: "Funcionário não localizado!" });
    }
}

async function remover(req, res) {
    const funcionarioRemovido = await Funcionario.findByIdAndDelete(req.params.id);
    if (funcionarioRemovido) {
        res.json({
            mensagem: "Funcionário removido com sucesso!",
            funcionarioRemovido
        });
    } else {
        res.status(404).json({ mensagem: "Funcionário não localizado!" });
    }
}

module.exports = {
    obterTodos,
    obterPorID,
    adicionar,
    editar,
    remover
};
