import { RouteProp } from "@react-navigation/native";
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

interface IRecipeDetailProps {
  route: RouteProp<any>;
}

const RecipeDetailScreen: React.FC<IRecipeDetailProps> = ({ route }) => {
  const { title, image, description } = route.params as any;
  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.heading}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  image: {
    width: "100%",
    height: 250,
  },
  textContainer: {
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
  },
});

export default RecipeDetailScreen;
