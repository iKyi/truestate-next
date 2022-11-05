import { PaletteMode } from "@mui/material";
import { Palette } from "@mui/material/styles";

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    primary: {
      main: "#121212",
    },
    secondary: {
      main: "#529c62",
    },
  } as Palette,
});

export { getDesignTokens as ImmortalColorsGetter };
