# RecipeBook Backend

Backend API for the RecipeBook application.

It provides authentication, user profile management, recipe CRUD operations, saved recipes, image uploads, password reset endpoints, validation, sanitization, and Swagger API documentation.

## Live Links

- Frontend: https://recipe-book-eight-livid.vercel.app
- Backend: https://recipe-book-back-ax30.onrender.com
- Swagger API Docs: https://recipe-book-back-ax30.onrender.com/api-docs/

## Tech Stack

- Node.js
- Express
- MongoDB
- Mongoose
- Joi / Celebrate
- Cloudinary
- Multer
- bcrypt
- JWT
- Nodemailer
- Handlebars
- sanitize-html
- Pino
- Swagger / OpenAPI

## Features

- User registration and login
- Cookie-based authentication with access and refresh tokens
- Multi-device sessions
- Session refresh and logout
- Password reset backend flow via email
- User profile update
- Avatar upload to Cloudinary
- Recipe creation, editing and deletion
- Recipe image upload to Cloudinary
- Recipe search, filtering and pagination
- Category recipe counts
- Saved recipes / favorites
- Request validation with Joi and Celebrate
- Rich-text sanitization
- Centralized error handling
- Swagger API documentation

## API Groups

The API is organized into four groups:

- `Auth` — registration, login, logout, session refresh, password reset
- `Users` — current user profile, avatar and personal recipes
- `Recipes` — public recipe browsing and authenticated recipe management
- `Saved Recipes` — authenticated favorites management

For the full request and response schemas, use the Swagger documentation:

https://recipe-book-back-ax30.onrender.com/api-docs/

## Local Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Create environment variables

Create a `.env` file in the project root based on `.env.example`.

Required variables:

```env
PORT=3001

MONGO_URL=
JWT_SECRET=
FRONTEND_DOMAIN=
DEFAULT_AVATAR_URL=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASSWORD=
SMTP_FROM=
```

Do not commit real credentials or secret values.

### 3. Start the development server

```bash
npm run dev
```

The API will be available at:

```text
http://localhost:3001
```

Local Swagger documentation:

```text
http://localhost:3001/api-docs/
```

## Scripts

```bash
npm run dev      # start development server with nodemon
npm start        # start production server
npm run swagger  # regenerate src/swagger.json
```

## Project Structure

```text
src/
├── constants/
├── controllers/
├── db/
├── middleware/
├── models/
├── routes/
├── services/
├── swagger/
├── templates/
├── utils/
├── validations/
├── server.js
├── swagger.js
└── swagger.json
```

## Images

Recipe images and user avatars are uploaded to Cloudinary. Uploaded files are validated by MIME type and limited to 4 MB.

## Authentication

Authentication is session-based and uses HTTP-only cookies for:

- `accessToken`
- `refreshToken`
- `sessionId`

Access tokens are short-lived, while refresh tokens are used to rotate sessions. Multiple devices can keep separate active sessions.

## Related Repository

Frontend repository:

https://github.com/Anastasiia-Kosh/recipe-book
