import { Box, SxProps, Tooltip, Theme } from "@mui/material";
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
  const styles: SxProps<Theme> = {
    ...(centerFlex as CSSProperties),
    ...(sx as CSSProperties),
    ...(propertyFont as CSSProperties),
    display: "inline-flex",
  };

  if (!an) {
    return null;
  }
  return (
    <Tooltip title={`An constrctie ${an}`}>
      <Box sx={styles}>
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
