# Recipe App
### A recipe app made with Expo, tRPC and Firebase!


### Table of Contents
  * [Pre-requisites](#prerequisites)
  * [Installation and usage](#installation)
  * [Screenshots](#screenshots)
  * [Features](#features)
  * [Missing features](#missing)
  * [Caveats](#caveats)
  * [Libraries](#libraries)

## <a name="prerequisites"></a> Pre-requisites

1. Ensure you have followed the installation process for [React Native](https://reactnative.dev/docs/environment-setup) (Before hand, we have to make sure we have an Android emulator with Google Play Services or an iOS simulator with at least iOS 12)
2. You **must** place the shared `serviceAccountKey.json` at `server` folder
3. You **must** place the shared `index.ts` file at `server/src/config` folder

## <a name="installation"></a> Installation and usage

For installing this project on your machine just clone the project and run in the console: 

npm:
```console
npm run install-all
```

yarn:
```console
yarn run install-all
```

Once you've done all the process explained above:

To start the server, run:
```console
npm run start-server
```

To start the client, run:

For iOS:
```console
npm run ios-client
```

For Android:
```console
npm run android-client
```

## <a name="screenshots"></a> Screenshots

<img width="250" src="https://user-images.githubusercontent.com/36211892/228013573-44dda144-082d-46b5-9d87-7ec7de73a12a.png" /><img width="250" src="https://user-images.githubusercontent.com/36211892/228014546-2ed2f50e-2b60-4694-ae0d-75c52068c365.png" /><img width="250" src="https://user-images.githubusercontent.com/36211892/228014998-36863fc0-539f-4230-ac59-dee908f9fb49.png" /><img width="250" src="https://user-images.githubusercontent.com/36211892/228015242-d48aa87e-b2c6-413c-85d8-d07870a3e78c.png" /><img width="250" src="https://user-images.githubusercontent.com/36211892/228015355-05a4fefb-3530-4fc6-8868-c93efb877403.png" /><img width="250" src="https://user-images.githubusercontent.com/36211892/228015465-18ac509c-be40-47b0-a236-b43f8b5f6e2d.png" />

## <a name="features"></a> Features

Routes integrated on client:

1. List all recipes (with search support
2. Show recipe detail
3. Delete recipe (on long press with context menu)

Miscelaneous on the client: 

1. Pull to reveal search bar
The sticky header bar on iOS is a native feature, which means that it behaves just like any native app that uses `headerLargeTitle`, so in order to use the search bar, you have to either tap on the status bar — that's a feature! — or you can pull to reveal the search bar!

![Mar-27-2023 13-30-30](https://user-images.githubusercontent.com/36211892/228020541-a72322d2-317a-4ec1-a163-8e5e7f7387b5.gif)


Routes implemented on server:

1. List all recipes (with search support)
2. Show recipe detail by id
3. Delete recipe by id
5. Create recipe

## <a name="missing"></a> Missing features

### 1. Filter by category
Honestly, I completely forgot about this feature, but if I had to implement, it would be an addition to the `getRecipeList`, so I would add as an optional field to the `Recipes` schema the `filterBy` as `z.string().optional()` and then I would update the `getRecipeList` route to have validation for it, so the new lines would be:

```ts
  if (filterBy) {
    query = recipesRef.orderByChild("category").equalTo(filterBy);
  }
  
  if (filterBy && search) {
    query = recipesRef.orderByChild("category").equalTo(search).orderByChild("title")
  }
```

### 2. Add recipe
Everything was created on the server-side, the only part missing was integration on the client.

### 3. Empty states
Forgot to create appealing screens when there is no data on the server when searching or when loading the `RecipeList` screen

## <a name="caveats"></a> Caveats
1. Firebase and full-text search

I already explained most of the issues I faced on server-side on my PR's, but just so anyone can have brief context, basically Firebase Realtime DB does not support full-text search, which means that you'll have to either use a third-party (e.g. Algolia, Elastic or Typesense) or create a workaround over this. 

## <a name="libraries"></a> Libraries used

On the client:
```json
    "@gorhom/bottom-sheet": "^4.4.5",
    "@react-navigation/native": "^6.1.6",
    "@react-navigation/native-stack": "^6.9.12",
    "@shopify/flash-list": "1.4.0",
    "@tanstack/react-query": "^4.28.0",
    "@trpc/client": "^10.18.0",
    "@trpc/react-query": "^10.18.0",
    "@trpc/server": "^10.18.0",
    "expo": "~48.0.9",
    "expo-blur": "~12.2.2",
    "expo-haptics": "^12.2.1",
    "expo-linear-gradient": "~12.1.2",
    "expo-splash-screen": "~0.18.1",
    "expo-status-bar": "~1.4.4",
    "react": "18.2.0",
    "react-native": "0.71.4",
    "react-native-context-menu-view": "^1.9.1",
    "react-native-gesture-handler": "~2.9.0",
    "react-native-pager-view": "6.1.2",
    "react-native-reanimated": "~2.14.4",
    "react-native-safe-area-context": "^4.5.0",
    "react-native-screens": "^3.20.0",
    "react-native-tab-view": "^3.5.1",
    "zod": "^3.21.4"
```

On the server:
```json
    "@trpc/server": "^10.18.0",
    "@types/express": "^4.17.17",
    "@types/node": "^18.15.6",
    "eslint": "^8.36.0",
    "express": "^4.18.2",
    "firebase-admin": "^11.5.0",
    "ts-node-dev": "^2.0.0",
    "typescript": "^5.0.2",
    "zod": "^3.21.4"
```

