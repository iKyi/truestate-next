import { Box, Link } from "@mui/material";

interface ICategorieBox {
  data?: {
    data?: {
      attributes?: {
        name: string;
        slug: string;
        color: string;
      };
    };
  };
}
const CategorieBox: React.FC<ICategorieBox> = ({ data }) => {
  const { name, color } = data?.data?.attributes ?? {};

  return (
    <Box
      sx={{
        textAlign: "center",
        textDecoration: "none",
        fontSize: "0.86rem",
        display: "block",
        color: "#fff",
        bgcolor: color,
      }}
    >
      {name}
    </Box>
  );
};

export default CategorieBox;
