import { RecipeService } from "../services/recipeService";
import { Request, Response } from "express";
import { z } from "zod";
import { recipe } from "../schemas/recipe";

const requestSchema = z.object({
  body: recipe,
});

export class RecipeController {
  private recipeService = new RecipeService();

  /**
   * Creates a new recipe using data from the request body.
   * Returns the created recipe.
   */
  async createRecipe(request: Request, response: Response) {
    const { body } = requestSchema.parse(request);
    const recipe = await this.recipeService.create(body);

    return response.json(recipe);
  }

  /**
   * Retrieves an existing recipe with the given ID.
   * Returns the recipe if it exists, or an error response if it does not.
   */
  async readRecipe(request: Request, response: Response) {
    const { id } = request.params as { id: string };
    const recipe = await this.recipeService.read(id);

    return response.json(recipe);
  }

  /**
   * Updates an existing recipe with new data from the request body.
   * Returns the updated recipe.
   */
  async updateRecipe(request: Request, response: Response) {
    const { body } = requestSchema.parse(request);
    const recipe = await this.recipeService.update(body);

    return response.json(recipe);
  }

  /**
   * Deletes an existing recipe with the given ID.
   * Returns a JSON response indicating the ID of the deleted recipe.
   */
  async deleteRecipe(request: Request, response: Response) {
    const { id } = request.params as { id: string };
    const recipeId = await this.recipeService.delete(id);

    return response.json({ id: recipeId });
  }
}
