//Banner.tsx
import React, { useState, useEffect } from "react";
import "./Banner.css";

const Banner: React.FC = () => {
  const [slideIndex, setSlideIndex] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const slides = [
    {
      imgSrc:
        "https://dkstatics-public.digikala.com/digikala-adservice-banners/f62e6a6fe7d4fe9222f52e1ec9e3858971a5fafb_1733560848.jpg?x-oss-process=image/quality,q_95/format,webp",
    },
    {
      imgSrc:
        "https://dkstatics-public.digikala.com/digikala-adservice-banners/422c39151be2cabc3a5b646f862c6eae874c77a7_1730888651.jpg?x-oss-process=image/quality,q_95/format,webp",
    },
    {
      imgSrc:
        "https://dkstatics-public.digikala.com/digikala-adservice-banners/f62e6a6fe7d4fe9222f52e1ec9e3858971a5fafb_1733560848.jpg?x-oss-process=image/quality,q_95/format,webp",
    },
    {
      imgSrc:
        "https://dkstatics-public.digikala.com/digikala-adservice-banners/422c39151be2cabc3a5b646f862c6eae874c77a7_1730888651.jpg?x-oss-process=image/quality,q_95/format,webp",
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

  // const nextSlide = () => {
  //   setSlideIndex((prevIndex) =>
  //     prevIndex === slides.length ? 1 : prevIndex + 1
  //   );
  // };

  // const prevSlide = () => {
  //   setSlideIndex((prevIndex) =>
  //     prevIndex === 1 ? slides.length : prevIndex - 1
  //   );
  // };

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

          {/* <button
          className="prev"
          onClick={prevSlide}
          aria-label="Previous Slide"
        >
          &#10095;
        </button>
        <button className="next" onClick={nextSlide} aria-label="Next Slide">
          &#10094;
        </button> */}
        </div>

        {/* <div className="dots-container">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`dot ${slideIndex === index + 1 ? "active" : ""}`}
            onClick={() => setSlideIndex(index + 1)}
          />
        ))}
      </div> */}
      </div>
    </div>
  );
};

export default Banner;
