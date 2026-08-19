import cloudinary from './cloudinary.js';

export async function saveRecipeImageToCloudinary(buffer, recipeId) {
  const options = {
    folder: 'recipe-book/recipes',
    public_id: `recipe_${recipeId}`,
    resource_type: 'image',
    overwrite: true,
    unique_filename: false,
  };

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      options,
      (error, result) => {
        if (error) {
          return reject(error);
        }

        resolve(result);
      },
    );

    uploadStream.end(buffer);
  });
}
