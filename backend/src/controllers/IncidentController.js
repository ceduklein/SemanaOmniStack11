const connection = require('../database/connection');

module.exports = {
    //Lista todos os casos (com paginação 5 em 5)
    async index(request, response){
        //page para efeitos de cálculo no offset() abaixo
        const { page = 1 } = request.query;

        //conta todos os casos, p/ retornar p/ uso no front
        const [count] = await connection('incidents')
        .count();

        const incidents = await connection('incidents')
        //relacionando dados da ong e casos com join
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        .limit(5)//limita a exibição de casos de 5 em 5
        .offset((page - 1) * 5)
        //select passado para um array c/ campos especificados
        .select([
            'incidents.*',
            'ongs.name',
            'ongs.email',
            'ongs.whatsapp',
            'ongs.city',
            'ongs.uf'
        ]);

        //retorna o count para o cabeçalho da resposta
        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents);
    },

    //Salva um caso
    async create(request, response){
        const{ title, description, value } = request.body;
        //pega o id através do authorization
        const ong_id = request.headers.authorization;

        //inserir o caso na tabela incidents.
        const [id] = await connection('incidents').insert({
            title, 
            description, 
            value, 
            ong_id,
        });

        return response.json({ id });
        //para retornar este id, criou-se uma variável para insert
    },

    async delete(request, response){
        //pegar o id dos parâmetros de rota
        const {id} = request.params;
        //pegar o id da ong logada
        const ong_id = request.headers.authorization;

        //pega o primeiro caso de id igual, junto com o ong_id
        const incident = await connection('incidents')
        .where('id', id)
        .select('ong_id')
        .first();

        //verifica ong_id do authorization com o resultado do caso
        //se diferente apresenta erro
        if (incident.ong_id != ong_id) {
            return response.status(401).json({error: "Operation not permited."});
        }

        //Se não der problema na verificação, registro deletado
        await connection('incidents').where('id', id).delete()
        return response.status(204).send()
    }
}