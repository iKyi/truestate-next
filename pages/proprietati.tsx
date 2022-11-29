import { gql } from "@apollo/client";
import { Box, Grid } from "@mui/material";
import { Container } from "@mui/system";
import { NextPage } from "next";
import LayoutWrapper from "../components/Reusable/Layout/LayoutWrapper";
import PageHeader from "../components/Reusable/PageHeader";
import PropertyCard from "../components/Reusable/PropertyComponents/PropertyCard";
import client from "../lib/apolloClient";

interface Iproprietati {
  pageData: any;
  proprietati: Record<string, any>[];
}
const proprietati: NextPage<Iproprietati> = ({ pageData, proprietati }) => {
  const { seo, pageHeader } = pageData ?? {};
  return (
    <LayoutWrapper
      seo={seo}
      sx={{
        pb: 2,
      }}
    >
      <Container>
        <PageHeader {...pageHeader} />
        <Grid container spacing={[2, 2, 4]} justifyContent="center">
          {proprietati.map((item) => {
            const { slug } = item?.attributes ?? {};
            return (
              <Grid item key={slug} xs={12} sm={6} md={4} lg={3}>
                <PropertyCard data={item} />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </LayoutWrapper>
  );
};

export async function getStaticProps() {
  //Run API calls in parallel
  const [response] = await Promise.all([
    client.query({
      query: gql`
        query getProprietatiData {
          proprietatiPage {
            data {
              attributes {
                pageHeader {
                  title
                  description
                }
                seo {
                  metaTitle
                  metaDescription
                  shareImage {
                    data {
                      attributes {
                        url
                      }
                    }
                  }
                }
              }
            }
          }
          proprietates {
            data {
              attributes {
                titlu
                descriere
                slug
                suprafata
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
    }),
  ]);

  return {
    props: {
      pageData: response?.data?.proprietatiPage.data?.attributes,
      proprietati: response?.data?.proprietates.data,
    },
    revalidate: 60,
  };
}

export default proprietati;
