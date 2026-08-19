import cloudinary from './cloudinary.js';

export async function deleteRecipeImageFromCloudinary(publicId) {
  if (!publicId) {
    return;
  }

  await cloudinary.uploader.destroy(publicId, {
    invalidate: true,
  });
}
