//criar conexão com o banco
const connection = require('../database/connection');

const generateUniqueId = require('../utils/generateUniqueId');


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
        
        //criação do id foi para outro arquivo para facilitar testes
        const id = generateUniqueId();

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