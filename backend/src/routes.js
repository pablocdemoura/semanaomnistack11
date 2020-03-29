const express = require('express');

const SessionController = require('./controllers/SessionController');
const OngController = require('./controllers/OngController');
const ProfileController = require('./controllers/ProfileController');
const IncidenteController = require('./controllers/IncidenteController');

const routes = express.Router();

/**
 * Métodos HTTP:
 * 
 * GET: Buscar/listar uma informação do back-end
 * POST: Criar uma informação no back-end
 * PUT: Alterar uma informação no back-end
 * DELETE: Deletar uma informação no back-end
 */

/**
 * Tipos de parâmetros:
 * 
 * Query Params: Parâmetros nomeados enviados nan rota após "?" (filtros, paginação)
 * Route Params: Parâmetros utilizados para identificar recursos
 * Request Body: Corpo da requisição, utilizado prar criar ou alterar recursos
 */

routes.get('/users/', (request, response) => {
  const query = request.query;

  console.log(query);

  return response.json({
    evento: 'Semana OmniStack 11.0',
    aluno: 'Pablo Moura'
  });
})

routes.get('/users/:id', (request, response) => {
  const params = request.params;

  console.log(params);

  return response.json({
    evento: 'Semana OmniStack 11.0',
    aluno: 'Pablo Moura'
  });
})

routes.post('/users', (request, response) => {
  const body = request.body;

  console.log(body);

  return response.json({
    evento: 'Semana OmniStack 11.0',
    aluno: 'Pablo Moura_'
  });
})

routes.post('/sessions', SessionController.create);

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

routes.get('/profile', ProfileController.index);

routes.get('/incidentes', IncidenteController.index);
routes.post('/incidentes', IncidenteController.create);
routes.delete('/incidentes/:id', IncidenteController.delete);

module.exports = routes;
