import { gql } from "@apollo/client";
import { Container } from "@mui/material";
import { NextPage } from "next";
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

  return reps.data?.serviciiPage?.data?.attributes ?? {};
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
        Servicii Inner
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
    props: { main, services: null },
    revalidate: 60,
  };
}

export default Servicii;
