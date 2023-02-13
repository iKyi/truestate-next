import { gql, useQuery } from "@apollo/client";
import { Box, CircularProgress, Grid, Alert } from "@mui/material";
import { Container } from "@mui/system";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { useEffect, useState } from "react";
import HeroSearchBox from "../components/Pages/Homepage/HeroSearchBox";
import LayoutWrapper from "../components/Reusable/Layout/LayoutWrapper";
import PageHeader from "../components/Reusable/PageHeader";
import PropertyCard from "../components/Reusable/PropertyComponents/PropertyCard";
import client from "../lib/apolloClient";

const getCautaPageData = async () => {
  const resp = await client.query({
    query: gql`
      query getCautaPageData {
        cautaPage {
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
      }
    `,
  });
  return resp.data?.cautaPage?.data?.attributes;
};

const getQueryString = (data: ParsedUrlQuery) => {
  return gql`
    query GetSerchResults(
      $searchString: String
      $tip: String
      $de: String
      $localCat: String
    ) {
      proprietates(
        filters: {
          and: [
            {
              or: [
                { titlu: { containsi: $searchString } }
                { descriere: { containsi: $searchString } }
              ]
            }
            { tip: { slug: { eq: $tip } } }
            { de: { slug: { eq: $de } } }
            { categorie: { slug: { eq: $localCat } } }
          ]
        }
      ) {
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
  `;
};

interface ICauta {
  main: Record<any, any>;
}
const Cauta: NextPage<ICauta> = ({ main }) => {
  const { seo, pageHeader } = main ?? {};

  const [data, setData] = useState<null | any[]>(null);
  const [loading, setLoading] = useState(false);

  const { query } = useRouter();

  useEffect(() => {
    const { incl, cat, de, localCat } = query;

    setLoading(true);
    client
      .query({
        query: getQueryString(query),
        variables: {
          searchString: incl,
          tip: cat,
          de: de,
          localCat: localCat,
        },
      })
      .then((resp) => {
        setData(resp?.data?.proprietates?.data);
        setLoading(false);
      });
  }, [query]);

  return (
    <LayoutWrapper seo={seo}>
      <Container>
        <PageHeader {...pageHeader} />

        <HeroSearchBox />

        <Box
          sx={{
            my: [3, 3, 4],
          }}
        >
          {data && data.length > 0 && (
            <Box
              sx={{
                mb: 3,
                textAlign: "center",
              }}
            >
              {data.length} rezultate pentru cautare:
            </Box>
          )}
          {loading && <CircularProgress size={50} />}
          {data && data.length > 0 && (
            <Grid container spacing={[2, 2, 4]} justifyContent="center">
              {data.map((item) => {
                const { slug } = item?.attributes ?? {};
                return (
                  <Grid item key={slug} xs={12} sm={6} md={4} lg={3}>
                    <PropertyCard data={item} />
                  </Grid>
                );
              })}
            </Grid>
          )}
        </Box>

        {!loading && data && data.length === 0 ? (
          <Alert severity="info">
            Nu au fost gasite rezultate pentru cautarea efectuata.
          </Alert>
        ) : null}
      </Container>
    </LayoutWrapper>
  );
};

export async function getStaticProps() {
  //Run API calls in parallel
  const [main] = await Promise.all([getCautaPageData()]);

  return {
    props: {
      main: main,
    },
    revalidate: 60,
  };
}

export default Cauta;
