import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import React, { useCallback, useEffect, useMemo, useState } from "react";

import { RecipeCard } from "../../components";
import { Recipe } from "../../types";
import { LOAD_SIZE } from "../../constants";
import { trpc } from "../../utils/trpc";

const RecipeListScreen = (): JSX.Element => {
  const [limit, setLimit] = useState(LOAD_SIZE);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [recipeList, setRecipeList] = useState<Array<Recipe & { id: number }>>(
    []
  );

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

  const renderItem = useMemo(() => {
    return ({ item }: { item: Recipe & { id: number } }): JSX.Element => {
      return <RecipeCard recipe={item} />;
    };
  }, []);

  const renderFooter = useCallback((): JSX.Element | null => {
    if (hasMore && isLoading) {
      return (
        <View style={styles.footerContainer}>
          <ActivityIndicator color="#999999" />
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
