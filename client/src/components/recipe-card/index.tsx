import { View, Text, Image, StyleSheet, PixelRatio } from "react-native";
import React from "react";
import { FontAwesome as Icon } from "@expo/vector-icons";

import { Recipe } from "../../types";

interface CardProps {
  recipe: Recipe;
}

const Card: React.FC<CardProps> = ({ recipe }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: recipe.image }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={styles.title}>{recipe.title}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {`${recipe.description.slice(0, 60)}...`}
        </Text>
        <View style={styles.info}>
          <Icon name="clock-o" size={20} color="#0D0E0B" />
          <Text style={styles.time}>{`${
            recipe.preparationTime / 60
          } minutes`}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    marginHorizontal: 16,
    borderRadius: 15,
    backgroundColor: "#F4F5F6",
    alignItems: "center",
    padding: 8,
  },
  image: {
    width: "100%",
    height: PixelRatio.roundToNearestPixel(120),
    borderRadius: 15,
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 15,
    marginBottom: 8,
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
  },
  time: {
    fontSize: 14,
    color: "#0D0E0B",
    fontWeight: "bold",
    marginLeft: 8,
  },
});

export default Card;
