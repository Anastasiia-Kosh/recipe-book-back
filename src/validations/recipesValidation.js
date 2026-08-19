import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';
import { CATEGORIES } from '../constants/categories.js';

export const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value) ? helpers.message('Invalid id format') : value;
};

export const getAllRecipesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(1).max(50).default(12),

    category: Joi.string().valid(...CATEGORIES),

    search: Joi.string().trim().allow(''),
  }),
};

export const recipeIdSchema = {
  [Segments.PARAMS]: Joi.object({
    recipeId: Joi.string().custom(objectIdValidator).required(),
  }),
};

export const createRecipeSchema = {
  [Segments.BODY]: Joi.object({
    category: Joi.string()
      .valid(...CATEGORIES)
      .required(),

    title: Joi.string().trim().min(1).required(),

    shortDescription: Joi.string().trim().min(1).required(),

    text: Joi.string().trim().min(1).required(),

    baseRecipeId: Joi.string().custom(objectIdValidator).allow(null),
  }),
};

export const updateRecipeSchema = {
  [Segments.PARAMS]: Joi.object({
    recipeId: Joi.string().custom(objectIdValidator).required(),
  }),

  [Segments.BODY]: Joi.object({
    category: Joi.string().valid(...CATEGORIES),

    title: Joi.string().trim().min(1),

    shortDescription: Joi.string().trim().min(1),

    text: Joi.string().trim().min(1),

    baseRecipeId: Joi.string().custom(objectIdValidator).allow(null),
  }),
};
