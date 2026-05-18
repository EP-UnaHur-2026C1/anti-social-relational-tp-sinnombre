const Joi = require("joi");

module.exports = Joi.object({
    url: Joi.string()
        .uri()
        .required()
        .messages({
            "string.uri": "Debe ingresar una URL válida para la imagen",
            "string.empty": "La URL no puede estar vacía",
            "any.required": "La URL es obligatoria"
        }),

    postId: Joi.number()
        .integer()
        .required()
        .messages({
            "number.base": "El postId debe ser numérico",
            "any.required": "El postId es obligatorio"
        })
});