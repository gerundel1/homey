const Joi = require('joi');

const registrationSchema = Joi.object({
    name: Joi.string().max(30).required(),
    email: Joi.string().email({minDomainSegments: 2}).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    type: Joi.string().required(),
    phone: Joi.string().alphanum().max(10).allow(null, ''),
    address: Joi.string().max(60).allow(null, ''),
    cuisine: Joi.string().max(25).allow(null, '')
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})

module.exports={
    registrationSchema,
    loginSchema
}