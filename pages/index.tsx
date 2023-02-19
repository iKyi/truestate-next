import { gql } from "@apollo/client";
import { Box } from "@mui/material";
import type { NextPage } from "next";
import CategoriiBox from "../components/Pages/Homepage/CategoriiBox";
import EvaluareGratuitaBox from "../components/Pages/Homepage/EvaluareGratuitaBox";
import HeroBox from "../components/Pages/Homepage/HeroBox";
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
                evaluareGratuitaImage {
                  data {
                    attributes {
                      url
                      width
                      height
                    }
                  }
                }
                evaluareGratuitaText
                heroImage {
                  data {
                    attributes {
                      url
                    }
                  }
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
                vandut
                camere
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
                      color
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
  const { seo, proprietates, homepage } = homeData ?? {};
  const { heroImage, evaluareGratuitaText, evaluareGratuitaImage } =
    homepage?.data?.attributes ?? {};

  return (
    <LayoutWrapper seo={seo} noSpacing>
      <HeroBox heroImage={heroImage} />
      <CategoriiBox />
      <EvaluareGratuitaBox
        text={evaluareGratuitaText}
        image={evaluareGratuitaImage}
      />
      <LastArticlesSlider latestItems={proprietates?.data ?? []} />
    </LayoutWrapper>
  );
};

export async function getStaticProps() {
  const [homeData] = await Promise.all([getHomepageData()]);
  return {
    props: {
      homeData: homeData ?? null,
    },
    revalidate: 60,
  };
}

export default Home;
