const VedereGetter = (value: undefined | string) => {
  if (!value) return null;
  switch (value) {
    case "Nord":
      return "Nord";


    case "NordEst":
      return "Nord Est";



    case "Est":
      return "Est";



    case "SudEst":
      return "Sud Est";


    case "Sud":
      return "Sud";


    case "SudVest":
      return "Sud Vest";


    case "Vest":
      return "Vest";


    case "NordVest":
      return "Nord Vest";



    default:
      return null;
  }
};
export default VedereGetter;
