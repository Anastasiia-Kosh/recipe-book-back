import createHttpError from 'http-errors';
import { Recipe } from '../models/recipe.js';
import { saveRecipeImageToCloudinary } from '../utils/saveRecipeImageToCloudinary.js';
import { deleteRecipeImageFromCloudinary } from '../utils/deleteRecipeImageFromCloudinary.js';
import { Types } from 'mongoose';

export const getAllRecipes = async (req, res) => {
  const { page = 1, perPage = 12, category, search } = req.query;

  const skip = (page - 1) * perPage;

  const recipesQuery = Recipe.find();

  if (category) {
    recipesQuery.where('category').equals(category);
  }

  if (search) {
    recipesQuery.where({
      $or: [
        {
          title: {
            $regex: search,
            $options: 'i',
          },
        },
        {
          shortDescription: {
            $regex: search,
            $options: 'i',
          },
        },
      ],
    });
  }

  const [totalRecipes, recipes] = await Promise.all([
    recipesQuery.clone().countDocuments(),

    recipesQuery.sort({ createdAt: -1 }).skip(skip).limit(perPage),
  ]);

  const totalPages = Math.ceil(totalRecipes / perPage);

  res.status(200).json({
    page,
    perPage,
    totalRecipes,
    totalPages,
    recipes,
  });
};

export const getRecipeById = async (req, res) => {
  const { recipeId } = req.params;

  const recipe = await Recipe.findById(recipeId);

  if (!recipe) {
    throw createHttpError(404, 'Recipe not found');
  }

  res.status(200).json(recipe);
};

export const createRecipe = async (req, res) => {
  if (!req.file) {
    throw createHttpError(400, 'Recipe image is required');
  }

  const recipeId = new Types.ObjectId();

  const uploadedImage = await saveRecipeImageToCloudinary(
    req.file.buffer,
    recipeId,
  );
  const recipe = await Recipe.create({
    _id: recipeId,
    ...req.body,
    image: uploadedImage.secure_url,
    imagePublicId: uploadedImage.public_id,
    userId: req.user._id,
  });

  res.status(201).json(recipe);
};

export const updateRecipe = async (req, res) => {
  const { recipeId } = req.params;

  if (!req.file && Object.keys(req.body).length === 0) {
    throw createHttpError(400, 'Nothing to update');
  }

  const recipe = await Recipe.findOne({
    _id: recipeId,
    userId: req.user._id,
  });

  if (!recipe) {
    throw createHttpError(404, 'Recipe not found');
  }

  const updateData = {
    ...req.body,
  };

  if (req.file) {
    const uploadedImage = await saveRecipeImageToCloudinary(
      req.file.buffer,
      recipeId,
    );

    updateData.image = uploadedImage.secure_url;
    updateData.imagePublicId = uploadedImage.public_id;
  }

  const updatedRecipe = await Recipe.findByIdAndUpdate(recipeId, updateData, {
    returnDocument: 'after',
    runValidators: true,
  });

  res.status(200).json(updatedRecipe);
};

export const deleteRecipe = async (req, res) => {
  const { recipeId } = req.params;

  const recipe = await Recipe.findOneAndDelete({
    _id: recipeId,
    userId: req.user._id,
  });

  if (!recipe) {
    throw createHttpError(404, 'Recipe not found');
  }
  if (recipe.imagePublicId) {
    try {
      await deleteRecipeImageFromCloudinary(recipe.imagePublicId);
    } catch (error) {
      console.error(
        'Failed to delete recipe image from Cloudinary:',
        error.message,
      );
    }
  }
  res.status(200).json(recipe);
};
