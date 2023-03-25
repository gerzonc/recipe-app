import { StyleSheet, Text, View } from "react-native";

interface ITabsProps {
  values: string[];
}

const Tabs: React.FC<ITabsProps> = ({ values }) => {
  if (!values) {
    return null;
  }

  return (
    <View style={{ flex: 1 }}>
      {values.map((value) => (
        <Text style={styles.value}>{value}</Text>
      ))}
    </View>
  );
};

export default Tabs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  value: {
    fontSize: 15,
  },
});
