import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { screens } from "../constants";

import {
  AddRecipeModal,
  RecipeDetailScreen,
  RecipeListScreen,
  SettingScreen,
} from "../screens";

const Stack = createNativeStackNavigator();

export const RootStack = () => (
  <Stack.Navigator screenOptions={{ headerLargeTitle: true }}>
    <Stack.Screen
      name={screens.recipeList.name}
      component={RecipeListScreen}
      options={{ headerTitle: screens.recipeList.title }}
    />
    <Stack.Screen
      name={screens.addRecipe.name}
      component={AddRecipeModal}
      options={{ headerTitle: screens.addRecipe.name, presentation: "modal" }}
    />
    <Stack.Screen
      name={screens.recipeDetail.name}
      component={RecipeDetailScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={screens.settings.name}
      component={SettingScreen}
      options={{ headerTitle: screens.settings.title, headerLargeTitle: false }}
    />
  </Stack.Navigator>
);
