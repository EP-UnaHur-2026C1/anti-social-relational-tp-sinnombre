const Joi = require("joi");

module.exports = Joi.object({
    name: Joi.string()
        .min(2)
        .max(50)
        .required()
        .messages({
            "string.empty": "El nombre del tag no puede estar vacío",
            "string.min": "El tag debe tener mínimo 2 caracteres",
            "string.max": "El tag no puede superar los 50 caracteres",
            "any.required": "El nombre del tag es obligatorio"
        })
});