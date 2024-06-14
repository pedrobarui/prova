const mongoose = require('mongoose');
require('dotenv').config();

const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_HOST = process.env.DB_HOST;
const DB_NAME = process.env.DB_NAME;

function conectarBanco() {
    mongoose.connect(`mongodb+srv://phneves2005:${DB_PASS}@cluster0.utuzneg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
        .then(() => console.log("Conexão bem-sucedida com o MongoDB!"))
        .catch(err => console.log("Falha na conexão com o MongoDB: ", err));
}

module.exports = conectarBanco;
