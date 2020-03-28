const express = require('express');
const {celebrate, Segments, Joi} = require('celebrate');


//importação de Controllers
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfilleController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

//Rota para login
routes.post('/sessions', SessionController.create);

//Rota para listar todas as ONGs
routes.get('/ongs', OngController.index);

//Rota para cadastrar uma ONG no DB e retonar o id
routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
    }), OngController.create);

//lista casos específicos de uma ong
routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}), ProfileController.index);

//Rota para listar todos os casos
routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number(),  
    })
}), IncidentController.index);

//Rota para cadastrar um caso
routes.post('/incidents', IncidentController.create);

//Deleta um caso
routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}), IncidentController.delete);

module.exports = routes;
