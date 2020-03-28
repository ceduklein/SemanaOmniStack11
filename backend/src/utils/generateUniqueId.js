//importa o pacote crypto, para criação de criptografia.
const crypto = require('crypto');

module.exports = function generateUniqueId(){
    //usa o pacote crypto para criar um id hexadacimal
    return crypto.randomBytes(4).toString('HEX');
}