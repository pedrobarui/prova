const yup = require('yup');

const esquema = yup.object().shape({
    titulo: yup
        .string()
        .required('Campo obrigatório'),
    descricao: yup
        .string(),
    dataInicio: yup
        .date('Data inválida'),
    dataFim: yup
        .date('Data inválida'),
    funcionario: yup
        .string(),
    projeto: yup
        .string(),
});

function validarDadosTarefa(req, res, next) {
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
    validarDadosTarefa
};
