//criar conexão com o banco
const connection = require('../database/connection');
//importa o pacote crypto, para criação de criptografia.
const crypto = require('crypto');

module.exports = {
    //lista todos as ongs cadastradas
    async index(request, response){
        const ongs = await connection('ongs').select('*');
        return response.json(ongs);
    },

    //salva uma ong no DB
    async create(request, response){
        //criando variável para cada informação.
        const { name, email, whatsapp, city, uf } = request.body;
        
        //usa o pacote crypto para criar um id hexadacimal
        const id = crypto.randomBytes(4).toString('HEX');

        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        });
        
        return response.json({ id });
    }
}