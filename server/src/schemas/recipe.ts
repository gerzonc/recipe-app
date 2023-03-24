// Define recipe schema
import { z } from "zod";

export const recipe = z.object({
  title: z.string().nonempty(),
  description: z.string().nonempty(),
  image: z.string().url(),
  ingredients: z.array(z.string()).min(1),
  instructions: z.array(z.string().nonempty()).min(1),
  preparationTime: z
    .number()
    .int()
    .min(1)
    .transform((val) => val * 1000),
});

export const recipeDetail = z.object({
  id: z.number(),
  title: z.string(),
  image: z.string(),
  description: z.string(),
  instructions: z.string(),
  preparationTime: z.number(),
});

export const fetchRecipe = z.string();
