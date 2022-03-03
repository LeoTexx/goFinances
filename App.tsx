import React, { createContext, useState } from "react";
import { StatusBar, useColorScheme } from "react-native";
import "react-native-gesture-handler";
import { ThemeProvider } from "styled-components";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import AppLoading from "expo-app-loading";

import { AuthProvider, useAuth } from "./src/hooks/auth";
import { dark, light } from "./src/global/styles/theme";

import { Routes } from "./src/routes";

import "intl";
import "intl/locale-data/jsonp/pt-BR";

import { GestureHandlerRootView } from "react-native-gesture-handler";

interface AppThemeProps {
  color: "light" | "black";
  switchTheme: () => void;
}

export const AppThemeContext = createContext({} as AppThemeProps);

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  const { userStorageIsLoading } = useAuth();
  const deviceColor = useColorScheme()!;
  const [color, setColor] = useState<"light" | "dark">(deviceColor);

  function switchTheme() {
    if (color === "light") {
      setColor("dark");
    } else {
      setColor("light");
    }
  }

  const theme = color === "light" ? light : dark;

  if (!fontsLoaded || userStorageIsLoading) {
    return <AppLoading />;
  }

  return (
    <AppThemeContext.Provider value={{ color, switchTheme } as AppThemeProps}>
      <ThemeProvider theme={theme}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={theme.colors.primary}
        />
        <AuthProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <Routes />
          </GestureHandlerRootView>
        </AuthProvider>
      </ThemeProvider>
    </AppThemeContext.Provider>
  );
}
