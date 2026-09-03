import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'RecipeBook API',
    description: 'Description',
  },
  host: 'localhost:3000' /* render.com ... */,
};

const outputFile = './swagger.json';
const routes = [
  './routes/authRoutes.js',
  './routes/recipeRoutes.js',
  './routes/userRoutes.js',
  './routes/savedRecipesRoutes.js',
];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen({ openapi: '3.0.0' })(outputFile, routes, doc);
