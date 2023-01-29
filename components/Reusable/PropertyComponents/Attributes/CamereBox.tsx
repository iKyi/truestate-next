import { Box, SxProps, Tooltip, Theme } from "@mui/material";

import {
  centerFlex,
  propertyFont,
  propertyMargin,
} from "../../../../utils/sxUtils";
import { CSSProperties } from "react";
import { ICON_COMPONENTS } from "../../../../constants/iconComponents";

interface ICamereBox {
  camere?: number;
  sx?: SxProps;
}
const CamereBox: React.FC<ICamereBox> = ({ camere, sx }) => {
  const styles: SxProps<Theme> = {
    ...(centerFlex as CSSProperties),
    ...(sx as CSSProperties),
    ...(propertyFont as CSSProperties),
    display: "inline-flex",
    fontSize: "inherit",
  };

  if (!camere) {
    return null;
  }
  return (
    <Tooltip title={`${camere} camere`}>
      <Box sx={styles}>
        <ICON_COMPONENTS.CAMERE
          sx={{
            ...propertyMargin,
          }}
          fontSize="inherit"
        />
        {camere}
      </Box>
    </Tooltip>
  );
};

export default CamereBox;
