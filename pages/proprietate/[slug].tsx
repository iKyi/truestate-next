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
import { useMemo } from "react";
import ProprietateSlider from "../../components/Pages/ProprietatePage/ProprietateSlider";
import LayoutWrapper from "../../components/Reusable/Layout/LayoutWrapper";
import MarkdownParser from "../../components/Reusable/MarkdownParser";
import { ICON_COMPONENTS } from "../../constants/iconComponents";
import client from "../../lib/apolloClient";
import formatCurrency from "../../utils/formatCurrency";
import getPrimaryImage from "../../utils/getPrimaryImage";
import Link from "next/link";
import AgentBox from "../../components/Reusable/PropertyComponents/AgentBox";
import getBooleanValue from "../../utils/getBooleanValue";
import VedereGetter from "../../utils/attributes/VedereGetter";
import clasaEnergeticaGetter from "../../utils/attributes/clasaEnergeticaGetter";
import VilaBox from "../../components/Pages/ProprietatePage/VilaBox";
import useIsMobile from "../../hooks/useIsMobile";

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
              confort
              impartire
              vedere
              complexRezidential
              balcoane
              terase
              parcari
              garaje
              bucatarii
              bai
              cadastru
              intabulare
              riscSeismic
              legeaUnuUnuDoi
              ipoteca
              clasaEnergetica
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
              etajeTotal
              anConstructie
              pret
              vilaBox {
                esteVila
                geamuriTermopan
                apa
                garaj
                pivnita
                incalzireCentrala
                renovatRecent
                detectorGaze
                termoIzolatie
                curentElectric
                gradina
                acoperisTigla
                gresie
                faianta
                planseeBeton
                consolidata
                wcServiciu
                spatiuDepozitare
                cabluTV
                internet
                internetFibraOptica
                pod
                parchet
                gaz
                canalizare
                parcareInCurte
                aerConditionat
                sistemAlarma
                sistemIrigatie
                deschidere
                suprafataUtila
                suprafataTeren
                suprafataConstruita
                suprafataDesfasurata
                amprentaLaSol
                detectorIncendiu
              }
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
    confort,
    impartire,
    vedere,
    etajeTotal,
    complexRezidential,
    balcoane,
    terase,
    parcari,
    garaje,
    bucatarii,
    bai,
    cadastru,
    intabulare,
    riscSeismic,
    legeaUnuUnuDoi,
    ipoteca,
    clasaEnergetica,
    vilaBox,
  } = data?.proprietates?.data?.[0]?.attributes ?? {};
  const primaryImage = getPrimaryImage(imagini);
  const { latitudine, longitudine } = locatieHarta ?? {};
  const isMobile = useIsMobile();

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
          <Grid
            item
            xs={12}
            sx={{
              order: 1,
            }}
          >
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
                    whiteSpace: "nowrap",
                  }}
                  aria-label="Pret Proprietate"
                >
                  {formatCurrency(pret)}
                </Box>
              )}
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            lg={6}
            sx={{
              order: isMobile ? 3 : 2,
            }}
          >
            {descriere && (
              <Box>
                <MarkdownParser>{descriere}</MarkdownParser>
              </Box>
            )}
            <List
              disablePadding
              sx={{
                my: [2, 2, 4],
                li: {
                  py: "1px",
                },
              }}
            >
              {camere && (
                <ListItem>
                  <ListItemIcon>
                    <ICON_COMPONENTS.CAMERE />
                  </ListItemIcon>
                  <ListItemText>Camere: {camere}</ListItemText>
                </ListItem>
              )}
              {suprafata && suprafata > 0 ? (
                <ListItem>
                  <ListItemIcon>
                    <ICON_COMPONENTS.SUPRAFATA />
                  </ListItemIcon>
                  <ListItemText>Suprafata: {suprafata} mp</ListItemText>
                </ListItem>
              ) : null}
              {etaj && etaj > 0 ? (
                <ListItem>
                  <ListItemIcon>
                    <ICON_COMPONENTS.ETAJ />
                  </ListItemIcon>
                  <ListItemText>Etaj: {etaj}</ListItemText>
                </ListItem>
              ) : null}
              {etajeTotal && (
                <ListItem>
                  <ListItemIcon>
                    <ICON_COMPONENTS.ETAJ />
                  </ListItemIcon>
                  <ListItemText>Etaje total: {etajeTotal}</ListItemText>
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

              {confort && confort > 0 ? (
                <ListItem>
                  <ListItemIcon>
                    <ICON_COMPONENTS.BALCONY />
                  </ListItemIcon>
                  <ListItemText>Balcoane: {balcoane}</ListItemText>
                </ListItem>
              ) : null}
              {terase && terase > 0 ? (
                <ListItem>
                  <ListItemIcon>
                    <ICON_COMPONENTS.BALCONY />
                  </ListItemIcon>
                  <ListItemText>Terase: {terase}</ListItemText>
                </ListItem>
              ) : null}
              {parcari && parcari > 0 ? (
                <ListItem>
                  <ListItemIcon>
                    <ICON_COMPONENTS.GARAJ />
                  </ListItemIcon>
                  <ListItemText>Parcari: {parcari}</ListItemText>
                </ListItem>
              ) : null}
              {garaje && garaje > 0 ? (
                <ListItem>
                  <ListItemIcon>
                    <ICON_COMPONENTS.GARAJ />
                  </ListItemIcon>
                  <ListItemText>Garaje: {garaje}</ListItemText>
                </ListItem>
              ) : null}
              {bucatarii && bucatarii > 0 ? (
                <ListItem>
                  <ListItemIcon>
                    <ICON_COMPONENTS.BUCATARIE />
                  </ListItemIcon>
                  <ListItemText>Bucatarii: {bucatarii}</ListItemText>
                </ListItem>
              ) : null}
              {bai && bai > 0 ? (
                <ListItem>
                  <ListItemIcon>
                    <ICON_COMPONENTS.BAIE />
                  </ListItemIcon>
                  <ListItemText>Bai: {bai}</ListItemText>
                </ListItem>
              ) : null}
              {vedere && (
                <ListItem>
                  <ListItemIcon>
                    <ICON_COMPONENTS.ORIENTARE />
                  </ListItemIcon>
                  <ListItemText>Orientare: {VedereGetter(vedere)}</ListItemText>
                </ListItem>
              )}
              {impartire && (
                <ListItem>
                  <ListItemIcon>
                    <ICON_COMPONENTS.IMPARTIRE />
                  </ListItemIcon>
                  <ListItemText>
                    Impartire:{" "}
                    {impartire === "Open_space" ? "Open space" : impartire}
                  </ListItemText>
                </ListItem>
              )}
              {clasaEnergetica && (
                <ListItem>
                  <ListItemIcon>
                    <ICON_COMPONENTS.CLASAENERG />
                  </ListItemIcon>
                  <ListItemText>
                    Clasa energetica: {clasaEnergeticaGetter(clasaEnergetica)}
                  </ListItemText>
                </ListItem>
              )}

              {complexRezidential !== undefined && (
                <ListItem>
                  <ListItemIcon>
                    <ICON_COMPONENTS.COMPLEX />
                  </ListItemIcon>
                  <ListItemText>
                    Complex Rezidential: {getBooleanValue(complexRezidential)}
                  </ListItemText>
                </ListItem>
              )}
              {cadastru !== undefined && (
                <ListItem>
                  <ListItemIcon>
                    <ICON_COMPONENTS.CADASTRU />
                  </ListItemIcon>
                  <ListItemText>
                    Cadastru: {getBooleanValue(cadastru)}
                  </ListItemText>
                </ListItem>
              )}
              {intabulare !== undefined && (
                <ListItem>
                  <ListItemIcon>
                    <ICON_COMPONENTS.CADASTRU />
                  </ListItemIcon>
                  <ListItemText>
                    Intabulare: {getBooleanValue(intabulare)}
                  </ListItemText>
                </ListItem>
              )}
              {riscSeismic !== undefined && (
                <ListItem>
                  <ListItemIcon>
                    <ICON_COMPONENTS.RISC />
                  </ListItemIcon>
                  <ListItemText>
                    Risc Seismic: {getBooleanValue(riscSeismic)}
                  </ListItemText>
                </ListItem>
              )}
              {legeaUnuUnuDoi !== undefined && (
                <ListItem>
                  <ListItemIcon>
                    <ICON_COMPONENTS.UNUUNUDOI />
                  </ListItemIcon>
                  <ListItemText>
                    Legea 112: {getBooleanValue(legeaUnuUnuDoi)}
                  </ListItemText>
                </ListItem>
              )}
              {ipoteca !== undefined && (
                <ListItem>
                  <ListItemIcon>
                    <ICON_COMPONENTS.IPOTECA />
                  </ListItemIcon>
                  <ListItemText>
                    Ipoteca: {getBooleanValue(ipoteca)}
                  </ListItemText>
                </ListItem>
              )}
            </List>

            {agentData && <AgentBox agentData={agentData} />}
          </Grid>
          <Grid
            item
            xs={12}
            lg={6}
            sx={{
              order: isMobile ? 2 : 3,
            }}
          >
            <ProprietateSlider images={imagesArray} vandut={vandut} />
          </Grid>
          {vilaBox && vilaBox.esteVila ? (
            <Grid item xs={12}>
              <VilaBox vilaData={vilaBox} />
            </Grid>
          ) : null}
          {latitudine && longitudine && (
            <Grid item xs={12}>
              <Map lat={latitudine} long={longitudine} />
            </Grid>
          )}

          <Grid
            item
            xs={12}
            sx={{
              order: 6,
            }}
          >
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
