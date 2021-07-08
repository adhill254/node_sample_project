const express = require('express');
const router = express.Router();

const characterController = require('../controllers/character.controller');

module.exports = function(app) {
    router.get('/', characterController.getCharacters);
    router.get('/:id', characterController.getCharacterById);
    router.post('/', characterController.createCharacter);
    router.put('/', characterController.updateCharacter);
    router.delete('/:id', characterController.deleteCharacter);

    app.use(
        '/api/character',
        router
    );
}