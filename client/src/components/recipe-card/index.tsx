import { View, Text, Image, StyleSheet, PixelRatio } from "react-native";
import React from "react";
import { FontAwesome as Icon } from "@expo/vector-icons";

import { Recipe } from "../../types";
import { formatTime } from "../../utils/formatTime";

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const prepTimeFormatted = formatTime(recipe.preparationTime);
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: recipe.image }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={styles.title}>{recipe.title}</Text>
        <Text style={styles.description} numberOfLines={2} ellipsizeMode="tail">
          {`${recipe.description}`}
        </Text>
        <View style={styles.info}>
          <Icon name="clock-o" size={20} color="#0D0E0B" />
          <Text style={styles.time}>{prepTimeFormatted}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F4F5F6",
    marginBottom: 12,
    marginHorizontal: 16,
    borderRadius: 15,
    padding: 8,
  },
  image: {
    borderRadius: 15,
    height: PixelRatio.roundToNearestPixel(120),
    width: "100%",
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 18,
    marginBottom: 8,
    fontWeight: "bold",
  },
  description: {
    fontSize: 15,
    marginBottom: 8,
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  time: {
    marginLeft: 8,
    fontSize: 14,
    color: "#0D0E0B",
    fontWeight: "bold",
  },
});

export default RecipeCard;
