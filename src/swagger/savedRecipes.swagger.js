export const savedRecipesPaths = {
  '/saved-recipes': {
    get: {
      tags: ['Saved Recipes'],
      summary: 'Get saved recipes',
      description: 'Returns all recipes saved by the authenticated user.',

      security: [
        {
          accessToken: [],
          sessionId: [],
        },
      ],

      responses: {
        200: {
          description: 'List of saved recipes',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/SavedRecipe',
                },
              },
            },
          },
        },

        401: {
          description: 'Unauthorized',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error',
              },
            },
          },
        },

        500: {
          description: 'Internal server error',
        },
      },
    },
  },

  '/saved-recipes/{recipeId}': {
    post: {
      tags: ['Saved Recipes'],
      summary: 'Save a recipe',
      description: 'Adds a recipe to the authenticated user’s saved recipes.',

      security: [
        {
          accessToken: [],
          sessionId: [],
        },
      ],

      parameters: [
        {
          name: 'recipeId',
          in: 'path',
          required: true,
          schema: {
            type: 'string',
            example: '68b7f1d12a4c8e0012345678',
          },
        },
      ],

      responses: {
        201: {
          description: 'Recipe successfully saved',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/SavedRecipeReference',
              },
            },
          },
        },

        400: {
          description: 'Invalid recipe ID format',
        },

        401: {
          description: 'Unauthorized',
        },

        404: {
          description: 'Recipe not found',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error',
              },
              example: {
                message: 'Recipe not found',
              },
            },
          },
        },

        409: {
          description: 'Recipe is already saved',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error',
              },
              example: {
                message: 'Recipe already saved',
              },
            },
          },
        },

        500: {
          description: 'Internal server error',
        },
      },
    },

    delete: {
      tags: ['Saved Recipes'],
      summary: 'Remove a saved recipe',
      description:
        'Removes a recipe from the authenticated user’s saved recipes.',

      security: [
        {
          accessToken: [],
          sessionId: [],
        },
      ],

      parameters: [
        {
          name: 'recipeId',
          in: 'path',
          required: true,
          schema: {
            type: 'string',
            example: '68b7f1d12a4c8e0012345678',
          },
        },
      ],

      responses: {
        200: {
          description: 'Saved recipe successfully removed',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/SavedRecipeReference',
              },
            },
          },
        },

        400: {
          description: 'Invalid recipe ID format',
        },

        401: {
          description: 'Unauthorized',
        },

        404: {
          description: 'Saved recipe not found',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error',
              },
              example: {
                message: 'Saved recipe not found',
              },
            },
          },
        },

        500: {
          description: 'Internal server error',
        },
      },
    },
  },
};
