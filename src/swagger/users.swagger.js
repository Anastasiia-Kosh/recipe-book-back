export const usersPaths = {
  '/users/me': {
    get: {
      tags: ['Users'],
      summary: 'Get current user',
      description: 'Returns the currently authenticated user.',

      security: [
        {
          accessToken: [],
          sessionId: [],
        },
      ],

      responses: {
        200: {
          description: 'Current user',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User',
              },
            },
          },
        },

        401: {
          description: 'Missing, invalid or expired access token',
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

    patch: {
      tags: ['Users'],
      summary: 'Update current user',
      description: 'Updates the username of the authenticated user.',

      security: [
        {
          accessToken: [],
          sessionId: [],
        },
      ],

      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['username'],
              properties: {
                username: {
                  type: 'string',
                  minLength: 2,
                  maxLength: 50,
                  example: 'Anastasiia',
                },
              },
            },
          },
        },
      },

      responses: {
        200: {
          description: 'User successfully updated',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User',
              },
            },
          },
        },

        400: {
          description: 'Invalid request data',
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

  '/users/me/recipes': {
    get: {
      tags: ['Users'],
      summary: 'Get current user recipes',
      description:
        'Returns a paginated list of recipes created by the authenticated user.',

      security: [
        {
          accessToken: [],
          sessionId: [],
        },
      ],

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
          description: 'Paginated user recipes',
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

  '/users/me/avatar': {
    patch: {
      tags: ['Users'],
      summary: 'Update user avatar',
      description: 'Uploads a new avatar image for the authenticated user.',

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
              required: ['avatar'],
              properties: {
                avatar: {
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
          description: 'Avatar successfully updated',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  url: {
                    type: 'string',
                    example: 'https://res.cloudinary.com/.../avatar.jpg',
                  },
                },
              },
            },
          },
        },

        400: {
          description: 'No file provided or unsupported image format',
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
};
