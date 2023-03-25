import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("screen");

export const SCREENS = {
  recipeList: {
    name: "recipe-list",
    title: "Recipes",
  },
  recipeDetail: {
    name: "recipe-detail",
    title: "",
  },
  addRecipe: {
    name: "add-recipe",
    title: "Add Recipe",
  },
  settings: {
    name: "settings",
    title: "Settings",
  },
};

export const LOAD_SIZE = 15;
export const SCREEN_WIDTH = width;
export const SCREEN_HEIGHT = height;
