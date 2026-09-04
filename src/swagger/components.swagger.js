export const swaggerComponents = {
  schemas: {
    User: {
      type: 'object',
      properties: {
        _id: {
          type: 'string',
          example: '68b7f1d12a4c8e0012345678',
        },
        username: {
          type: 'string',
          example: 'user@example.com',
        },
        email: {
          type: 'string',
          format: 'email',
          example: 'user@example.com',
        },
        avatar: {
          type: 'string',
          example: 'https://res.cloudinary.com/.../avatar.jpg',
        },
        createdAt: {
          type: 'string',
          format: 'date-time',
        },
        updatedAt: {
          type: 'string',
          format: 'date-time',
        },
      },
    },
    Recipe: {
      type: 'object',
      properties: {
        _id: {
          type: 'string',
          example: '68b7f1d12a4c8e0012345678',
        },
        category: {
          type: 'string',
          example: 'Торти',
        },
        title: {
          type: 'string',
          example: 'Шоколадний торт',
        },
        shortDescription: {
          type: 'string',
          example: 'Ніжний шоколадний торт',
        },
        ingredients: {
          type: 'string',
          example: '<p>200 г борошна...</p>',
        },
        instructions: {
          type: 'string',
          example: '<p>Змішайте інгредієнти...</p>',
        },
        image: {
          type: 'string',
          example: 'https://res.cloudinary.com/.../recipe.jpg',
        },
        baseRecipeId: {
          type: 'string',
          nullable: true,
        },
        userId: {
          type: 'string',
        },
        createdAt: {
          type: 'string',
          format: 'date-time',
        },
        updatedAt: {
          type: 'string',
          format: 'date-time',
        },
      },
    },

    RecipesResponse: {
      type: 'object',
      properties: {
        page: {
          type: 'integer',
          example: 1,
        },
        perPage: {
          type: 'integer',
          example: 12,
        },
        totalRecipes: {
          type: 'integer',
          example: 24,
        },
        totalPages: {
          type: 'integer',
          example: 2,
        },
        recipes: {
          type: 'array',
          items: {
            $ref: '#/components/schemas/Recipe',
          },
        },
      },
    },
    SavedRecipeReference: {
      type: 'object',
      properties: {
        _id: {
          type: 'string',
          example: '68b7f1d12a4c8e0012345678',
        },

        userId: {
          type: 'string',
          example: '68b7f1d12a4c8e0012345678',
        },

        recipeId: {
          type: 'string',
          example: '68b7f1d12a4c8e0012345678',
        },

        createdAt: {
          type: 'string',
          format: 'date-time',
        },

        updatedAt: {
          type: 'string',
          format: 'date-time',
        },
      },
    },

    SavedRecipe: {
      type: 'object',
      properties: {
        _id: {
          type: 'string',
          example: '68b7f1d12a4c8e0012345678',
        },

        userId: {
          type: 'string',
          example: '68b7f1d12a4c8e0012345678',
        },

        recipeId: {
          $ref: '#/components/schemas/Recipe',
        },

        createdAt: {
          type: 'string',
          format: 'date-time',
        },

        updatedAt: {
          type: 'string',
          format: 'date-time',
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
  },

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
};
