import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectMongoDB } from './db/connectMongoDB.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { logger } from './middleware/logger.js';
import recipesRoutes from './routes/recipesRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { errors } from 'celebrate';
import cookieParser from 'cookie-parser';
import savedRecipesRoutes from './routes/savedRecipesRoutes.js';

const app = express();
const PORT = process.env.PORT ?? 3001;

app.use(express.json());
app.use(cors());
app.use(logger);
app.use(cookieParser());

app.use(authRoutes);
app.use(recipesRoutes);
app.use(userRoutes);
app.use(savedRecipesRoutes);
// обробка 404
app.use(notFoundHandler);
// обробка помилок від celebrate (валідація)
app.use(errors());
// глобальна обробка інших помилок
app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
