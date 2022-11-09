import {
  KeyboardArrowRightOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Link as MUILink,
  CardActionArea,
} from "@mui/material";
import { Stack } from "@mui/system";
import Link from "next/link";
import formatCurrency from "../../../utils/formatCurrency";
import getPrimaryImage from "../../../utils/getPrimaryImage";
import MarkdownParser from "../MarkdownParser";
import AnConstructie from "./Attributes/AnConstructie";
import CategorieBox from "./Attributes/CategorieBox";
import EtajParser from "./Attributes/EtajParser";
import Suprafata from "./Attributes/Suprafata";

interface IPropertyCard {
  data: Record<string, any>;
}
const PropertyCard: React.FC<IPropertyCard> = ({ data }) => {
  const { attributes } = data;
  const {
    titlu,
    descriere,
    slug,
    suprafata,
    tip,
    de,
    categorie,
    imagini,
    etaj,
    anConstructie,
    pret,
  } = attributes ?? {};

  const primaryImage = getPrimaryImage(imagini);

  const url = `/proprietate/${slug}`;

  return (
    <Box
      sx={{
        border: "1px solid",
        borderRadius: 1.5,
        borderColor: "primary.light",
        overflow: "hidden",
      }}
    >
      <CardActionArea
        component={Link}
        href={url}
        sx={{
          backgroundColor: "#000",
          background: `url('${primaryImage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          height: 180,
          position: "relative",
        }}
      ></CardActionArea>
      <Box
        sx={{
          p: [1, 1, 1.5],
        }}
      >
        <Stack spacing={[0.7, 0.7, 1]}>
          <MUILink
            component={Link}
            href={url}
            sx={{
              fontWeight: 700,
              fontSize: "1.15rem",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {titlu}
          </MUILink>
          {descriere && <MarkdownParser>{descriere}</MarkdownParser>}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            <AnConstructie an={anConstructie} />
            <EtajParser etaj={etaj} />
            <Suprafata suprafata={suprafata} />
          </Box>
        </Stack>
      </Box>

      <Button
        component={Link}
        href={url}
        variant="outlined"
        fullWidth
        sx={{
          borderRadius: 0,
          borderLeft: 0,
          borderRight: 0,
          "&:hover": {
            borderLeft: 0,
            borderRight: 0,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            color: "secondary.dark",
          }}
        >
          <Box
            sx={{
              fontWeight: 700,
              fontSize: "1.2rem",
              color: "inherit",
            }}
          >
            {formatCurrency(pret)}
          </Box>
          <KeyboardArrowRightOutlined fontSize="large" color="inherit" />
        </Box>
      </Button>

      <CategorieBox data={categorie} />
    </Box>
  );
};

export default PropertyCard;
