import { Box, useMediaQuery, useTheme } from "@mui/material";
import PropertyCard from "../../Reusable/PropertyComponents/PropertyCard";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Virtual, Pagination } from "swiper";
import HomeSection from "../../Reusable/HomeSection";

SwiperCore.use([Navigation, Virtual, Pagination]);

// Import Swiper styles
import "swiper/swiper-bundle.css";
import "swiper/css/scrollbar";
import "swiper/css/pagination";

interface ILastArticlesSlider {
  latestItems: any[];
}
const LastArticlesSlider: React.FC<ILastArticlesSlider> = ({ latestItems }) => {
  const theme = useTheme();
  const isNavigationStyles = useMediaQuery(theme.breakpoints.up(1280));

  return (
    <HomeSection title="Cele mai noi proprietati">
      <Box
        sx={{
          ".swiper-pagination": {
            bottom: "-4px !important",
            ".swiper-pagination-bullet-active": {
              background: `${theme.palette.primary.main}!important`,
            },
          },
        }}
      >
        <Swiper
          pagination
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 10,
              navigation: true,
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 25,
              navigation: true,
            },
          }}
          style={
            isNavigationStyles
              ? {
                  paddingLeft: "46px",
                  paddingRight: "46px",
                }
              : undefined
          }
        >
          {latestItems.map((item) => {
            return (
              <SwiperSlide key={item.id}>
                <Box
                  sx={{
                    py: "15px",
                  }}
                >
                  <PropertyCard data={item} />
                </Box>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Box>
    </HomeSection>
  );
};

export default LastArticlesSlider;
