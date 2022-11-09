import { gql } from "@apollo/client";
import { Box, Grid } from "@mui/material";
import { NextPage } from "next";
import LayoutWrapper from "../../components/Reusable/Layout/LayoutWrapper";
import NuExistaRezultate from "../../components/Reusable/NuExistaRezultate";
import PropertyCard from "../../components/Reusable/PropertyComponents/PropertyCard";
import client from "../../lib/apolloClient";

const getItemData = async (slug: string) => {
  return client.query({
    query: gql`
      query getCategoryData($slug: String) {
        categories(filters: { slug: { eq: $slug } }) {
          data {
            attributes {
              name
            }
          }
        }
        proprietates(filters: { categorie: { slug: { eq: $slug } } }) {
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

interface CategorieProps {
  proprietati: Record<string, any>[];
  categoryName: string;
}

const Categorie: NextPage<CategorieProps> = ({ proprietati, categoryName }) => {
  return (
    <LayoutWrapper
      seo={{
        metaTitle: categoryName,
      }}
    >
      {proprietati.length === 0 ? <NuExistaRezultate /> : null}

      {proprietati.length && (
        <Box
          sx={{
            mt: 20,
          }}
        >
          <Grid container>
            {proprietati.map((item) => {
              return <PropertyCard data={item} key={item.attributes.name} />;
            })}
          </Grid>
        </Box>
      )}
    </LayoutWrapper>
  );
};

export default Categorie;

export async function getStaticPaths() {
  const resp = await client.query({
    query: gql`
      query getCategories {
        categories {
          data {
            attributes {
              name
              slug
            }
          }
        }
      }
    `,
  });

  const categories = resp?.data?.categories?.data ?? [];

  return {
    paths: categories.map((category: any) => {
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
  const catName = resp.data.categories.data?.[0].attributes?.name ?? "";

  return {
    props: {
      proprietati: resp?.data.proprietates?.data ?? [],
      categoryName: catName,
    },
    revalidate: 60,
  };
}
