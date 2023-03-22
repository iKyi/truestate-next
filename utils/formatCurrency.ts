const formatCurrency = (number?: number | null) => {
  const formattedNumber = new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(number ?? 0);

  // Append the Euro symbol
  const formattedWithoutDecimals = `${formattedNumber} €`;

  // expected output: "123.456 €"
  return formattedWithoutDecimals;
};
export default formatCurrency;
