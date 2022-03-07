import React from "react";
import "react-native-gesture-handler";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import AppLoading from "expo-app-loading";

import { AuthProvider, useAuth } from "./src/hooks/auth";

import { Routes } from "./src/routes";

import "intl";
import "intl/locale-data/jsonp/pt-BR";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AppThemeProvider } from "./src/context/themeContext";

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  const { userStorageIsLoading } = useAuth();

  if (!fontsLoaded || userStorageIsLoading) {
    return <AppLoading />;
  }

  return (
    <AppThemeProvider>
      <AuthProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Routes />
        </GestureHandlerRootView>
      </AuthProvider>
    </AppThemeProvider>
  );
}
