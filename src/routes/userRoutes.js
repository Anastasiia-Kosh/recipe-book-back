import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import {
  updateUserAvatar,
  getCurrentUser,
  updateCurrentUser,
} from '../controllers/userController.js';
import { upload } from '../middleware/multer.js';
import { updateCurrentUserSchema } from '../validations/authValidation.js';
import { celebrate } from 'celebrate';
import { getAllRecipesSchema } from '../validations/recipesValidation.js';
import { getMyRecipes } from '../controllers/recipesController.js';

const router = Router();

router.get('/users/me', authenticate, getCurrentUser);

router.get(
  '/users/me/recipes',
  authenticate,
  celebrate(getAllRecipesSchema),
  getMyRecipes,
);

router.patch(
  '/users/me',
  authenticate,
  celebrate(updateCurrentUserSchema),
  updateCurrentUser,
);

router.patch(
  '/users/me/avatar',
  authenticate,
  upload.single('avatar'),
  updateUserAvatar,
);

export default router;
