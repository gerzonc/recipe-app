import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  PressableProps,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

interface IIconButtonProps extends PressableProps {
  name: keyof typeof FontAwesome.glyphMap;
}

const IconButton: React.FC<IIconButtonProps> = ({ name, onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <FontAwesome name={name} size={16} color="#BDC0BF" />
      </View>
    </Pressable>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  container: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F4F5F6",
    justifyContent: "center",
    alignItems: "center",
  },
});
