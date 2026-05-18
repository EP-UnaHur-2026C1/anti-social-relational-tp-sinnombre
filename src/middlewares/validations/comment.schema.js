const Joi = require("joi");

module.exports = Joi.object({
  content: Joi.string()
    .trim()
    .min(1)
    .required()
    .messages({
      "string.base": "El comentario debe ser texto",
      "string.empty": "El comentario no puede estar vacío",
      "string.min": "El comentario debe tener al menos 1 caracter",
      "any.required": "El comentario es obligatorio"
    }),

  userId: Joi.number()
    .integer()
    .required()
    .messages({
      "number.base": "El userId debe ser numérico",
      "any.required": "El userId es obligatorio"
    }),

  postId: Joi.number()
    .integer()
    .required()
    .messages({
      "number.base": "El postId debe ser numérico",
      "any.required": "El postId es obligatorio"
    }),

  visible: Joi.boolean()
    .optional()
    .messages({
      "boolean.base": "Visible debe ser true o false"
    })
});