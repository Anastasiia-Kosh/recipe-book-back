export const authPaths = {
  '/auth/register': {
    post: {
      tags: ['Auth'],
      summary: 'Register a new user',
      description:
        'Creates a new user account and starts an authenticated session.',

      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['email', 'password'],
              properties: {
                email: {
                  type: 'string',
                  format: 'email',
                  example: 'user@example.com',
                },
                password: {
                  type: 'string',
                  minLength: 8,
                  example: 'password123',
                },
              },
            },
          },
        },
      },

      responses: {
        201: {
          description: 'User successfully registered',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User',
              },
            },
          },
        },

        400: {
          description: 'Invalid data or email is already in use',
        },

        500: {
          description: 'Internal server error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error',
              },
            },
          },
        },
      },
    },
  },

  '/auth/login': {
    post: {
      tags: ['Auth'],
      summary: 'Log in',
      description:
        'Authenticates a user and creates a new authenticated session.',

      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['email', 'password'],
              properties: {
                email: {
                  type: 'string',
                  format: 'email',
                  example: 'user@example.com',
                },
                password: {
                  type: 'string',
                  example: 'password123',
                },
              },
            },
          },
        },
      },

      responses: {
        200: {
          description: 'User successfully logged in',
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
          description: 'Invalid email or password',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error',
              },
              example: {
                message: 'Invalid credentials',
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

  '/auth/logout': {
    post: {
      tags: ['Auth'],
      summary: 'Log out',
      description:
        'Deletes the current session if it exists and clears authentication cookies.',

      responses: {
        204: {
          description: 'Successfully logged out',
        },

        500: {
          description: 'Internal server error',
        },
      },
    },
  },

  '/auth/refresh': {
    post: {
      tags: ['Auth'],
      summary: 'Refresh user session',
      description:
        'Creates a new session using the current sessionId and refreshToken cookies.',

      security: [
        {
          sessionId: [],
          refreshToken: [],
        },
      ],

      responses: {
        200: {
          description: 'Session successfully refreshed',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: 'Session refreshed',
                  },
                },
              },
            },
          },
        },

        401: {
          description: 'Session credentials are missing, invalid or expired',
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

  '/auth/request-reset-email': {
    post: {
      tags: ['Auth'],
      summary: 'Request password reset email',
      description:
        'Sends a password reset link if an account with the provided email exists.',

      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['email'],
              properties: {
                email: {
                  type: 'string',
                  format: 'email',
                  example: 'user@example.com',
                },
              },
            },
          },
        },
      },

      responses: {
        200: {
          description: 'Password reset request successfully processed',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: 'Password reset email sent successfully',
                  },
                },
              },
            },
          },
        },

        400: {
          description: 'Invalid email',
        },

        500: {
          description: 'Failed to send password reset email',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error',
              },
              example: {
                message: 'Failed to send the email, please try again later.',
              },
            },
          },
        },
      },
    },
  },

  '/auth/reset-password': {
    post: {
      tags: ['Auth'],
      summary: 'Reset password',
      description:
        'Sets a new password using a valid reset token and deletes all existing user sessions.',

      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['password', 'token'],
              properties: {
                password: {
                  type: 'string',
                  minLength: 8,
                  example: 'newPassword123',
                },
                token: {
                  type: 'string',
                  example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                },
              },
            },
          },
        },
      },

      responses: {
        200: {
          description: 'Password successfully reset',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: 'Password reset successfully',
                  },
                },
              },
            },
          },
        },

        400: {
          description: 'Invalid request data',
        },

        401: {
          description: 'Reset token is invalid or expired',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error',
              },
              example: {
                message: 'Invalid or expired token',
              },
            },
          },
        },

        404: {
          description: 'User associated with the token was not found',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error',
              },
              example: {
                message: 'User not found',
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
