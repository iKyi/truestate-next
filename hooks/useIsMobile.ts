import { useMediaQuery } from "@mui/material";

const useIsMobile = () => {
  const isMobile = useMediaQuery(`(max-width:1024px})`);
  return isMobile;
};

export default useIsMobile;
