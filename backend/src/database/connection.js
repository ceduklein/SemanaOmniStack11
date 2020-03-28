//arquivo de conexão com o banco de dados.
//importar para arquivos que precisarão se comunicar com o DB.
const knex = require('knex');
const configuration = require('../../knexfile');

//Cria variável config e verifica se o script iniciado é de teste
//ou de desenvolvimento, através do if ternário. O resultado é
//repassado para o knex, que direciona para o bd correto
const config = process.env.NODE_ENV === 'test' ? configuration.test : configuration.development

const connection = knex(config);

module.exports = connection;
