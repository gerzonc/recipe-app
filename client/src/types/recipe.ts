import { z } from "zod";
import { recipe } from "../../../server/src/schemas/recipe";

export type Recipe = Omit<
  z.infer<typeof recipe>,
  "instructions" | "ingredients"
>;
