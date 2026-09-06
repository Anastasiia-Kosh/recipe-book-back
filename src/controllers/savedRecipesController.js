import { SavedRecipe } from '../models/savedRecipe.js';
import { Recipe } from '../models/recipe.js';
import createHttpError from 'http-errors';

export const saveRecipe = async (req, res) => {
  const { recipeId } = req.params;

  const recipe = await Recipe.findById(recipeId);

  if (!recipe) {
    throw createHttpError(404, 'Recipe not found');
  }
  const existingSavedRecipe = await SavedRecipe.findOne({
    userId: req.user._id,
    recipeId,
  });

  if (existingSavedRecipe) {
    throw createHttpError(409, 'Recipe already saved');
  }
  const savedRecipe = await SavedRecipe.create({
    userId: req.user._id,
    recipeId,
  });

  res.status(201).json(savedRecipe);
};

export const getSavedRecipes = async (req, res) => {
  const { page = 1, perPage = 12, all = false } = req.query;

  const skip = (page - 1) * perPage;

  const filter = {
    userId: req.user._id,
  };

  const savedRecipesQuery = SavedRecipe.find(filter)
    .sort({ createdAt: -1 })
    .populate('recipeId');

  if (!all) {
    savedRecipesQuery.skip(skip).limit(perPage);
  }

  const [totalSavedRecipes, savedRecipes] = await Promise.all([
    SavedRecipe.countDocuments(filter),
    savedRecipesQuery,
  ]);

  const totalPages = all
    ? totalSavedRecipes > 0
      ? 1
      : 0
    : Math.ceil(totalSavedRecipes / perPage);

  res.status(200).json({
    page,
    perPage,
    totalSavedRecipes,
    totalPages,
    savedRecipes,
  });
};

export const deleteSavedRecipe = async (req, res) => {
  const { recipeId } = req.params;

  const savedRecipe = await SavedRecipe.findOneAndDelete({
    userId: req.user._id,
    recipeId,
  });

  if (!savedRecipe) {
    throw createHttpError(404, 'Saved recipe not found');
  }

  res.status(200).json(savedRecipe);
};
