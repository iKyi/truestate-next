import { ArrowDropDownTwoTone, MenuOpenOutlined } from "@mui/icons-material";
import { Box, Button, Stack, Menu, MenuItem, IconButton } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useMemo, useState } from "react";
import topMenu from "../../../constants/topMenu";
import useIsMobile from "../../../hooks/useIsMobile";
import useScrollPosition from "../../../hooks/useScrollPosition";
import { getStrapiMedia } from "../../../lib/media";
import { GlobalContext } from "../../../pages/_app";
import MobileMenu from "./MobileMenu";
import SeoComp from "./Seo";

const HeaderServicesMenu = React.forwardRef((props: any, ref) => {
  const router = useRouter();
  const { data, subItems } = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const active = useMemo(() => {
    if (
      router.pathname === data.url ||
      subItems?.some(
        (item: any) => `${data.url}/${item.slug}` === router.pathname
      )
    ) {
      return true;
    }
    return false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUrlClick = (event: any, url: string) => {
    event.preventDefault();
    setAnchorEl(null);
    router.push(url);
  };
  return (
    <>
      <Button
        onClick={handleClick}
        size="small"
        sx={{
          bgcolor: (theme) => (active ? "primary.main" : "transparent"),
          color: active ? "secondary.light" : "inherit",
          flex: 1,
        }}
        endIcon={<ArrowDropDownTwoTone />}
      >
        {data.name}
      </Button>
      <Menu
        id="services-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {subItems?.map((subL: any) => {
          return (
            <MenuItem
              sx={{
                minWidth: "170px",
                textAlign: "center",
                bgcolor:
                  router.pathname === `servicii/${subL.url}`
                    ? "primary.main"
                    : "transparent",
                color:
                  router.pathname === `servicii/${subL.url}`
                    ? "white"
                    : "inherit",
              }}
              key={subL.slug}
              onClick={(event: any) =>
                handleUrlClick(event, `${data.url}/${subL.slug}`)
              }
            >
              {subL.name}
            </MenuItem>
          );
        })}
        <MenuItem
          sx={{
            minWidth: "170px",
            textAlign: "center",
            bgcolor:
              router.pathname === "/servicii" ? "primary.main" : "transparent",
            color: router.pathname === "/servicii" ? "white" : "inherit",
          }}
          key={"all"}
          onClick={(event: any) => handleUrlClick(event, `/servicii`)}
        >
          Vezi toate
        </MenuItem>
      </Menu>
    </>
  );
});
HeaderServicesMenu.displayName = "HeaderServicesMenu";

export type HeaderPropsType = {
  children?: any;
  seo: Record<any, any>;
};
const Header: React.FC<HeaderPropsType> = ({ children, seo }) => {
  // const { toggleLang, langValue } = useContext(LanguageContext);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useRouter();

  const scrollPos = useScrollPosition();

  const Mobile = useIsMobile();
  const global = useContext(GlobalContext);
  const { logoWhite, services = [] } = global;

  const servicesMenu = useMemo(() => {
    return services?.map((item: any) => {
      return item.attributes;
    });
  }, [services]);

  const isSticky = useMemo(() => {
    return scrollPos > 60 ? true : false;
  }, [scrollPos]);

  const openMobileMenu = () => {
    setMobileOpen(true);
  };
  const closeMobileMenu = () => {
    setMobileOpen(false);
  };
  // *************** RENDER *************** //
  return (
    <>
      <Box
        component="header"
        sx={{
          zIndex: "100",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          padding: !Mobile ? 1.5 : 1,
          color: "#fff",
          backdropFilter: !isSticky
            ? "none"
            : "blur(3px) grayscale(80%) contrast(5%)",
          backgroundColor: (theme) =>
            isSticky ? "rgba(0,0,0,0.55)" : theme.palette.primary.main,
          transition: "all .2s",
          boxShadow: !isSticky ? "none" : "0px 6px 6px rgba(0,0,0,0.25)",
        }}
      >
        <SeoComp seo={seo} />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
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
              width: Mobile || isSticky ? 100 : 240,
              height: Mobile || isSticky ? 50 : 60,
              transition: "all .3s",
            }}
            aria-label="Link catre Acasa"
          />

          <Stack
            spacing={2}
            direction="row"
            sx={{
              marginLeft: "auto",
              display: ["none", "none", "flex"],
              pr: [0, 0, 3],
            }}
          >
            {topMenu.map((item: any) => {
              const currentActive = pathname === item.url;
              if (item.servicesList) {
                return (
                  <HeaderServicesMenu
                    key={item.url}
                    data={item}
                    subItems={servicesMenu}
                  />
                );
              }
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
                >
                  {item.name}
                </Button>
              );
            })}
          </Stack>
          <IconButton
            sx={{
              borderRadius: 0,
              display: ["inline-flex", "inline-flex", "none"],
              color: "#fff",
              ml: "auto",
            }}
            onClick={openMobileMenu}
            aria-label={`open mobile menu`}
          >
            <MenuOpenOutlined />
          </IconButton>
        </Box>
      </Box>
      <MobileMenu open={mobileOpen} closeMobileMenu={closeMobileMenu} />
    </>
  );
};

export default Header;
