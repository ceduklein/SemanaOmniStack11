const express = require('express');
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
routes.post('/ongs', OngController.create);
//lista casos específicos de uma ong
routes.get('/profile', ProfileController.index);

//Rota para listar todos os casos
routes.get('/incidents', IncidentController.index);
//Rota para cadastrar um caso
routes.post('/incidents', IncidentController.create);
//Deleta um caso
routes.delete('/incidents/:id', IncidentController.delete);

module.exports = routes;
