import { gql } from "@apollo/client";
import { Box } from "@mui/material";
import type { NextPage } from "next";
import LastArticlesSlider from "../components/Pages/Homepage/LastArticlesSlider";
import LayoutWrapper from "../components/Reusable/Layout/LayoutWrapper";
import client from "../lib/apolloClient";

const getHomepageData = async () => {
  try {
    const response = await client.query({
      query: gql`
        query getProprietates {
          homepage {
            data {
              attributes {
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
          proprietates(sort: "createdAt:desc", pagination: { limit: 6 }) {
            data {
              id
              attributes {
                titlu
                descriere
                slug
                suprafata
                etaj
                anConstructie
                pret
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
                  imaginePrincipala {
                    data {
                      attributes {
                        url
                      }
                    }
                  }
                  imagini {
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
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

type HomeProps = {
  homeData: Record<any, any>;
};

const Home: NextPage<HomeProps> = ({ homeData = {} }) => {
  const { seo, proprietates } = homeData;

  return (
    <LayoutWrapper seo={seo}>
      <Box
        sx={{
          mt: 20,
        }}
      ></Box>
      <LastArticlesSlider latestItems={proprietates?.data} />
    </LayoutWrapper>
  );
};

export async function getStaticProps() {
  // Run API calls in parallel
  // const [homepage, services, faqs, articles, featuresBoxData] =
  //   await Promise.all([await fetchAPI("/homepage?populate=*")]);
  const [homeData] = await Promise.all([getHomepageData()]);
  return {
    props: {
      homeData,
    },
    revalidate: 60,
  };
}

export default Home;
