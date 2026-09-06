import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';
import { CATEGORIES } from '../constants/categories.js';
import sanitizeHtml from 'sanitize-html';

export const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value) ? helpers.message('Invalid id format') : value;
};
const richTextValidator = (value, helpers) => {
  const text = sanitizeHtml(value, {
    allowedTags: [],
    allowedAttributes: {},
  })
    .replace(/&nbsp;|&#160;/gi, ' ')
    .replace(/\u00a0/g, ' ')
    .trim();

  if (!text) {
    return helpers.message('Field must contain text');
  }

  return value;
};

export const getAllRecipesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(1).max(50).default(12),

    category: Joi.string().valid(...CATEGORIES),

    search: Joi.string().trim().allow(''),
  }),
};

export const getSavedRecipesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(1).max(50).default(12),
    all: Joi.boolean().default(false),
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

    title: Joi.string().trim().min(1).max(120).required(),

    shortDescription: Joi.string().trim().min(1).max(500).required(),

    ingredients: Joi.string()
      .trim()
      .min(1)
      .custom(richTextValidator)
      .required(),

    instructions: Joi.string()
      .trim()
      .min(1)
      .custom(richTextValidator)
      .required(),

    baseRecipeId: Joi.string().custom(objectIdValidator).allow(null),
  }),
};

export const updateRecipeSchema = {
  [Segments.PARAMS]: Joi.object({
    recipeId: Joi.string().custom(objectIdValidator).required(),
  }),

  [Segments.BODY]: Joi.object({
    category: Joi.string().valid(...CATEGORIES),

    title: Joi.string().trim().min(1).max(120),

    shortDescription: Joi.string().trim().min(1).max(500),

    ingredients: Joi.string().trim().min(1).custom(richTextValidator),

    instructions: Joi.string().trim().min(1).custom(richTextValidator),

    baseRecipeId: Joi.string().custom(objectIdValidator).allow(null),
  }),
};
