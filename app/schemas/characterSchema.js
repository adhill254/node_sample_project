const Joi = require('joi');

const characterSchemaCreate = Joi.object().keys({
    name: Joi.string().min(3).max(45).required(),
    class: Joi.string().min(3).max(45).required(),
    level: Joi.number().min(1).max(20).optional(),
});
const characterSchemaUpdate = Joi.object().keys({
    characterId: Joi.number().required(),
    class: Joi.string().min(3).max(45).required(),
    level: Joi.number().min(1).max(20).required(),
});

module.exports = {
    characterSchemaCreate,
    characterSchemaUpdate,
};