const Joi = require('joi');
module.exports.listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.string().required(),
    country: Joi.string().required(),   // ✅ moved inside
    price: Joi.number().min(0).required(),
    image: Joi.object({
      url: Joi.string().uri().allow("", null),
      filename: Joi.string().allow("", null)
    })
  }).required()
});


module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        comment: Joi.string().required()
    }).required()
});