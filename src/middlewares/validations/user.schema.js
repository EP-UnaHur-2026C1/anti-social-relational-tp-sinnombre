const Joi = require("joi");

module.exports = Joi.object({
    nickName: Joi.string()
        .min(3)
        .max(30)
        .required()
        .messages({
            "string.base": "El nickname debe ser texto",
            "string.empty": "El nickname no puede estar vacío",
            "string.min": "El nickname debe tener al menos 3 caracteres",
            "string.max": "El nickname no puede superar los 30 caracteres",
            "any.required": "El nickname es obligatorio"
        }),

    name: Joi.string()
        .min(2)
        .required()
        .messages({
            "string.base": "El nombre debe ser texto",
            "string.empty": "El nombre no puede estar vacío",
            "string.min": "El nombre debe tener al menos 2 caracteres",
            "any.required": "El nombre es obligatorio"
        }),

    email: Joi.string()
        .email()
        .required()
        .messages({
            "string.email": "Debe ingresar un email válido",
            "string.empty": "El email no puede estar vacío",
            "any.required": "El email es obligatorio"
        }),

    password: Joi.string()
        .min(6)
        .required()
        .messages({
            "string.min": "La contraseña debe tener al menos 6 caracteres",
            "string.empty": "La contraseña no puede estar vacía",
            "any.required": "La contraseña es obligatoria"
        })
});