import { Box, Drawer, Stack, Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import topMenu from "../../../constants/topMenu";

interface IMobileMenu {
  open: boolean;
  closeMobileMenu: () => void;
}
const MobileMenu: React.FC<IMobileMenu> = ({ closeMobileMenu, open }) => {
  const { pathname } = useRouter();
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
