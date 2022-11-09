import { Box, Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { GlobalContext } from "../../../pages/_app";
import HomeSection from "../../Reusable/HomeSection";

interface ICategoriiBox {}
const CategoriiBox: React.FC<ICategoriiBox> = () => {
  const { push } = useRouter();
  const { categories } = useContext(GlobalContext);

  const handleChipClick = (slug: string) => {
    push(`/categorii/${slug}`);
  };

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
          const { name, slug } = item;
          return (
            <Button key={name} component={Link} href={`categorie/${slug}`}>
              {name}
            </Button>
          );
        })}
      </Box>
    </HomeSection>
  );
};

export default CategoriiBox;
