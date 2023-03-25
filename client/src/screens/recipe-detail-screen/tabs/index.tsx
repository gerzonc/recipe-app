import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

interface ITabsProps {
  values: string[];
}

const Tabs: React.FC<ITabsProps> = ({ values }) => {
  if (!values) {
    return null;
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {values.map((value, index) => (
        <View style={styles.valueContainer} key={index}>
          <Text style={styles.value}>{value}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default Tabs;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    width: "100%",
    height: 60,
    paddingHorizontal: 16,
  },
  contentContainer: {
    width: "100%",
  },
  valueContainer: {
    borderRadius: 6,
    marginVertical: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "white",
    shadowColor: "#0D0E0B",
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 4,
    zIndex: 5,
  },
  value: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
