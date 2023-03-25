import React from "react";
import { View, StyleSheet, Pressable, PressableProps } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

interface IIconButtonProps extends PressableProps {
  name: keyof typeof FontAwesome.glyphMap;
}

const IconButton: React.FC<IIconButtonProps> = ({ name, onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <FontAwesome name={name} size={18} color="#0D0E0B" />
      </View>
    </Pressable>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  container: {
    width: 38,
    height: 38,
    borderRadius: 8,
    backgroundColor: "#F4F5F6",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#0D0E0B",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
