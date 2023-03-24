import * as admin from "firebase-admin";

import { t } from "../trpc";
import { recipe } from "../schemas/recipe";
import { fetchRecipes } from "../schemas/recipes";

const db = admin.database();
const recipesRef = db.ref("recipes");

// Defined CRUD operations
export const router = t.router({
  getRecipeList: t.procedure
    .input(fetchRecipes)
    .query(async ({ input: { offset = 0, limit = 10 } }) => {
      const snapshot = await recipesRef
        .orderByKey()
        .startAt("")
        .limitToFirst(offset + limit)
        .once("value");
      const recipes = [];

      snapshot.forEach((childSnapshot) => {
        if (recipes.length >= limit) {
          return true; // Stop iterating
        }
        if (childSnapshot.key && childSnapshot.val()) {
          recipes.push({ id: childSnapshot.key, ...childSnapshot.val() });
        }
      });

      return recipes;
    }),
  // Create a recipe
  createRecipe: t.procedure
    .input(
      recipe.pick({
        title: true,
        description: true,
        image: true,
        ingredients: true,
        preparationTime: true,
      })
    )
    .mutation(async ({ input }) => {
      const { title, description, image, ingredients, preparationTime } = input;
      const recipe = {
        title,
        description,
        image,
        ingredients,
        preparationTime,
      };

      const newRecipeRef = recipesRef.push();
      await newRecipeRef.set(recipe);
      const snapshot = await newRecipeRef.once("value");

      return { id: snapshot.key!, ...recipe };
    }),
});
