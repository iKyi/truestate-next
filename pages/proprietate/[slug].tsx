import { gql } from "@apollo/client";
import {
  Box,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
} from "@mui/material";
import { Container } from "@mui/system";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
import ProprietateSlider from "../../components/Pages/ProprietatePage/ProprietateSlider";
import LayoutWrapper from "../../components/Reusable/Layout/LayoutWrapper";
import MarkdownParser from "../../components/Reusable/MarkdownParser";
import { ICON_COMPONENTS } from "../../constants/iconComponents";
import client from "../../lib/apolloClient";
import formatCurrency from "../../utils/formatCurrency";
import getPrimaryImage from "../../utils/getPrimaryImage";
import Link from "next/link";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { LatLngExpression, Map } from "leaflet";
import AgentBox from "../../components/Reusable/PropertyComponents/AgentBox";

const getItemData = async (slug: string) => {
  return client.query({
    query: gql`
      query getPropertyData($slug: String) {
        proprietates(filters: { slug: { eq: $slug } }) {
          data {
            attributes {
              titlu
              descriere
              slug
              suprafata
              vandut
              agent {
                data {
                  attributes {
                    nume
                    telefon
                    email
                  }
                }
              }
              camere
              locatieHarta {
                latitudine
                longitudine
              }
              tip {
                data {
                  attributes {
                    name
                    slug
                  }
                }
              }
              de {
                data {
                  attributes {
                    name
                    slug
                  }
                }
              }
              categorie {
                data {
                  attributes {
                    name
                    slug
                    color
                  }
                }
              }
              imagini {
                imagini {
                  data {
                    attributes {
                      url
                    }
                  }
                }
                imaginePrincipala {
                  data {
                    attributes {
                      url
                    }
                  }
                }
              }
              etaj
              anConstructie
              pret
            }
          }
        }
      }
    `,
    variables: {
      slug: slug,
    },
  });
};

interface IProprietate {
  data: any;
}
const Proprietate: NextPage<IProprietate> = ({ data }) => {
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
    locatieHarta,
    camere,
    agent,
    vandut,
  } = data?.proprietates?.data?.[0]?.attributes ?? {};
  const primaryImage = getPrimaryImage(imagini);
  const { latitudine, longitudine } = locatieHarta ?? {};

  const Map = dynamic(
    () => import("../../components/Reusable/ProprietatePageMap"), // replace '@components/map' with your component's location
    {
      loading: () => <p>A map is loading</p>,
      ssr: false, // This line is important. It's what prevents server-side render
    }
  );

  const imagesArray = useMemo(() => {
    return imagini?.imagini?.data?.map((item: any) => {
      return item.attributes.url;
    });
  }, [imagini]);

  const categorieData = categorie?.data?.attributes ?? null;
  const tipData = tip?.data?.attributes ?? null;
  const agentData = agent?.data?.attributes;

  return (
    <LayoutWrapper
      seo={{
        metaTitle: titlu,
        shareImage: primaryImage,
      }}
    >
      <Container
        sx={{
          py: [3, 3, 5],
        }}
      >
        <Grid container spacing={[2, 2, 4]}>
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: "10px",
              }}
            >
              <Typography
                variant="h1"
                aria-label="Nume Articol"
                sx={{
                  fontSize: [18, 18, 24],
                  mb: [2, 2, 3],
                }}
              >
                {titlu}
                {vandut && (
                  <Typography
                    component="span"
                    sx={{ fontSize: "inherit", color: "error.main" }}
                  >{`(Vandut)`}</Typography>
                )}
              </Typography>
              {pret && (
                <Box
                  sx={{
                    fontSize: ["1.2rem", "1.2rem", "1.8rem"],
                    fontWeight: "700",
                    textDecoration: vandut ? "line-through" : undefined,
                  }}
                  aria-label="Pret Proprietate"
                >
                  {formatCurrency(pret)}
                </Box>
              )}
            </Box>
          </Grid>
          <Grid item xs={12} lg={6}>
            {descriere && (
              <Box>
                <MarkdownParser>{descriere}</MarkdownParser>
              </Box>
            )}
            <List>
              {camere && (
                <ListItem>
                  <ListItemIcon>
                    <ICON_COMPONENTS.CAMERE />
                  </ListItemIcon>
                  <ListItemText>Camere: {camere}</ListItemText>
                </ListItem>
              )}
              {suprafata && (
                <ListItem>
                  <ListItemIcon>
                    <ICON_COMPONENTS.SUPRAFATA />
                  </ListItemIcon>
                  <ListItemText>Suprafata: {suprafata} mp</ListItemText>
                </ListItem>
              )}
              {etaj && (
                <ListItem>
                  <ListItemIcon>
                    <ICON_COMPONENTS.ETAJ />
                  </ListItemIcon>
                  <ListItemText>Etaj: {etaj}</ListItemText>
                </ListItem>
              )}
              {anConstructie && (
                <ListItem>
                  <ListItemIcon>
                    <ICON_COMPONENTS.AN_CONSTRUCTIE />
                  </ListItemIcon>
                  <ListItemText>An Constructie: {anConstructie}</ListItemText>
                </ListItem>
              )}
            </List>
            {agentData && <AgentBox agentData={agentData} />}
          </Grid>
          <Grid item xs={12} lg={6}>
            <ProprietateSlider images={imagesArray} vandut={vandut} />
          </Grid>
          {latitudine && longitudine && (
            <Grid item xs={12}>
              <Map lat={latitudine} long={longitudine} />
            </Grid>
          )}

          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: "6px",
              }}
            >
              {categorieData && (
                <Button
                  component={Link}
                  href={`/categorie/${categorieData.slug}`}
                  sx={{
                    backgroundColor: `${categorieData.color}`,
                    color: "#fff",
                    "&:hover": {
                      bgcolor: "primary.dark",
                    },
                  }}
                >
                  {categorieData.name}
                </Button>
              )}
              {tipData && (
                <Button
                  component={Link}
                  href={`/tip/${tipData.slug}`}
                  sx={{
                    backgroundColor: `primary.main`,
                    color: "#fff",
                    "&:hover": {
                      bgcolor: "primary.dark",
                    },
                  }}
                >
                  {tipData.name}
                </Button>
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </LayoutWrapper>
  );
};

export async function getStaticPaths() {
  const resp = await client.query({
    query: gql`
      query getProprietati {
        proprietates {
          data {
            attributes {
              slug
            }
          }
        }
      }
    `,
  });

  const proprietati = resp?.data?.proprietates?.data ?? [];

  return {
    paths: proprietati.map((category: any) => {
      const { attributes } = category;
      const { slug } = attributes;
      return {
        params: {
          slug,
        },
      };
    }),
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }: { params: any }) {
  const { slug } = params;
  const resp = await getItemData(slug);
  return {
    props: {
      data: resp?.data,
    },
    revalidate: 60,
  };
}

export default Proprietate;
