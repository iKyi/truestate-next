import { createTheme, CssBaseline, PaletteMode } from "@mui/material";
import { Theme, ThemeProvider } from "@mui/system";
import { createContext, ReactNode, useMemo, useState } from "react";
import { ImmortalColorsGetter } from "./pallette";

export enum FONTS {
  LATO = "Lato, sans-serif, Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
}

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {}
}

let TrueEstateTheme = createTheme({
  typography: {
    fontFamily: '"Quicksand", sans-serif',
    h1: {
      fontFamily: "Montserrat, Roboto ,  Helvetica ,  Arial , sans-serif",
    },
    h2: {
      fontFamily: "Montserrat, Roboto ,  Helvetica ,  Arial , sans-serif",
    },
    h3: {
      fontFamily: "Montserrat, Roboto ,  Helvetica ,  Arial , sans-serif",
    },
    h4: {
      fontFamily: "Montserrat, Roboto ,  Helvetica ,  Arial , sans-serif",
    },
    h5: {
      fontFamily: "Montserrat, Roboto ,  Helvetica ,  Arial , sans-serif",
    },
    h6: {
      fontFamily: "Montserrat, Roboto ,  Helvetica ,  Arial , sans-serif",
    },
  },
  shape: {},
  spacing: 8,
});

const getOverRides = (theme: Theme) => {
  return {
    components: {
      MuiChip: {
        variants: [
          {
            props: { color: "secondary", variant: "filled" },
            style: {},
          },
        ],
      },
      MuiButton: {
        variants: [
          // {
          //   props: { variant: "complex" },
          //   style: {
          //     fontSize: "1.35rem",
          //     textTransform: "none",
          //     paddingLeft: 36,
          //     paddingRight: 36,
          //     color: theme.palette.primary.main,
          //     clipPath:
          //       "polygon(10% 0%, 90% 0%, 100% 50%, 90% 100%, 10% 100%, 0% 50%);",
          //     "&:hover": {
          //       backgroundColor: "transparent",
          //       color: theme.palette.secondary.main,
          //     },
          //   },
          // },
        ],
        styleOverrides: {
          root: {
            fontFamily: "Quicksand",
            position: "relative",
            borderRadius: 0,
          },
        },
      },
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            fontFamily: '"Quicksand", sans-serif',
            height: "100%",
            display: "flex",
            flexDirection: "column",
          },
          html: {
            height: "100%",
          },
          "& #__next": {
            minHeight: "100%",
            flex: "1",
            display: "flex",
            flexDirection: "column",
          },
          "& #root": {
            flex: 1,
          },
          p: {
            margin: 0,
          },
          ".TP": {
            color: theme.palette.primary.main,
          },
          ".TS": {
            color: theme.palette.secondary.main,
          },
        },
      },
    },
  };
};

const ColorModeContext = createContext({ toggleColorMode: () => {} });

const TruestateThemeProvder: React.VFC<{ children: ReactNode }> = ({
  children,
}) => {
  const [mode, setMode] = useState<PaletteMode>("light");
  const colorMode = useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) =>
          prevMode === "light" ? "dark" : "light"
        );
      },
    }),
    []
  );

  // Update the theme only if the mode changes
  const theme = useMemo(() => {
    const palette = ImmortalColorsGetter(mode);
    const themeObj = { ...TrueEstateTheme, ...palette };
    return createTheme(themeObj, getOverRides(themeObj));
  }, [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export { TruestateThemeProvder };
