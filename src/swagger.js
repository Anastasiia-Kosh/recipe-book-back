import swaggerAutogen from 'swagger-autogen';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { authPaths } from './swagger/auth.swagger.js';
import { swaggerComponents } from './swagger/components.swagger.js';
import { usersPaths } from './swagger/users.swagger.js';
import { recipesPaths } from './swagger/recipes.swagger.js';
import { savedRecipesPaths } from './swagger/savedRecipes.swagger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const doc = {
  info: {
    title: 'RecipeBook API',
    description: 'API for managing recipes and user accounts',
    version: '1.0.0',
  },

  servers: [
    {
      url: 'https://recipe-book-back-ax30.onrender.com',
      description: 'Production server',
    },
    {
      url: 'http://localhost:3001',
      description: 'Local server',
    },
  ],

  tags: [
    {
      name: 'Auth',
      description: 'Authentication and password recovery',
    },
    {
      name: 'Users',
      description: 'User profile and personal recipes',
    },
    {
      name: 'Recipes',
      description: 'Recipe browsing and management',
    },
    {
      name: 'Saved Recipes',
      description: 'Manage user favorite recipes',
    },
  ],

  components: {
    securitySchemes: {
      accessToken: {
        type: 'apiKey',
        in: 'cookie',
        name: 'accessToken',
      },

      refreshToken: {
        type: 'apiKey',
        in: 'cookie',
        name: 'refreshToken',
      },

      sessionId: {
        type: 'apiKey',
        in: 'cookie',
        name: 'sessionId',
      },
    },
  },

  Error: {
    type: 'object',
    properties: {
      message: {
        type: 'string',
        example: 'Something went wrong',
      },
    },
  },
};

const outputFile = path.join(__dirname, 'swagger.json');

const routes = [
  path.join(__dirname, 'routes/authRoutes.js'),
  path.join(__dirname, 'routes/recipesRoutes.js'),
  path.join(__dirname, 'routes/userRoutes.js'),
  path.join(__dirname, 'routes/savedRecipesRoutes.js'),
];

await swaggerAutogen({ openapi: '3.0.0' })(outputFile, routes, doc);

const swaggerDocument = JSON.parse(await fs.readFile(outputFile, 'utf-8'));

swaggerDocument.components = {
  ...(swaggerDocument.components ?? {}),

  schemas: {
    ...(swaggerDocument.components?.schemas ?? {}),
    ...swaggerComponents.schemas,
  },

  securitySchemes: {
    ...(swaggerDocument.components?.securitySchemes ?? {}),
    ...swaggerComponents.securitySchemes,
  },
};

swaggerDocument.paths = {
  ...swaggerDocument.paths,
  ...authPaths,
  ...usersPaths,
  ...recipesPaths,
  ...savedRecipesPaths,
};

await fs.writeFile(outputFile, JSON.stringify(swaggerDocument, null, 2));
