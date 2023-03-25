import BottomSheet from "@gorhom/bottom-sheet";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { SceneMap, TabView } from "react-native-tab-view";

import { IconButton } from "../../components";
import { trpc } from "../../utils/trpc";
import Tabs from "./tabs";

const RecipeDetailScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation();
  const { id, title, image, description } = route.params;

  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "Ingredients" },
    { key: "second", title: "Instructions" },
  ]);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["72%", "85%"], []);
  const { data, isLoading } = trpc.getRecipeDetail.useQuery(id);

  const renderScene = SceneMap({
    first: () => <Tabs values={data?.ingredients} />,
    second: () => <Tabs values={data?.instructions} />,
  });

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <IconButton name="chevron-left" onPress={() => navigation.goBack()} />
      </View>
      <LinearGradient
        colors={[
          "rgba(255, 255, 255, 0.4)",
          "rgba(255, 255, 255, 0.2)",
          "rgba(0, 0, 0, 0.4)",
        ]}
        style={styles.linearGradient}
      />
      <Image source={{ uri: image }} style={styles.image} />
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        containerStyle={styles.bottomSheetContainer}
      >
        <View style={styles.textContainer}>
          <Text style={styles.heading}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            lazy
            initialLayout={{ width: layout.width }}
          />
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  buttons: {
    position: "absolute",

    width: "100%",
    height: 40,
    top: 32,
    paddingHorizontal: 16,
    justifyContent: "center",
    zIndex: 2,
  },
  linearGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "38%",
    zIndex: 1,
  },
  bottomSheetContainer: {
    zIndex: 3,
  },
  image: {
    width: "100%",
    height: "38%",
  },
  textContainer: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 12,
  },
  pagerView: {
    backgroundColor: "red",
    flex: 1,
  },
});

export default RecipeDetailScreen;
