const joi = require('joi');

const userSchema = joi.object({
    name: joi.string().min(3).max(30).required(),
    password: joi.string().min(3).max(30).required(),
    isAdmin: joi.boolean(),
    cart: joi.array().items(joi.number())
});

module.exports = { userSchema };