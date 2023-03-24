import { View, Text, Image } from "react-native";
import React from "react";
import { FontAwesome as Icon } from "@expo/vector-icons";

import { Recipe } from "../../types";

interface CardProps {
  recipe: Recipe;
}

const Card: React.FC<CardProps> = ({ recipe }) => {
  return (
    <View
      style={{
        flex: 1,
        marginBottom: 12,
        marginHorizontal: 16,
        borderRadius: 15,
        backgroundColor: "#F4F5F6",
        alignItems: "center",
        padding: 8,
      }}
    >
      <Image
        source={{ uri: recipe.image }}
        style={{
          width: "100%",
          height: 120,
          borderRadius: 15,
        }}
        resizeMode="cover"
      />
      <View style={{ padding: 12 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 8 }}>
          {recipe.title}
        </Text>
        <Text style={{ fontSize: 15, marginBottom: 8 }} numberOfLines={2}>
          {`${recipe.description.slice(0, 60)}...`}
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon
            name="clock-o"
            size={20}
            color="#0D0E0B"
            style={{ marginRight: 8 }}
          />
          <Text
            style={{ fontSize: 14, color: "#0D0E0B", fontWeight: "bold" }}
          >{`${recipe.preparationTime / 60} minutes`}</Text>
        </View>
      </View>
    </View>
  );
};

export default Card;
