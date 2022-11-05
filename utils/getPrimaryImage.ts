const getPrimaryImage = (imagini: any) => {
  const allIamges = imagini?.imagini?.data?.map((item: any) => {
    return item?.attributes?.url;
  });

  const mainImage = imagini?.imaginePrincipala?.data?.attributes?.url;
  return mainImage ?? allIamges?.[0] ?? null;
};
export default getPrimaryImage;
