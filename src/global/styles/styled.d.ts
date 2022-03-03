import "styled-components";
import { dark, light } from "./theme";

declare module "styled-components" {
  type ThemeType = typeof dark;

  export interface DefaultTheme extends ThemeType {}
}
