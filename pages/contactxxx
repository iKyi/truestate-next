import { Container } from "@mui/material";
import { NextPage } from "next";
// import ContactBox from "../components/Reusable/ContactBox/ContactBox";
// import LayoutWrapper from "../components/Reusable/Layout/LayoutWrapper";
// import PageHeader from "../components/Reusable/PageHeader";
import { fetchAPI } from "../lib/api";

type ContactProps = {
  main: Record<any, any>;
  services: any[];
};

const Contact: NextPage<ContactProps> = ({ main, services }) => {
  const { seo, pageHeader, headerImage } = main;
  return null;
  // <LayoutWrapper seo={seo}>
  //   <PageHeader {...pageHeader} backgroundImage={headerImage} />

  //   <ContactBox section />
  // </LayoutWrapper>
};
export async function getStaticProps() {
  // Run API calls in parallel
  //   const [main, services] = await Promise.all([
  //     fetchAPI("/Contact?populate=*"),
  //     fetchAPI("/services?populate=*"),
  //   ]);
  return {
    props: { main: null, services: null },
    revalidate: 60,
  };
}

export default Contact;
