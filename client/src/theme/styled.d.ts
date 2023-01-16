import "styled-components";
import { Theme } from "@mui/material";
import { customTheme } from "./theme";

declare module "@mui/material/styles" {
  interface Theme extends customTheme {}
  interface ThemeOption extends customTheme {}
}

declare module "styled-components" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends Theme {}
}
