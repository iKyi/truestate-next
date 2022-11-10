import { Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { CSSProperties, useState } from "react";
import Image from "next/dist/client/image";
import { centerFlex } from "../../../utils/sxUtils";

interface IProprietateSlider {
  images: string[];
}

const ProprietateSlider: React.FC<IProprietateSlider> = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  if (images.length === 0) return null;
  return (
    <Box
      component="section"
      aria-label="Slider Imagini Proprietati"
      sx={{
        ".swiper-button-prev,.swiper-button-next": {
          "&:after": {
            textShadow: "0px 0px 2px black",
            color: "#fff",
          },
        },
        userSelect: "none",
        ".swiper-slide": {
          backgroundSize: "cover",
          backgroundPosition: "center",
          img: {
            display: "block",
            width: "100%",
            height: "100%",
            objectFit: "cover",
          },
        },
        ".mySwiper": {
          height: "20%",
          boxSizing: "border-box",
          padding: "10px 0",
          ".swiper-slide": {
            width: "25%",
            height: "100%",
            opacity: "0.4",
            "&.swiper-slide-thumb-active": {
              opacity: 1,
            },
          },
        },
      }}
    >
      <Swiper
        loop={true}
        spaceBetween={10}
        navigation={images.length > 1 ? true : false}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {images.map((item, index) => {
          return (
            <SwiperSlide key={item}>
              <Box
                sx={{
                  height: "100%",
                  position: "relative",
                  width: "100%",
                  minHeight: "400px",
                }}
              >
                <Image src={item} fill alt={index.toString()} />
              </Box>
              {/* <img src={item} alt={index.toString()} /> */}
            </SwiperSlide>
          );
        })}
      </Swiper>
      {images.length > 1 && (
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={true}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper"
        >
          {images.map((item, index) => {
            return (
              <SwiperSlide key={item}>
                <Box
                  sx={{
                    height: "100%",
                    position: "relative",
                    width: "100%",
                    minHeight: "100px",
                  }}
                >
                  <Image src={item} fill alt={index.toString()} />
                </Box>
                {/* <img src={item} alt={index.toString()} /> */}
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </Box>
  );
};

export default ProprietateSlider;
