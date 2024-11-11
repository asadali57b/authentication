const Joi=require('joi');

const registerSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(8).required(),
    email: Joi.string().email().required(),
    mobile: Joi.string()
    .pattern(/^\+?[1-9]\d{1,14}$/)  // E.164 pattern with optional "+" at the start
    .required()
    .messages({
        'string.empty': 'Mobile number is required.',
        'string.pattern.base': 'Mobile number must be in E.164 format.',
    }),    gender: Joi.string().valid("male", "female", "other").required(),
    dob: Joi.date().required()
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

module.exports = { registerSchema, loginSchema };