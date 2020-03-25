
exports.up = function(knex) {
    return knex.schema.createTable('incidents', function(table){
        table.increments();
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();

        //cria coluna para salvar o id da ONG
        //tem que ser do mesmo tipo do id da tabela ONG
        table.string('ong_id').notNullable();

        //faz referência ao campo ong_id como chave estrangeira
        table.foreign('ong_id').references('id').inTable('ongs');
      });
};

exports.down = function(knex) {
  return knex.schema.dropTable('incidents');
};
