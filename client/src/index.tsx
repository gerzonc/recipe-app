import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Platform } from "react-native";

import { RootStack } from "./navigation";
import { trpc } from "./utils/trpc";

const App = () => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url:
            Platform.OS === "ios"
              ? "http://localhost:3000/trpc"
              : "http://192.168.100.8:3000/trpc",
        }),
      ],
    })
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <StatusBar style={"dark"} />
          <RootStack />
        </NavigationContainer>
      </QueryClientProvider>
    </trpc.Provider>
  );
};

export default App;
