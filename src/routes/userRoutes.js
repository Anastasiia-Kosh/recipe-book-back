import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import {
  updateUserAvatar,
  getCurrentUser,
  updateCurrentUser
} from '../controllers/userController.js';
import { upload } from '../middleware/multer.js';
import { updateCurrentUserSchema } from '../validations/authValidation.js';
import { celebrate } from 'celebrate';

const router = Router();

router.get('/users/me', authenticate, getCurrentUser);

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
