const clasaEnergeticaGetter = (value: undefined | string) => {
  if (!value) return null;

  switch (value) {
    case "aTrei":
      return "A+++";
    case "aDoi":
      return "A++";
    case "aUnu":
      return "A+";
    case "a":
      return "A";
    case "b":
      return "B";
    default:
      return null;
  }
};
export default clasaEnergeticaGetter;
