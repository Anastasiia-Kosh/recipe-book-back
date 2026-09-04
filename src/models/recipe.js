import { Schema, model } from 'mongoose';
import { CATEGORIES } from '../constants/categories.js';

const recipeSchema = new Schema(
  {
    category: {
      type: String,
      enum: CATEGORIES,
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    shortDescription: {
      type: String,
      required: true,
      trim: true,
    },

    ingredients: {
      type: String,
      required: true,
      trim: true,
    },

    instructions: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String,
      default: '',
    },

    imagePublicId: {
      type: String,
      default: '',
    },

    baseRecipeId: {
      type: Schema.Types.ObjectId,
      ref: 'Recipe',
      default: null,
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

recipeSchema.index({ category: 1 });
recipeSchema.index({ title: 1 });
recipeSchema.index({ userId: 1 });

recipeSchema.methods.toJSON = function () {
  const obj = this.toObject();

  delete obj.imagePublicId;
  delete obj.__v;

  return obj;
};

export const Recipe = model('Recipe', recipeSchema);
