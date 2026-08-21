import { Router } from 'express';
import { celebrate } from 'celebrate';
import { authenticate } from '../middleware/authenticate.js';
import { recipeIdSchema } from '../validations/recipesValidation.js';
import {
  saveRecipe,
  getSavedRecipes,
  deleteSavedRecipe,
} from '../controllers/savedRecipesController.js';

const router = Router();

router.post(
  '/saved-recipes/:recipeId',
  authenticate,
  celebrate(recipeIdSchema),
  saveRecipe,
);
router.get('/saved-recipes', authenticate, getSavedRecipes);
router.delete(
  '/saved-recipes/:recipeId',
  authenticate,
  celebrate(recipeIdSchema),
  deleteSavedRecipe,
);
export default router;
