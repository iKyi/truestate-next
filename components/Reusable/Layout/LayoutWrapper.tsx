import { Box, useMediaQuery } from "@mui/material";
import useIsMobile from "../../../hooks/useIsMobile";
import AppFooter from "./Footer";
import Header from "./Header";

export type LayoutWrapperPropsType = {
  children?: any;
  seo: Record<any, any>;
  noSpacing?: boolean;
};

const LayoutWrapper: React.VFC<LayoutWrapperPropsType> = ({
  children,
  seo,
  noSpacing,
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
      {children}
      <AppFooter />
    </Box>
  );
};

export default LayoutWrapper;
