const yup = require('yup');

const esquema = yup.object().shape({
    nome: yup
        .string()
        .required("Campo nome é obrigatório"),
    descricao: yup
        .string(),
    salario: yup
        .number()
        .min(1412, "Salário precisa ser maior que o salário mínimo")
        .required("Campo salario é obrigatório")
});

function validarInfoCargo(req, res, next) {
    esquema
        .validate(req.body, { abortEarly: false })
        .then(() => next())
        .catch(err => res.status(400).json({
            mensagem: "Erro na validação dos campos!",
            erro: err.errors
        }));
}

module.exports = {
    validarInfoCargo
};
