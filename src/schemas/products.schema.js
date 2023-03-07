const joi = require('joi');

const productSchema = joi.object({
    name: joi.string().min(3).max(30).required(),
    price: joi.number().required(),
    description: joi.string().min(3).max(30).required(),
});

module.exports = { productSchema };