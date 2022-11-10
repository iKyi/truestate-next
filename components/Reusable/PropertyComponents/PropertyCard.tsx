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
        borderColor: "primary.light",
        overflow: "hidden",
        boxShadow: "0 0px 15px 0px rgba(0,0,0,0.15)",
        ".imageBox": {
          transition: "all 0.6s ease-in-out",
          backgroundSize: "110% auto",
          backgroundPosition: "50% 50%",
        },
        "&:hover": {
          ".imageBox": {
            backgroundSize: "130% auto",
            backgroundPosition: "50% 100%",
          },
        },
      }}
    >
      <CardActionArea
        component={Link}
        href={url}
        className="imageBox"
        sx={{
          backgroundColor: "#000",
          background: `url('${primaryImage}')`,
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
          <Box>
            <MUILink
              component={Link}
              href={url}
              sx={{
                fontWeight: 700,
                fontSize: "1.15rem",
                overflow: "hidden",
                textOverflow: "ellipsis",
                "&:hover": {
                  color: "secondary.light",
                },
              }}
              aria-label={`${titlu} url`}
            >
              {titlu}
            </MUILink>
            {descriere && (
              <Box
                sx={{
                  lineHeight: "1.1",
                }}
              >
                <MarkdownParser>{descriere}</MarkdownParser>
              </Box>
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              fontSize: "0.9rem",
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
