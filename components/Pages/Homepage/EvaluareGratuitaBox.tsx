import { Box, Typography, Grid } from "@mui/material";
import Image from "next/image";
import { getStrapiMedia } from "../../../lib/media";
import { centerFlex } from "../../../utils/sxUtils";
import HomeSection from "../../Reusable/HomeSection";
import MarkdownParser from "../../Reusable/MarkdownParser";

const getImageData = (image: any) => {
  const imageUrl = getStrapiMedia(image);

  if (!imageUrl) return null;
  return {
    url: imageUrl,
    width: image.data.attributes.width,
    height: image.data.attributes.height,
  };
};

interface IEvaluareGratuitaBox {
  text?: string;
  image: any;
}
const EvaluareGratuitaBox: React.FC<IEvaluareGratuitaBox> = ({
  text,
  image,
}) => {
  const imageObj = getImageData(image);

  if (!text) {
    return null;
  }
  return (
    <HomeSection title="Evaluare gratuita">
      <Grid container spacing={[2, 2, 4]}>
        <Grid
          item
          xs={12}
          md={8}
          sx={{
            ...centerFlex,
          }}
        >
          <MarkdownParser>{text}</MarkdownParser>
        </Grid>
        <Grid item xs={12} md={4}>
          <Image
            src={imageObj?.url}
            width={imageObj?.width}
            height={imageObj?.height}
            alt="real estate broker graphic"
            priority
            style={{
              width: "100%",
              height: "auto",
            }}
          />
        </Grid>
      </Grid>
    </HomeSection>
  );
};

export default EvaluareGratuitaBox;
