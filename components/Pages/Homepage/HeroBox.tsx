import { Box } from "@mui/material";
import { Container } from "@mui/system";
import { useContext } from "react";
import { getStrapiMedia } from "../../../lib/media";
import { GlobalContext } from "../../../pages/_app";
import { centerFlex } from "../../../utils/sxUtils";
import HeroSearchBox from "./HeroSearchBox";

interface IHeroBox {
  heroImage: any;
}
const HeroBox: React.FC<IHeroBox> = ({ heroImage }) => {
  // const context = useContext(GlobalContext);

  const imageUrl = getStrapiMedia(heroImage);

  return (
    <Box
      component="section"
      sx={{
        background: `url('${imageUrl}')`,
        backgroundSize: "cover",
        backgroundPosition: "center 70%",
        minHeight: [400, 400, "70vh"],
        position: "relative",
        ...centerFlex,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          height: "100%",
          width: "100%",
          backdropFilter: `blur(0px) grayscale(0%)`,
        }}
      />
      <Container
        sx={{
          position: "relative",
          zIndex: 2,
        }}
      >
        <Box
          sx={{
            mt: [0, 0, "84px"],
          }}
        >
          <HeroSearchBox />
        </Box>
      </Container>
    </Box>
  );
};

export default HeroBox;
