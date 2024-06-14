const yup = require('yup');

const esquema = yup.object().shape({
    nome: yup
        .string()
        .required('Campo obrigatório'),
    descricao: yup
        .string()
        .required('Campo obrigatório'),
    dataInicio: yup
        .date('Data inválida'),
    dataFim: yup
        .date('Data inválida'),
});

function validarInformacoesProjeto(req, res, next) {
    esquema
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

module.exports = {
    validarInformacoesProjeto
};
