import { Box, Typography } from "@mui/material";

interface IServiciuEntryList {
  data: Record<any, any>;
}
const ServiciuEntryList: React.FC<IServiciuEntryList> = ({ data }) => {
  const { attributes } = data;
  const { descriere, titlu } = attributes ?? {};
  return (
    <Box
      sx={{
        p: 1,
      }}
    >
      <Typography
        component="div"
        sx={{
          fontWeight: 600,
        }}
      >
        {titlu}
      </Typography>
      <Typography
        component="div"
        sx={{
          fontSize: "0.93rem",
        }}
      >
        {descriere}
      </Typography>
    </Box>
  );
};

export default ServiciuEntryList;
