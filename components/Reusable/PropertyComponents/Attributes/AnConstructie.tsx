import { Box, SxProps, Tooltip } from "@mui/material";
import { CalendarMonthRounded } from "@mui/icons-material";
import {
  centerFlex,
  propertyFont,
  propertyMargin,
} from "../../../../utils/sxUtils";
import { CSSProperties } from "react";

interface IAnConstructie {
  an?: number;
  sx?: SxProps;
}
const AnConstructie: React.FC<IAnConstructie> = ({ an, sx }) => {
  if (!an) {
    return null;
  }
  return (
    <Tooltip title={`An constrctie ${an}`}>
      <Box
        sx={{
          ...(centerFlex as CSSProperties),
          ...sx,
          display: "inline-flex",
          ...propertyFont,
        }}
      >
        <CalendarMonthRounded
          sx={{
            ...propertyMargin,
          }}
        />
        {an}
      </Box>
    </Tooltip>
  );
};

export default AnConstructie;
