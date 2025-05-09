const express = require('express');
const routes = express.Router();

//rotas do Jogador
const PlayerController = require('./controllers/PlayerController');
routes.get('/player-all', PlayerController.showAll);
routes.get('/player-all-gt-zero', PlayerController.showAllGTZero);
routes.post('/player', PlayerController.store);
routes.get('/player/:id', PlayerController.show);
routes.patch('/player/:id', PlayerController.update);
routes.delete('/player/:id', PlayerController.destroy);

module.exports = routes;