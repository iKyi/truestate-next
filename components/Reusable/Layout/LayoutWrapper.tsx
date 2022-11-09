import { Box, SxProps, Theme } from "@mui/material";
import useIsMobile from "../../../hooks/useIsMobile";
import AppFooter from "./Footer";
import Header from "./Header";

export type LayoutWrapperPropsType = {
  children?: any;
  seo: Record<any, any>;
  noSpacing?: boolean;
  sx?: SxProps<Theme>;
};

const LayoutWrapper: React.VFC<LayoutWrapperPropsType> = ({
  children,
  seo,
  noSpacing,
  sx,
}) => {
  // *************** RENDER *************** //
  return (
    <Box
      sx={{
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
        paddingTop: !noSpacing ? "100px" : undefined,
      }}
    >
      <Header seo={seo} />
      <Box sx={sx}>{children}</Box>
      <AppFooter />
    </Box>
  );
};

export default LayoutWrapper;
