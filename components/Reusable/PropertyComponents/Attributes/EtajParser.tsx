import { Box, SxProps, Tooltip } from "@mui/material";
import { StairsOutlined } from "@mui/icons-material";
import {
  centerFlex,
  propertyMargin,
  propertyFont,
} from "../../../../utils/sxUtils";
import { CSSProperties } from "react";

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
        }}
      >
        <StairsOutlined
          sx={{
            ...propertyMargin,
          }}
        />
        {etaj}
      </Box>
    </Tooltip>
  );
};

export default EtajParser;
