const yup = require('yup');

const esquema = yup.object().shape({
    nome: yup
        .string()
        .required("Campo nome é obrigatório"),
    descricao: yup
        .string()
});

function validarInfoDepartamento(req, res, next) {
    esquema
        .validate(req.body, { abortEarly: false })
        .then(() => next())
        .catch(err => res.status(400).json({
            mensagem: "Erro na validação dos campos!",
            erro: err.errors
        }));
}

module.exports = {
    validarInfoDepartamento
};
