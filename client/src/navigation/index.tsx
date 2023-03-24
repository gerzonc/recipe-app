import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { SCREENS } from "../constants";

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
      name={SCREENS.recipeList.name}
      component={RecipeListScreen}
      options={{ headerTitle: SCREENS.recipeList.title }}
    />
    <Stack.Screen
      name={SCREENS.addRecipe.name}
      component={AddRecipeModal}
      options={{ headerTitle: SCREENS.addRecipe.name, presentation: "modal" }}
    />
    <Stack.Screen
      name={SCREENS.recipeDetail.name}
      component={RecipeDetailScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={SCREENS.settings.name}
      component={SettingScreen}
      options={{ headerTitle: SCREENS.settings.title, headerLargeTitle: false }}
    />
  </Stack.Navigator>
);
