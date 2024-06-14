const yup = require('yup');

const schema = yup.object().shape({
    nome: yup
        .string()
        .required("Campo obrigatório"),
    cpf: yup
        .string()
        .required("Campo obrigatório"),
    email: yup
        .string()
        .email("E-mail inválido")
        .required("Campo obrigatório"),
    telefone: yup
        .string()
        .required("Campo obrigatório"),
    dataContratacao: yup
        .date("Data inválida")
        .required("Campo obrigatório"),
    dataNascimento: yup
        .date("Data inválida")
        .required("Campo obrigatório"),
    genero: yup
        .string()
        .required("Campo obrigatório"),
    cargo: yup
        .string(),
    departamento: yup
        .string(),
});

function validarInfoFuncionario(req, res, next) {
    schema
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
    validarInfoFuncionario
};
