import { Box, SxProps, Tooltip, Theme } from "@mui/material";

import {
  centerFlex,
  propertyFont,
  propertyMargin,
} from "../../../../utils/sxUtils";
import { CSSProperties } from "react";
import { ICON_COMPONENTS } from "../../../../constants/iconComponents";

interface IAnConstructie {
  an?: number;
  sx?: SxProps;
}
const AnConstructie: React.FC<IAnConstructie> = ({ an, sx }) => {
  const styles: SxProps<Theme> = {
    ...(centerFlex as CSSProperties),
    ...(sx as CSSProperties),
    ...(propertyFont as CSSProperties),
    display: "inline-flex",
    fontSize: "inherit",
  };

  if (!an) {
    return null;
  }
  return (
    <Tooltip title={`An constrctie ${an}`}>
      <Box sx={styles}>
        <ICON_COMPONENTS.AN_CONSTRUCTIE
          sx={{
            ...propertyMargin,
          }}
          fontSize="inherit"
        />
        {an}
      </Box>
    </Tooltip>
  );
};

export default AnConstructie;
