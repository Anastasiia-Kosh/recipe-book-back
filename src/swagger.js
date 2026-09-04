import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'RecipeBook API',
    description: 'API for managing recipes and user accounts',
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
};

const outputFile = './swagger.json';
const routes = [
  './routes/authRoutes.js',
  './routes/recipesRoutes.js',
  './routes/userRoutes.js',
  './routes/savedRecipesRoutes.js',
];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen({ openapi: '3.0.0' })(outputFile, routes, doc);
