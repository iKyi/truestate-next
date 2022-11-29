import { Box, Drawer, Stack, Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import topMenu from "../../../constants/topMenu";
import { getStrapiMedia } from "../../../lib/media";
import { GlobalContext } from "../../../pages/_app";

interface IMobileMenu {
  open: boolean;
  closeMobileMenu: () => void;
}
const MobileMenu: React.FC<IMobileMenu> = ({ closeMobileMenu, open }) => {
  const { pathname } = useRouter();
  const global = useContext(GlobalContext);
  const { logoWhite } = global;
  return (
    <Drawer
      anchor={"left"}
      open={open}
      onClose={closeMobileMenu}
      PaperProps={{
        sx: {
          bgcolor: "primary.dark",
          py: 3,
          px: 1.5,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: 3,
        }}
      >
        <Box
          component={Link}
          href="/"
          sx={{
            background:
              logoWhite && logoWhite.data
                ? `url('${getStrapiMedia(logoWhite)}')`
                : "transparent",
            backgroundSize: "auto 100%",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
            width: 100,
            height: 50,
            transition: "all .3s",
          }}
          aria-label="Link catre Acasa"
        />
      </Box>
      <Stack spacing={2}>
        {topMenu.map((item: any) => {
          const currentActive = pathname === item.url;
          return (
            <Button
              color="primary"
              size="small"
              component={Link}
              href={item.url}
              key={item.url}
              sx={{
                color: currentActive ? "secondary.light" : "white",
              }}
              aria-label={`link to ${item.name}`}
            >
              {item.name}
            </Button>
          );
        })}
      </Stack>
    </Drawer>
  );
};

export default MobileMenu;
