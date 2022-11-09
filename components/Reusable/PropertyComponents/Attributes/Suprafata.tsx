import { Box, SxProps, Tooltip } from "@mui/material";
import { CSSProperties } from "react";
import { AspectRatioOutlined } from "@mui/icons-material";
import {
  centerFlex,
  propertyMargin,
  propertyFont,
} from "../../../../utils/sxUtils";

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
        }}
      >
        <AspectRatioOutlined
          sx={{
            ...propertyMargin,
          }}
        />
        {suprafata} MP
      </Box>
    </Tooltip>
  );
};

export default Suprafata;
