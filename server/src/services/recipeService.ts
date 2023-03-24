import { recipe } from "../schemas/recipe";
import { FirebaseService } from "./firebaseService";

export class RecipeService {
  private firebaseService = FirebaseService.instance;
  private basePath = "recipe";

  // Create a new recipe document with validated data
  async create(data: any) {
    const validatedData = recipe.parse(data);
    return this.firebaseService.create(this.basePath, validatedData);
  }

  // Read a recipe document with the given ID
  async read(id: string) {
    return this.firebaseService.read(`${this.basePath}/${id}`);
  }

  // Update a recipe document with validated data
  async update(data: any) {
    const validatedData = recipe.parse(data);
    return this.firebaseService.update(this.basePath, validatedData);
  }

  // Delete a recipe document with the given ID
  async delete(id: string) {
    return this.firebaseService.delete(this.basePath, id);
  }
}
