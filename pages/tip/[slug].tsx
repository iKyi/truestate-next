import { gql } from "@apollo/client";
import { Box, Grid } from "@mui/material";
import { Container } from "@mui/system";
import { NextPage } from "next";
import LayoutWrapper from "../../components/Reusable/Layout/LayoutWrapper";
import NuExistaRezultate from "../../components/Reusable/NuExistaRezultate";
import PageHeader from "../../components/Reusable/PageHeader";
import PropertyCard from "../../components/Reusable/PropertyComponents/PropertyCard";
import client from "../../lib/apolloClient";

const getItemData = async (slug: string) => {
  return client.query({
    query: gql`
      query getCategoryData($slug: String) {
        tips(filters: { slug: { eq: $slug } }) {
          data {
            attributes {
              name
            }
          }
        }
        proprietates(filters: { tip: { slug: { eq: $slug } } }) {
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

interface TipProps {
  proprietati: Record<string, any>[];
  tipName: string;
}

const Tip: NextPage<TipProps> = ({ proprietati, tipName }) => {
  return (
    <LayoutWrapper
      seo={{
        metaTitle: tipName,
      }}
      sx={{
        pb: 2,
      }}
    >
      <Container>
        <PageHeader title={tipName} />
        {proprietati.length === 0 ? <NuExistaRezultate /> : null}

        {proprietati.length && (
          <Grid container spacing={[2, 2, 4]} justifyContent="center">
            {proprietati.map((item) => {
              return (
                <Grid item key={item.attributes.slug} xs={6} md={4} lg={3}>
                  <PropertyCard data={item} key={item.attributes.name} />
                </Grid>
              );
            })}
          </Grid>
        )}
      </Container>
    </LayoutWrapper>
  );
};

export default Tip;

export async function getStaticPaths() {
  const resp = await client.query({
    query: gql`
      query getCategories {
        tips {
          data {
            attributes {
              slug
            }
          }
        }
      }
    `,
  });

  const tips = resp?.data?.tips?.data ?? [];

  return {
    paths: tips.map((category: any) => {
      const { attributes } = category;
      const { slug } = attributes;
      return {
        params: {
          slug,
        },
      };
    }),
    fallback: false,
    revalidate: 60,
  };
}

export async function getStaticProps({ params }: { params: any }) {
  const { slug } = params;

  const resp = await getItemData(slug);
  const tipName = resp.data.tips.data?.[0].attributes?.name ?? "";

  return {
    props: {
      proprietati: resp?.data.proprietates?.data ?? [],
      tipName: tipName,
    },
    revalidate: 60,
  };
}
