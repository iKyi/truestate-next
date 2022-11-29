import { Box, SxProps, Tooltip } from "@mui/material";

import {
  centerFlex,
  propertyMargin,
  propertyFont,
} from "../../../../utils/sxUtils";
import { CSSProperties } from "react";
import { ICON_COMPONENTS } from "../../../../constants/iconComponents";

interface IEtajParser {
  etaj?: number;
  sx?: SxProps;
}
const EtajParser: React.FC<IEtajParser> = ({ etaj, sx }) => {
  if (!etaj) {
    return null;
  }
  return (
    <Tooltip title={`Etaj ${etaj}`}>
      <Box
        sx={{
          ...(centerFlex as CSSProperties),
          ...(sx as CSSProperties),
          ...(propertyFont as CSSProperties),
          display: "inline-flex",
          fontSize: "inherit",
        }}
      >
        <ICON_COMPONENTS.ETAJ
          sx={{
            ...propertyMargin,
          }}
          fontSize="inherit"
        />
        {etaj}
      </Box>
    </Tooltip>
  );
};

export default EtajParser;
