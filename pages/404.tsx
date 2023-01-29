import { NextPage } from "next";
import LayoutWrapper from "../components/Reusable/Layout/LayoutWrapper";
import NuExistaRezultate from "../components/Reusable/NuExistaRezultate";

type PatruSutePatruProps = {};

const PatruSutePatru: NextPage<PatruSutePatruProps> = () => {
  return (
    <LayoutWrapper seo={{
      metaTitle:'Pagina nu a putut fi gasita'
    }}>
      <NuExistaRezultate />
    </LayoutWrapper>
  );
};

export default PatruSutePatru;
