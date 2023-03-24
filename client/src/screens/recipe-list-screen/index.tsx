import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";

import { trpc } from "../../utils/trpc";
import { LOAD_SIZE } from "../../constants";

const RecipeListScreen = () => {
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(LOAD_SIZE);

  const [total, setTotal] = useState(0);
  const [recipeList, setRecipeList] = useState<any>([]);
  const [hasMore, setHasMore] = useState(true);

  const { data, isLoading, refetch } = trpc.getRecipeList.useQuery({
    offset,
    limit,
  });

  useEffect(() => {
    if (data) {
      setRecipeList([...recipeList, ...data]);
      setTotal(data.length);
    }
  }, [data]);

  const handleLoadMore = useCallback(() => {
    if (hasMore && !isLoading) {
      setOffset(offset + LOAD_SIZE + 1);
      setLimit(limit + LOAD_SIZE);
      refetch().then(({ data }) => {
        if (data) {
          setRecipeList([...recipeList, ...data]);
          setTotal(total + data.length); // add the length of the new data to the existing total
        }
        if (data && data?.length < LOAD_SIZE) {
          setHasMore(false);
        }
      });
    }
  }, [hasMore, isLoading, offset, limit, recipeList.length, total]);

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    return (
      <View key={index} style={{ padding: 16 }}>
        <Text>{item.title}</Text>
      </View>
    );
  };

  const renderFooter = useCallback(() => {
    if (hasMore && isLoading)
      return (
        <View style={{ paddingVertical: 20 }}>
          <ActivityIndicator color="#999999" />
        </View>
      );
    return null;
  }, []);

  return (
    <View style={{ marginTop: 160 }}>
      <FlatList
        data={recipeList}
        renderItem={renderItem}
        keyExtractor={(recipe) => recipe.id.toString()}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

export default RecipeListScreen;
