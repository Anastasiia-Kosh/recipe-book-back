import { Router } from 'express';
import { celebrate } from 'celebrate';
import { upload } from '../middleware/multer.js';

import {
  createRecipe,
  deleteRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
} from '../controllers/recipesController.js';

import {
  createRecipeSchema,
  getAllRecipesSchema,
  recipeIdSchema,
  updateRecipeSchema,
} from '../validations/recipesValidation.js';

import { authenticate } from '../middleware/authenticate.js';

const router = Router();

// public
router.get('/recipes', celebrate(getAllRecipesSchema), getAllRecipes);

router.get('/recipes/:recipeId', celebrate(recipeIdSchema), getRecipeById);

// private
router.post(
  '/recipes',
  authenticate,
  upload.single('image'),
  celebrate(createRecipeSchema),
  createRecipe,
);

router.patch(
  '/recipes/:recipeId',
  authenticate,
  upload.single('image'),
  celebrate(updateRecipeSchema),
  updateRecipe,
);

router.delete(
  '/recipes/:recipeId',
  authenticate,
  celebrate(recipeIdSchema),
  deleteRecipe,
);

export default router;
