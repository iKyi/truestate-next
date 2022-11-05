import {
  Box,
  CardActionArea,
  Chip,
  Container,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
  Link as MuiLinkDefault,
  useMediaQuery,
} from "@mui/material";
import { DateTime } from "luxon";
import Image from "next/image";
import { useContext } from "react";
import useIsMobile from "../../../hooks/useIsMobile";
import { getStrapiMedia } from "../../../lib/media";
import { GlobalContext } from "../../../pages/_app";
import CommonIcon from "../Icons/CommonIcon";

export type AppFooterPropsType = {
  children?: any;
};
const AppFooter: React.FC<AppFooterPropsType> = ({ children }) => {
  const { socialLinks } = useContext(GlobalContext);
  const Mobile = useIsMobile();
  // *************** RENDER *************** //
  return (
    <Box
      component="footer"
      sx={{
        marginTop: "auto",
        paddingTop: 5,
        textAlign: "center",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "secondary.main",
        backgroundBlendMode: "multiply",
      }}
    >
      <Container>
        <Box
          sx={{
            py: 2.5,
          }}
        >
          <Grid container columnSpacing={Mobile ? 0 : 4.5}>
            <Grid item xs={12}>
              {/* {logo && logo.data && (
                <Box
                  component={Link}
                  href="/"
                  sx={{
                    display: "block",
                    mb: 3,
                    width: "200px",
                    maxWidth: "100%",
                  }}
                >
                  <Image
                    src={getStrapiMedia(logo)}
                    height={logo.data.attributes.height}
                    width={logo.data.attributes.width}
                    layout="responsive"
                    alt="Sekko Logo"
                  />
                </Box>
              )} */}
            </Grid>
            {/* {footerDescription && (
              <Grid
                item
                xs={12}
                md={4}
                sx={{
                  textAlign: "left",
                }}
              >
                <Typography>{footerDescription}</Typography>
              </Grid>
            )} */}

            <Grid
              item
              xs={12}
              md={4}
              sx={{
                pt: Mobile ? 2 : 0,
                textAlign: "left",
              }}
            ></Grid>
            <Grid
              item
              xs={12}
              md={4}
              sx={{
                display: "flex",
                justifyContent: Mobile ? "center" : "flex-end",
                pt: Mobile ? 2 : 0,
              }}
            >
              <Stack spacing={2} direction={Mobile ? "row" : "column"}>
                {socialLinks &&
                  Object.keys(socialLinks).map((key: string) => {
                    const url = socialLinks[key];
                    return (
                      <IconButton
                        key={url}
                        color="primary"
                        component={MuiLinkDefault}
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${key} link button`}
                        sx={{
                          borderWidth: "1px",
                          borderStyle: "solid",
                          borderColor: "#fff",
                          color: "#fff",
                          "&:hover": {
                            borderColor: "primary.main",
                            color: "primary.main",
                          },
                        }}
                      >
                        <CommonIcon icon={key} />
                      </IconButton>
                    );
                  })}
              </Stack>
            </Grid>

            <Grid item xs={12} sx={{ textAlign: "center", py: 3 }}></Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default AppFooter;
