import React, { useState, useEffect } from "react";
import "./Banner.css";

const Banner: React.FC = () => {
  
  const [slideIndex, setSlideIndex] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const slides = [
    {
      imgSrc:
        "https://dkstatics-public.digikala.com/digikala-adservice-banners/75e4dc2851ff84eb0f92dbf526d860e50998bae7_1741018587.jpg?x-oss-process=image/quality,q_95/format,webp",
    },
    {
      imgSrc:
        "https://dkstatics-public.digikala.com/digikala-adservice-banners/b9e05bea74868187a4221d3ca3075885bdc9df10_1741157297.jpg?x-oss-process=image/quality,q_95/format,webp",
    },
    {
      imgSrc:
        "https://dkstatics-public.digikala.com/digikala-adservice-banners/75e4dc2851ff84eb0f92dbf526d860e50998bae7_1741018587.jpg?x-oss-process=image/quality,q_95/format,webp",
    },
    {
      imgSrc:
        "https://asset.okala.com/unsigned/rs:fill/size:0:0/plain/s3://cdn/slider/c3ee34f5-0624-4a2b-8e4b-bd742543f34b.jpg",
    },
  ];

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setSlideIndex((prevIndex) =>
        prevIndex === slides.length ? 1 : prevIndex + 1
      );
    }, 2000);

    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  return (
    <div className="">
      <div
        className="containerBanner"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="slideshow-container">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`mySlides ${slideIndex === index + 1 ? "active" : ""}`}
            >
              <img
                src={slide.imgSrc}
                alt={`Slide ${index + 1}`}
                className="imgSize"
                onError={(e) => (e.currentTarget.src = "/fallback-image.png")}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
