import { Box, useMediaQuery, useTheme } from "@mui/material";
import PropertyCard from "../../Reusable/PropertyComponents/PropertyCard";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Virtual } from "swiper";

SwiperCore.use([Navigation, Virtual]);

// Import Swiper styles
import "swiper/swiper-bundle.css";
import HomeSection from "../../Reusable/HomeSection";

interface ILastArticlesSlider {
  latestItems: any[];
}
const LastArticlesSlider: React.FC<ILastArticlesSlider> = ({ latestItems }) => {
  const theme = useTheme();
  const isNavigationStyles = useMediaQuery(theme.breakpoints.up(1280));

  return (
    <HomeSection title="Cele mai noi proprietati">
      <Swiper
        virtual
        breakpoints={{
          0: {
            slidesPerView: 2,
            spaceBetween: 10,
            navigation: false,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 10,
            navigation: false,
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
              <PropertyCard data={item} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </HomeSection>
  );
};

export default LastArticlesSlider;
