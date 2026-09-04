const categories = [
  'Macarons',
  'Млинці',
  'Варення',
  'Десерти',
  'Кекси',
  'Торти',
  'Тарти',
  'Пироги',
  'Печиво',
  'Рогалики',
  'Інше',
  'Основні страви',
  'Перші страви',
];

export const recipesPaths = {
  '/recipes': {
    get: {
      tags: ['Recipes'],
      summary: 'Get all recipes',
      description:
        'Returns a paginated list of recipes with optional category and search filters.',

      parameters: [
        {
          name: 'page',
          in: 'query',
          schema: {
            type: 'integer',
            minimum: 1,
            default: 1,
          },
        },
        {
          name: 'perPage',
          in: 'query',
          schema: {
            type: 'integer',
            minimum: 1,
            maximum: 50,
            default: 12,
          },
        },
        {
          name: 'category',
          in: 'query',
          schema: {
            type: 'string',
            enum: categories,
          },
        },
        {
          name: 'search',
          in: 'query',
          schema: {
            type: 'string',
          },
        },
      ],

      responses: {
        200: {
          description: 'Paginated list of recipes',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/RecipesResponse',
              },
            },
          },
        },

        400: {
          description: 'Invalid query parameters',
        },

        500: {
          description: 'Internal server error',
        },
      },
    },

    post: {
      tags: ['Recipes'],
      summary: 'Create a recipe',
      description:
        'Creates a new recipe for the authenticated user. A recipe image is required.',

      security: [
        {
          accessToken: [],
          sessionId: [],
        },
      ],

      requestBody: {
        required: true,
        content: {
          'multipart/form-data': {
            schema: {
              type: 'object',
              required: [
                'category',
                'title',
                'shortDescription',
                'ingredients',
                'instructions',
                'image',
              ],
              properties: {
                category: {
                  type: 'string',
                  enum: categories,
                },
                title: {
                  type: 'string',
                  example: 'Шоколадний торт',
                },
                shortDescription: {
                  type: 'string',
                  example: 'Ніжний домашній шоколадний торт',
                },
                ingredients: {
                  type: 'string',
                  example: '<p>200 г борошна...</p>',
                },
                instructions: {
                  type: 'string',
                  example: '<p>Змішайте всі інгредієнти...</p>',
                },
                baseRecipeId: {
                  type: 'string',
                  nullable: true,
                  example: null,
                },
                image: {
                  type: 'string',
                  format: 'binary',
                },
              },
            },
          },
        },
      },

      responses: {
        201: {
          description: 'Recipe successfully created',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Recipe',
              },
            },
          },
        },

        400: {
          description:
            'Invalid request data, missing image or unsupported image format',
        },

        401: {
          description: 'Unauthorized',
        },

        413: {
          description: 'Image exceeds the 4 MB size limit',
        },

        500: {
          description: 'Internal server error',
        },
      },
    },
  },

  '/recipes/categories/counts': {
    get: {
      tags: ['Recipes'],
      summary: 'Get recipe counts by category',
      description: 'Returns the number of recipes available in each category.',

      responses: {
        200: {
          description: 'Recipe counts grouped by category',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    category: {
                      type: 'string',
                      enum: categories,
                      example: 'Торти',
                    },
                    count: {
                      type: 'integer',
                      example: 8,
                    },
                  },
                },
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

  '/recipes/{recipeId}': {
    get: {
      tags: ['Recipes'],
      summary: 'Get recipe by ID',
      description: 'Returns a single recipe by its ID.',

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
          description: 'Recipe found',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Recipe',
              },
            },
          },
        },

        400: {
          description: 'Invalid recipe ID format',
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

        500: {
          description: 'Internal server error',
        },
      },
    },

    patch: {
      tags: ['Recipes'],
      summary: 'Update a recipe',
      description:
        'Updates a recipe owned by the authenticated user. Any recipe field and/or image can be updated.',

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

      requestBody: {
        content: {
          'multipart/form-data': {
            schema: {
              type: 'object',
              properties: {
                category: {
                  type: 'string',
                  enum: categories,
                },
                title: {
                  type: 'string',
                },
                shortDescription: {
                  type: 'string',
                },
                ingredients: {
                  type: 'string',
                },
                instructions: {
                  type: 'string',
                },
                baseRecipeId: {
                  type: 'string',
                  nullable: true,
                },
                image: {
                  type: 'string',
                  format: 'binary',
                },
              },
            },
          },
        },
      },

      responses: {
        200: {
          description: 'Recipe successfully updated',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Recipe',
              },
            },
          },
        },

        400: {
          description:
            'Invalid data, invalid recipe ID, unsupported image format or nothing to update',
        },

        401: {
          description: 'Unauthorized',
        },

        404: {
          description:
            'Recipe not found or does not belong to the authenticated user',
        },

        413: {
          description: 'Image exceeds the 4 MB size limit',
        },

        500: {
          description: 'Internal server error',
        },
      },
    },

    delete: {
      tags: ['Recipes'],
      summary: 'Delete a recipe',
      description:
        'Deletes a recipe owned by the authenticated user and removes it from saved recipes.',

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
          description: 'Recipe successfully deleted',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Recipe',
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
          description:
            'Recipe not found or does not belong to the authenticated user',
        },

        500: {
          description: 'Internal server error',
        },
      },
    },
  },
};
