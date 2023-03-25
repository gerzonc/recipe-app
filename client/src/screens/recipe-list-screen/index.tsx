import {
  ActivityIndicator,
  Alert,
  FlatList,
  NativeSyntheticEvent,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";

import { RecipeCard } from "../../components";
import { Recipe } from "../../types";
import { LOAD_SIZE } from "../../constants";
import { trpc } from "../../utils/trpc";
import { useNavigation } from "@react-navigation/native";
import ContextMenu, {
  ContextMenuOnPressNativeEvent,
} from "react-native-context-menu-view";
import { menuItems } from "./context-menu";

const RecipeListScreen = () => {
  const [limit, setLimit] = useState(LOAD_SIZE);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [recipeList, setRecipeList] = useState<Array<Recipe & { id: number }>>(
    []
  );
  const navigation = useNavigation<any>();

  const handleDeleteButtonPress = () =>
    Alert.alert("Delete", "Are you sure you want to delete this recipe?", [
      {
        text: "Cancel",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: () => {},
        style: "destructive",
      },
    ]);

  const handleContextMenu = (
    event: NativeSyntheticEvent<ContextMenuOnPressNativeEvent>
  ) => {
    const { name } = event.nativeEvent;
    switch (name) {
      case "View":
        return navigation.navigate("recipe-detail");
      case "Edit":
        return () => {};
      case "Delete":
        return handleDeleteButtonPress();
    }
  };

  const { data, isLoading, refetch } = trpc.getRecipeList.useQuery({
    offset,
    limit,
  });

  useEffect(() => {
    if (data) {
      setRecipeList((prevRecipeList) =>
        [...prevRecipeList, ...data].filter(
          (recipe, index, self) =>
            index === self.findIndex((r) => r.id === recipe.id)
        )
      );

      setTotal(data.length);

      if (data && data?.length < LOAD_SIZE) {
        setHasMore(false);
      }
    }
  }, [data]);

  const loadMore = useCallback(() => {
    if (hasMore && !isLoading) {
      const newOffset = offset + LOAD_SIZE + 1;
      setOffset(newOffset);
      setLimit(limit + LOAD_SIZE);
      refetch().then(({ data }) => {
        if (data) {
          setRecipeList([...recipeList, ...data]);
          setTotal(total + data.length);
        }
        setHasMore((!data?.length || data?.length < LOAD_SIZE) ?? false);
      });
    }
  }, [hasMore, isLoading, offset, limit, recipeList.length, total]);

  const renderItem = ({ item }: { item: Recipe & { id: number } }) => {
    return (
      <ContextMenu actions={menuItems} onPress={handleContextMenu}>
        <RecipeCard recipe={item} />
      </ContextMenu>
    );
  };

  const renderFooter = useCallback(() => {
    if (hasMore && isLoading) {
      return (
        <View style={styles.footerContainer}>
          <ActivityIndicator color="#F4F5F6" />
        </View>
      );
    }
    return null;
  }, [hasMore, isLoading]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={recipeList}
        renderItem={renderItem}
        removeClippedSubviews
        contentContainerStyle={styles.listContent}
        keyExtractor={(recipe) => recipe.id.toString()}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
    </SafeAreaView>
  );
};

export default RecipeListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingTop: 16,
    marginBottom: 32,
  },
  footerContainer: {
    paddingVertical: 20,
  },
});
