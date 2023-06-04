import Joi from 'joi';

export const createUserSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  email: Joi.string().email().required().messages({
    'any.required': 'Email is required.',
    'string.email': 'Email must be a valid email address.',
  }),
  password: Joi.string().min(4).required().messages({
    'any.required': 'Password is required.',
    'string.min': 'Password must be at least 8 characters long.',
    }),

});