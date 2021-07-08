const Joi = require('joi');
const apiResponses = require('../apiResponses');
const responseCodes = require('../responseCodes');
const characterService = require('../services/character.service');
const {characterSchemaCreate, characterSchemaUpdate} = require('../schemas/characterSchema');

const getCharacters = async (req, res) => {
    const ret = await characterService.getCharacters();
    apiResponses.sendResponse(res, ret);
};

const getCharacterById = async (req, res) => {
    const id = parseInt(req.params.id);
    const result = Joi.validate(id, Joi.number().required());
    if (result.error) {
        return apiResponses.error(res, {
            statusCode: responseCodes.BAD_REQUEST,
            data: result.error
        });
    }
    const ret = await characterService.getCharacterById(id);
    return apiResponses.sendResponse(res, ret);
};

const createCharacter = async (req, res) => {
    const characterData = req.body;
    const result = Joi.validate(characterData, characterSchemaCreate);
    if (result.error) {
        return apiResponses.error(res, {
            statusCode: responseCodes.BAD_REQUEST,
            data: result.error
        });
    }
    const ret = await characterService.createCharacter(characterData);
    return apiResponses.sendResponse(res, ret);
};

const updateCharacter = async (req, res) => {
    const characterData = req.body;
    const result = Joi.validate(characterData, characterSchemaUpdate);
    if (result.error) {
        return apiResponses.error(res, {
            statusCode: responseCodes.BAD_REQUEST,
            data: result.error
        });
    }
    const ret = await characterService.updateCharacter(characterData);
    return apiResponses.sendResponse(res, ret);
};

const deleteCharacter = async (req, res) => {
    const id = parseInt(req.params.id);
    const result = Joi.validate(id, Joi.number().required());
    if (result.error) {
        return apiResponses.error(res, {
            statusCode: responseCodes.BAD_REQUEST,
            data: result.error
        });
    }
    const ret = await characterService.deleteCharacter(id);
    return apiResponses.sendResponse(res, ret);
};

module.exports = {
    getCharacters,
    getCharacterById,
    createCharacter,
    updateCharacter,
    deleteCharacter,
};