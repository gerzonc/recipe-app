import BottomSheet from "@gorhom/bottom-sheet";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import {
  NavigationState,
  SceneMap,
  SceneRendererProps,
  TabBar,
  TabView,
} from "react-native-tab-view";
import { FontAwesome as Icon } from "@expo/vector-icons";

import Tabs from "./tabs";
import { IconButton } from "../../components";
import { formatTime } from "../../utils/formatTime";
import { trpc } from "../../utils/trpc";

const RecipeDetailScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation();
  const { id, title, image, description, preparationTime } = route.params;
  const prepTimeFormatted = formatTime(preparationTime);

  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "Ingredients" },
    { key: "second", title: "Instructions" },
  ]);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["72%", "88%"], []);
  const { data, isLoading } = trpc.getRecipeDetail.useQuery(id);

  const renderScene = SceneMap({
    first: () => <Tabs values={(data as any).ingredients} />,
    second: () => <Tabs values={(data as any).instructions} />,
  });

  const renderTabBar = useCallback(
    (
      props: SceneRendererProps & {
        navigationState: NavigationState<{
          key: string;
          title: string;
        }>;
      }
    ) => (
      <TabBar
        {...props}
        style={styles.tabBar}
        tabStyle={styles.tabStyle}
        labelStyle={styles.labelStyle}
        indicatorStyle={styles.indicatorStyle}
        indicatorContainerStyle={styles.indicatorContainerStyle}
      />
    ),
    []
  );

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
          <View style={styles.time}>
            <Icon name="clock-o" size={20} />
            <Text style={styles.prepTime}>{prepTimeFormatted}</Text>
          </View>
          <Text style={styles.description}>{description}</Text>
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            renderTabBar={renderTabBar}
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
  time: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  prepTime: {
    marginLeft: 8,
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
  tabBar: {
    backgroundColor: "#BDC0BF",
    borderRadius: 20,
    width: "100%",
    marginBottom: 16,
  },
  tabStyle: {
    height: 60,
    alignSelf: "center",
  },
  labelStyle: {
    textTransform: "capitalize",
  },
  indicatorStyle: {
    height: 50,
    top: 6,
    bottom: 6,
    left: 6,
    width: 155,
    backgroundColor: "#0F8E6F",
    alignSelf: "center",
    borderRadius: 15,
  },
  indicatorContainerStyle: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default RecipeDetailScreen;
