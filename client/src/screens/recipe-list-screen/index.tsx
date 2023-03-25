import {
  ActivityIndicator,
  Alert,
  NativeSyntheticEvent,
  Pressable,
  SafeAreaView,
  StyleSheet,
  TextInputFocusEventData,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import ContextMenu, {
  ContextMenuOnPressNativeEvent,
} from "react-native-context-menu-view";
import { FlashList } from "@shopify/flash-list";

import { menuItems } from "./context-menu";
import { RecipeCard } from "../../components";
import { Recipe } from "../../types";
import { LOAD_SIZE } from "../../constants";
import { trpc } from "../../utils/trpc";

const RecipeListScreen = ({ navigation }: any) => {
  const [searchText, setSearchText] = useState("");
  const [limit, setLimit] = useState(LOAD_SIZE);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [recipeList, setRecipeList] = useState<Array<Recipe & { id: number }>>(
    []
  );
  const { data, isLoading, isRefetching, refetch } =
    trpc.getRecipeList.useQuery(
      {
        offset,
        limit,
        search: searchText,
      },
      { keepPreviousData: false }
    );
  const mutation = trpc.deleteRecipe.useMutation();

  const handleDeleteButtonPress = (index: number) =>
    Alert.alert("Delete", "Are you sure you want to delete this recipe?", [
      {
        text: "Cancel",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: () => {
          mutation.mutate(
            { id: recipeList[index].id },
            {
              onSuccess: () => {
                setOffset(0);
                setLimit(LOAD_SIZE);
                setRecipeList([]);
                setHasMore(true);
                refetch();
              },
              onError: (error) => {
                console.log(error);
              },
            }
          );
        },
        style: "destructive",
      },
    ]);

  const handleSearchBarPress = (
    event: NativeSyntheticEvent<TextInputFocusEventData>
  ) => {
    const { text } = event.nativeEvent;
    setSearchText(text);
    setOffset(0);
    setLimit(LOAD_SIZE);
    setRecipeList([]);
    setHasMore(true);
    refetch();
  };

  const navigateToDetail = (index: number) => {
    navigation.navigate("recipe-detail", {
      id: recipeList[index].id,
      title: recipeList[index].title,
      description: recipeList[index].description,
      preparationTime: recipeList[index].preparationTime,
      image: recipeList[index].image,
    });
  };

  const handleContextMenu = (
    event: ContextMenuOnPressNativeEvent,
    index: number
  ) => {
    const { name } = event;

    switch (name) {
      case "View":
        return navigateToDetail(index);
      case "Edit":
        return () => {};
      case "Delete":
        return handleDeleteButtonPress(index);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        onSearchButtonPress: handleSearchBarPress,
        onCancelButtonPress: handleSearchBarPress,
      },
    });
  }, [offset, limit, searchText, refetch]);

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
  }, [data, searchText]);

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

  const renderItem = ({
    item,
    index,
  }: {
    item: Recipe & { id: number };
    index: number;
  }) => {
    return (
      <Pressable onPress={() => navigateToDetail(index)}>
        <ContextMenu
          actions={menuItems}
          onPress={(event) => handleContextMenu(event.nativeEvent, index)}
        >
          <RecipeCard recipe={item} />
        </ContextMenu>
      </Pressable>
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

  if (isRefetching) {
    return (
      <SafeAreaView>
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlashList
        data={recipeList}
        estimatedItemSize={200}
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
  },
  footerContainer: {
    paddingVertical: 20,
  },
});
