import { Box, useMediaQuery } from "@mui/material";
import useIsMobile from "../../../hooks/useIsMobile";
import AppFooter from "./Footer";
import Header from "./Header";

export type LayoutWrapperPropsType = {
  children?: any;
  seo: Record<any, any>;
};

const LayoutWrapper: React.VFC<LayoutWrapperPropsType> = ({
  children,
  seo,
}) => {
  const Mobile = useIsMobile();
  // *************** RENDER *************** //
  return (
    <Box
      sx={{
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header seo={seo} />
      {children}
      <AppFooter />
    </Box>
  );
};

export default LayoutWrapper;
