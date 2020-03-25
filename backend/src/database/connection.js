//arquivo de conexão com o banco de dados.
//importar para arquivos que precisarão se comunicar com o DB.
const knex = require('knex');
const configuration = require('../../knexfile');

const connection = knex(configuration.development);

module.exports = connection;
