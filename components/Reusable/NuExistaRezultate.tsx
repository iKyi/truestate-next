import { Box, Typography, Button } from "@mui/material";
import { Stack } from "@mui/system";
import Link from "next/link";
import { centerFlex } from "../../utils/sxUtils";

interface INuExistaRezultate {}
const NuExistaRezultate: React.FC<INuExistaRezultate> = () => {
  return (
    <Box
      sx={{
        minHeight: "50vh",
        ...centerFlex,
      }}
    >
      <Box
        sx={{
          width: "500px",
          maxWidth: "100%",
          p: 1,
        }}
      >
        <Stack>
          <Typography
            variant="h1"
            sx={{
              fontSize: "24px",
            }}
          >
            Nu exista rezultate pentru cautarea ta.
          </Typography>
          <Button
            component={Link}
            href="/"
            color="secondary"
            variant="contained"
            sx={{ mt: 2 }}
          >
            Inapoi
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default NuExistaRezultate;
