const Joi = require("joi");

module.exports = Joi.object({
    followerId: Joi.number()
        .integer()
        .required()
        .messages({
            "number.base": "El followerId debe ser numérico",
            "any.required": "El followerId es obligatorio"
        }),

    followingId: Joi.number()
        .integer()
        .required()
        .messages({
            "number.base": "El followingId debe ser numérico",
            "any.required": "El followingId es obligatorio"
        })
});