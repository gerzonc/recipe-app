import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import {
  AddRecipeModal,
  RecipeDetailScreen,
  RecipeListScreen,
  SettingScreen,
} from "../screens";

const Stack = createNativeStackNavigator();

export const RootStack = () => (
  <Stack.Navigator screenOptions={{ headerLargeTitle: true }}>
    <Stack.Screen name="recipe-list" component={RecipeListScreen} />
    <Stack.Screen name="add-recipe" component={AddRecipeModal} />
    <Stack.Screen name="recipe-detail" component={RecipeDetailScreen} />
    <Stack.Screen name="settings" component={SettingScreen} />
  </Stack.Navigator>
);
