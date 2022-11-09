const formatCurrency = (number?: number | null) => {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(number ?? 0);

  // expected output: "123.456,79 €"
};
export default formatCurrency;
