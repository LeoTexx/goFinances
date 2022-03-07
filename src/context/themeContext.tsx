import React, { createContext, useState } from "react";
import { useColorScheme, StatusBar } from "react-native";
import { ThemeProvider } from "styled-components";

import { dark, light } from "../global/styles/theme";

interface AppThemeProps {
  color: "light" | "black";
  switchTheme: () => void;
}

interface Props {
  children: JSX.Element;
}

export const AppThemeProvider = ({ children }: Props) => {
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
  return (
    <AppThemeContext.Provider value={{ color, switchTheme } as AppThemeProps}>
      <ThemeProvider theme={theme}>
        <>
          <StatusBar
            barStyle="light-content"
            backgroundColor={theme.colors.primary}
          />
          {children}
        </>
      </ThemeProvider>
    </AppThemeContext.Provider>
  );
};

export const AppThemeContext = createContext({} as AppThemeProps);
