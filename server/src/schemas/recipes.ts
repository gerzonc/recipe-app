// Define recipe(s) schema
import { z } from "zod";

export const fetchRecipes = z.object({
  offset: z.number().int(),
  limit: z.number().int(),
  search: z.string().optional(),
});
