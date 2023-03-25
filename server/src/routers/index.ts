import { z } from "zod";

import { t } from "../trpc";
import { recipe, recipeDetail } from "../schemas/recipe";
import { fetchRecipes } from "../schemas/recipes";
import { FirebaseService } from "../services/firebaseService";

const db = FirebaseService.instance.db;
const recipesRef = db.ref("recipes");
const recipeRef = db.ref("recipe");

// Defined CRUD operations
export const router = t.router({
  // Get list of recipes
  getRecipeList: t.procedure
    .input(fetchRecipes)
    .query(async ({ input: { offset = 0, limit = 15, search } }) => {
      try {
        let query = recipesRef
          .orderByChild("id")
          .startAt(offset)
          .limitToFirst(limit);

        if (search) {
          query = recipesRef.orderByChild("title");
        }

        const snapshot = await query.once("value");

        const recipes = [];

        snapshot.forEach((childSnapshot) => {
          if (recipes.length >= limit) {
            return; // Stop iterating
          }

          const recipe = { id: childSnapshot.key, ...childSnapshot.val() };
          console.log({ recipe });
          if (
            !search ||
            recipe.title.toLowerCase().includes(search.toLowerCase())
          ) {
            recipes.push(recipe);
          }
        });

        return recipes;
      } catch (error) {
        throw new Error(`Failed to get recipe list: ${error.message}`);
      }
    }),
  // Recipe detail
  getRecipeDetail: t.procedure
    .input(z.number())
    .query(async ({ input: id }) => {
      try {
        const snapshot = await recipeRef
          .orderByChild("id")
          .equalTo(id)
          .once("value");
        if (!snapshot.exists()) {
          return null;
        }
        return snapshot.val();
      } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch recipe detail");
      }
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

// Export type router type signature
export type AppRouter = typeof router;
