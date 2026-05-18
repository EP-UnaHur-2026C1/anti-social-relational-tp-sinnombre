const Joi = require("joi");

module.exports = Joi.object({
    description: Joi.string()
        .required()
        .messages({
            "string.base": "La descripción debe ser texto",
            "string.empty": "La descripción no puede estar vacía",
            "any.required": "La descripción es obligatoria"
        }),

    userId: Joi.number()
        .integer()
        .required()
        .messages({
            "number.base": "El userId debe ser numérico",
            "number.integer": "El userId debe ser un número entero",
            "any.required": "El userId es obligatorio"
        })
});