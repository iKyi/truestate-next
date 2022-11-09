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
import Link from "next/link";
import { useContext } from "react";
import useIsMobile from "../../../hooks/useIsMobile";
import { getStrapiMedia } from "../../../lib/media";
import { GlobalContext } from "../../../pages/_app";
import CommonIcon from "../Icons/CommonIcon";

export type AppFooterPropsType = {
  children?: any;
};
const AppFooter: React.FC<AppFooterPropsType> = ({ children }) => {
  const { socialLinks, logoWhite, footerDisclamer } = useContext(GlobalContext);
  const Mobile = useIsMobile();
  // *************** RENDER *************** //
  return (
    <Box
      component="footer"
      sx={{
        marginTop: "auto",
        paddingTop: 5,
        textAlign: "center",
        background: `linear-gradient(336deg, rgba(3,3,5,1) 0%, rgba(28,48,33,1) 100%)`,
      }}
    >
      <Container>
        <Box
          sx={{
            py: 2.5,
          }}
        >
          <Grid container columnSpacing={Mobile ? 0 : 4.5}>
            {footerDisclamer && (
              <Grid
                item
                xs={12}
                md={4}
                sx={{
                  textAlign: "left",
                }}
              >
                {logoWhite && logoWhite.data && (
                  <Box
                    component={Link}
                    href="/"
                    sx={{
                      display: "block",
                      mb: 3,
                      width: "200px",
                      height: "150px",
                      maxWidth: "100%",
                      position: "relative",
                      background: `url('${getStrapiMedia(logoWhite)}')`,
                      backgroundSize: "100% auto",
                      backgroundPosition: "center center",
                      backgroundRepeat: "no-repeat",
                    }}
                  ></Box>
                )}
                <Typography
                  sx={{
                    color: "#fff",
                  }}
                >
                  {footerDisclamer}
                </Typography>
              </Grid>
            )}

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
