import { Container } from "@mui/material";
import { Box } from "@mui/system";
import { NextPage } from "next";
import LayoutWrapper from "../components/Reusable/Layout/LayoutWrapper";
// import ContactBox from "../components/Reusable/ContactBox/ContactBox";
// import LayoutWrapper from "../components/Reusable/Layout/LayoutWrapper";
// import PageHeader from "../components/Reusable/PageHeader";
import { fetchAPI } from "../lib/api";

type PatruSutePatruProps = {
  main: Record<any, any>;
  services: any[];
};

const PatruSutePatru: NextPage<PatruSutePatruProps> = ({ main, services }) => {
  const { seo, pageHeader, headerImage } = main ?? {};
  return (
    <LayoutWrapper seo={{}}>
      <Box>Page not found</Box>
    </LayoutWrapper>
  );
  // <LayoutWrapper seo={seo}>
  //   <PageHeader {...pageHeader} backgroundImage={headerImage} />

  //   <ContactBox section />
  // </LayoutWrapper>
};
export async function getStaticProps() {
  // Run API calls in parallel
  //   const [main, services] = await Promise.all([
  //     fetchAPI("/PatruSutePatru?populate=*"),
  //     fetchAPI("/services?populate=*"),
  //   ]);
  return {
    props: { main: null, services: null },
    revalidate: 60,
  };
}

export default PatruSutePatru;
