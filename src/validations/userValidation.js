const Joi = require('@hapi/joi');

exports.userValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string()
            .min(3)
            .required(),
        name: Joi.string()
            .required(),
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .required()
    });
    return schema.validate(data);
}

exports.loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .required()
    });
    return schema.validate(data);
}