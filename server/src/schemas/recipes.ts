// Define recipe(s) schema
import { z } from "zod";

export const fetchRecipes = z
  .object({
    offset: z.number().int().optional(),
    limit: z.number().int().optional(),
  })
  .optional();
