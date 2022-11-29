import { Box, SxProps, Tooltip } from "@mui/material";
import { CSSProperties } from "react";
import { AspectRatioOutlined } from "@mui/icons-material";
import {
  centerFlex,
  propertyMargin,
  propertyFont,
} from "../../../../utils/sxUtils";
import { ICON_COMPONENTS } from "../../../../constants/iconComponents";

interface ISuprafata {
  suprafata?: number;
  sx?: SxProps;
}
const Suprafata: React.FC<ISuprafata> = ({ sx, suprafata }) => {
  if (!suprafata) return null;
  return (
    <Tooltip title={`Suprafata ${suprafata} MP`}>
      <Box
        sx={{
          ...(centerFlex as CSSProperties),
          ...(sx as CSSProperties),
          display: "inline-flex",
          ...(propertyFont as CSSProperties),
          fontSize: "inherit",
        }}
      >
        <ICON_COMPONENTS.SUPRAFATA
          sx={{
            ...propertyMargin,
          }}
          fontSize="inherit"
        />
        {suprafata} MP
      </Box>
    </Tooltip>
  );
};

export default Suprafata;
