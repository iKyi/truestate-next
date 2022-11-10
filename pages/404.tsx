import { Box } from "@mui/system";
import { NextPage } from "next";
import LayoutWrapper from "../components/Reusable/Layout/LayoutWrapper";
import NuExistaRezultate from "../components/Reusable/NuExistaRezultate";
// import ContactBox from "../components/Reusable/ContactBox/ContactBox";
// import LayoutWrapper from "../components/Reusable/Layout/LayoutWrapper";
// import PageHeader from "../components/Reusable/PageHeader";

type PatruSutePatruProps = {};

const PatruSutePatru: NextPage<PatruSutePatruProps> = () => {
  // const { seo, pageHeader, headerImage } = main ?? {};
  return (
    <LayoutWrapper seo={{
      metaTitle:'Pagina nu a putut fi gasita'
    }}>
      <NuExistaRezultate />
    </LayoutWrapper>
  );
  // <LayoutWrapper seo={seo}>
  //   <PageHeader {...pageHeader} backgroundImage={headerImage} />

  //   <ContactBox section />
  // </LayoutWrapper>
};
// export async function getStaticProps() {
//   // Run API calls in parallel
//   //   const [main, services] = await Promise.all([
//   //     fetchAPI("/PatruSutePatru?populate=*"),
//   //     fetchAPI("/services?populate=*"),
//   //   ]);
//   return {
//     props: { main: null, services: null },
//     revalidate: 60,
//   };
// }

export default PatruSutePatru;
