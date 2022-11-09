import { Box } from "@mui/material";
import { useContext } from "react";
import { getStrapiMedia } from "../../../lib/media";
import { GlobalContext } from "../../../pages/_app";

interface IHeroBox {
  heroImage: any;
}
const HeroBox: React.FC<IHeroBox> = ({ heroImage }) => {
  const context = useContext(GlobalContext);

  console.log(context);

  const imageUrl = getStrapiMedia(heroImage);

  return (
    <Box
      component="section"
      sx={{
        background: `url('${imageUrl}')`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        minHeight: [400, 400, "60vh"],
      }}
    ></Box>
  );
};

export default HeroBox;
