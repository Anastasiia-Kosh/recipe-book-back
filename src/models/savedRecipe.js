import { Schema, model } from 'mongoose';

const savedRecipeSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    recipeId: {
      type: Schema.Types.ObjectId,
      ref: 'Recipe',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

savedRecipeSchema.index({ userId: 1, recipeId: 1 }, { unique: true });

savedRecipeSchema.methods.toJSON = function () {
  const obj = this.toObject();

  delete obj.imagePublicId;
  delete obj.__v;

  return obj;
};

export const SavedRecipe = model('SavedRecipe', savedRecipeSchema);
