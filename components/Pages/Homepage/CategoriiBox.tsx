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
          justifyContent: "center",
          gap: "10px",
        }}
      >
        {categories
          .sort((a: any, b: any) => (a.order > b.order ? 1 : -1))
          .map((item: Record<any, any>) => {
            const { name, slug, color } = item;
            return (
              <Button
                key={name}
                component={Link}
                href={`categorie/${slug}`}
                sx={{
                  backgroundColor: color,
                  color: "#fff",
                  minWidth: "110px",
                  borderRadius: "4px",
                  "&:hover": {
                    color: "#fff",
                    borderColor: "primary.dark",
                    bgcolor: "primary.main",
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
