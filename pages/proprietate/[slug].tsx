import { gql } from "@apollo/client";
import { Box, Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { NextPage } from "next";
import { useMemo } from "react";
import ProprietateSlider from "../../components/Pages/ProprietatePage/ProprietateSlider";
import LayoutWrapper from "../../components/Reusable/Layout/LayoutWrapper";
import client from "../../lib/apolloClient";
import getPrimaryImage from "../../utils/getPrimaryImage";

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
  } = data?.proprietates?.data?.[0]?.attributes ?? {};
  const primaryImage = getPrimaryImage(imagini);

  const imagesArray = useMemo(() => {
    return imagini?.imagini?.data?.map((item: any) => {
      return item.attributes.url;
    });
  }, [imagini]);

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
          <Grid item xs={12} lg={6}>
            <Typography
              variant="h1"
              sx={{
                fontSize: [22, 22, 26],
              }}
            >
              {titlu}
            </Typography>
          </Grid>
          <Grid item xs={12} lg={6}>
            <ProprietateSlider images={imagesArray} />
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
    fallback: false,
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
