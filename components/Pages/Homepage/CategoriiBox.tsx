import { Box, Button } from "@mui/material";
import Link from "next/link";
import { useContext } from "react";
import { GlobalContext } from "../../../pages/_app";
import HomeSection from "../../Reusable/HomeSection";

interface ICategoriiBox {}
const CategoriiBox: React.FC<ICategoriiBox> = () => {
  const { categories } = useContext(GlobalContext);

  if (!categories) return null;
  return (
    <HomeSection title="Categoriile noastre">
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        {categories.map((item: Record<any, any>) => {
          const { name, slug, color } = item;
          return (
            <Button
              key={name}
              component={Link}
              href={`categorie/${slug}`}
              sx={{
                backgroundColor: color,
                color: "#fff",
                "&:hover": {
                  color: "primary.dark",
                  borderColor: "primary.dark",
                },
              }}
            >
              {name}
            </Button>
          );
        })}
      </Box>
    </HomeSection>
  );
};

export default CategoriiBox;
