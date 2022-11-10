import {
  EmailOutlined,
  Phone,
  PhoneAndroidOutlined,
  PhoneCallback,
} from "@mui/icons-material";
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
import { centerFlex } from "../../../utils/sxUtils";
import CommonIcon from "../Icons/CommonIcon";

export type AppFooterPropsType = {
  children?: any;
};
const AppFooter: React.FC<AppFooterPropsType> = ({ children }) => {
  const {
    socialLinks,
    logoWhite,
    footerDisclamer,
    footerContactTitle,
    contactEntries,
  } = useContext(GlobalContext);
  const Mobile = useIsMobile();

  // *************** RENDER *************** //
  return (
    <Box
      component="footer"
      sx={{
        marginTop: "auto",
        paddingTop: 2,
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
                sm={6}
                md={4}
                sx={{
                  textAlign: Mobile ? "center" : "left",
                }}
              >
                {logoWhite && logoWhite.data && (
                  <Box
                    component={Link}
                    href="/"
                    sx={{
                      display: "block",
                      mb: 1,
                      mx: Mobile ? "auto" : undefined,
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

            {contactEntries.length > 0 && (
              <Grid item xs={12} sm={6} md={4}>
                <Box
                  sx={{
                    color: "#fff",
                    pt: 3,
                    textAlign: "center",
                  }}
                >
                  {footerContactTitle && (
                    <Typography
                      component="div"
                      sx={{
                        fontSize: "1.35rem",
                        mb: 2,
                      }}
                    >
                      {footerContactTitle}
                    </Typography>
                  )}
                  <Box
                    sx={{
                      ...centerFlex,
                      gap: "10px",
                    }}
                  >
                    {contactEntries.map((item: any) => {
                      const { nume, email, telefon, titlu } = item ?? {};
                      return (
                        <Box key={nume}>
                          <Typography component="div">{nume}</Typography>
                          {titlu && (
                            <Typography
                              component="div"
                              sx={{
                                fontSize: "0.85rem",
                              }}
                            >
                              {titlu}
                            </Typography>
                          )}
                          <Box
                            sx={{
                              gap: "5px",
                              ...centerFlex,
                            }}
                          >
                            {telefon && (
                              <IconButton
                                LinkComponent={MuiLinkDefault}
                                aria-label="phone link"
                                href={`tel:+${telefon}`}
                                sx={{
                                  color: "#fff",
                                  display: "block",
                                  mb: 0.3,
                                }}
                              >
                                <Phone />
                              </IconButton>
                            )}
                            {email && (
                              <IconButton
                                LinkComponent={MuiLinkDefault}
                                aria-label="phone link"
                                href={`mailto:${email}`}
                                sx={{
                                  color: "#fff",
                                  display: "block",
                                  mb: 0.3,
                                }}
                              >
                                <EmailOutlined />
                              </IconButton>
                            )}
                          </Box>
                        </Box>
                      );
                    })}
                  </Box>
                </Box>
              </Grid>
            )}

            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              sx={{
                display: "flex",
                justifyContent: Mobile ? "center" : "flex-end",
                alignItems: "center",
              }}
            >
              <Stack
                sx={{
                  flexDirection: Mobile ? "row" : "column",
                  gap: 2,
                  alignItems: "center",
                }}
              >
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
                            borderColor: "secondary.light",
                            color: "secondary.light",
                          },
                        }}
                      >
                        <CommonIcon icon={key} />
                      </IconButton>
                    );
                  })}
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default AppFooter;
