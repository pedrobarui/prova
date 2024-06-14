const mongoose = require('mongoose');

function validarID(req, res, next) {
    const { id } = req.params;

    if (mongoose.Types.ObjectId.isValid(id)) {
        next();
    } else {
        return res.status(400).json({ mensagem: "ID inválido" });
    }
}

module.exports = {
    validarID
};

