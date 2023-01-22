import { gql } from "@apollo/client";
import { Container, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { NextPage } from "next";
import ServiciuEntryList from "../components/Pages/Servicii/ServiciuEntryList";
import ContactBox from "../components/Reusable/ContactBox";
import LayoutWrapper from "../components/Reusable/Layout/LayoutWrapper";
import PageHeader from "../components/Reusable/PageHeader";
// import ContactBox from "../components/Reusable/ContactBox/ContactBox";
// import LayoutWrapper from "../components/Reusable/Layout/LayoutWrapper";
// import PageHeader from "../components/Reusable/PageHeader";
import client from "../lib/apolloClient";

const getServiciiData = async () => {
  const reps = await client.query({
    query: gql`
      query GetServiciiPage {
        serviciuEntries {
          data {
            attributes {
              titlu
              descriere
              slug
            }
          }
        }
        serviciiPage {
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

  return reps.data;
};

type ServiciiProps = {
  main: Record<any, any>;
  services: any[];
};

const Servicii: NextPage<ServiciiProps> = ({ main, services }) => {
  const { seo, pageHeader, headerImage } = main;

  return (
    <LayoutWrapper seo={seo}>
      <Container>
        <PageHeader {...pageHeader} />
        <Grid
          container
          spacing={[2, 2, 4]}
          sx={{
            mb: 4,
          }}
          justifyContent={"center"}
        >
          {services.map((item) => {
            return (
              <Grid item xs={12} sm={6} xl={4} key={item.attributes.titlu}>
                <ServiciuEntryList data={item} />
              </Grid>
            );
          })}
        </Grid>
        <Box>
          <ContactBox
            sx={{
              color: "rgba(0,0,0,0.95)",
              py: 2,
            }}
          />
        </Box>
      </Container>

      {/* // <PageHeader {...pageHeader} backgroundImage={headerImage} />
    // <ContactBox section /> */}
    </LayoutWrapper>
  );
};
export async function getStaticProps() {
  //Run API calls in parallel
  const [main] = await Promise.all([getServiciiData()]);
  return {
    props: {
      main: main?.serviciiPage?.data?.attributes,
      services: main?.serviciuEntries?.data ?? [],
    },
    revalidate: 60,
  };
}

export default Servicii;
