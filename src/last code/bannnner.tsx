// import React, { useState } from "react";
// import "./Banner.css"; // Importing the CSS file

// const Banner: React.FC = () => {
//   const [slideIndex, setSlideIndex] = useState(1);

//   const plusSlides = (n: number) => {
//     setSlideIndex((prevIndex) => {
//       const newIndex = prevIndex + n;
//       if (newIndex > 3) return 1;
//       if (newIndex < 1) return 3;
//       return newIndex;
//     });
//   };

//   const currentSlide = (n: number) => {
//     setSlideIndex(n);
//   };

//   const slides = [
//     {
//       imgSrc:
//         "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pixel.ir%2Fblog%2Fproduct-photography-tips%2F&psig=AOvVaw1_BhQCvgNDathHz0kqTktw&ust=1733635259646000&source=images&cd=vfe&opi=89978449&ved=2ahUKEwjAxuvf9JSKAxXfGFkFHXIvE1gQjRx6BAgAEBk",
//       caption: "Caption Text",
//     },
//     {
//       imgSrc:
//         "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.yektanet.com%2Fblog%2F1326%2F%25D8%25B9%25DA%25A9%25D8%25B3-%25D8%25AA%25D8%25A8%25D9%2584%25DB%258C%25D8%25BA%25D8%25A7%25D8%25AA%25DB%258C%2F&psig=AOvVaw24g7nIeK29Y7PpYPa3SxVs&ust=1733635262465000&source=images&cd=vfe&opi=89978449&ved=2ahUKEwijzJfh9JSKAxVXMVkFHQhWNPMQjRx6BAgAEBk",
//       caption: "Caption Two",
//     },
//     {
//       imgSrc:
//         "https://www.google.com/url?sa=i&url=http%3A%2F%2Fwww.stockphoto.ir%2F%3Fsearch%3D%25D8%25B9%25DA%25A9%25D8%25B3%2520%25D8%25AA%25D8%25A8%25D9%2584%25DB%258C%25D8%25BA%25D8%25A7%25D8%25AA%25DB%258C&psig=AOvVaw2a85so_m9Uoc3xsljraWCT&ust=1733635271860000&source=images&cd=vfe&opi=89978449&ved=2ahUKEwjQ_9Tl9JSKAxUVMmIAHfGqF9oQjRx6BAgAEBk",
//       caption: "Caption Three",
//     },
//   ];

//   return (
//     <div className="slideshow-container">
//       {slides.map((slide, index) => (
//         <div
//           key={index}
//           className={`mySlides fade ${
//             slideIndex === index + 1 ? "block" : "none"
//           }`}
//         >
//           <div className="numbertext">{index + 1} / 3</div>
//           <img
//             src={slide.imgSrc}
//             className="slide-image"
//             alt={`Slide ${index + 1}`}
//           />
//           <div className="text">{slide.caption}</div>
//         </div>
//       ))}

//       <a className="prev" onClick={() => plusSlides(-1)}>
//         &#10094;
//       </a>
//       <a className="next" onClick={() => plusSlides(1)}>
//         &#10095;
//       </a>

//       <div className="dot-container">
//         {slides.map((_, index) => (
//           <span
//             key={index}
//             className={`dot ${slideIndex === index + 1 ? "active" : ""}`}
//             onClick={() => currentSlide(index + 1)}
//           ></span>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Banner;

import React, { useState } from "react";
import "./Banner.css"; // Import the CSS file

const Banner: React.FC = () => {
  const [slideIndex, setSlideIndex] = useState(1); // To track the current slide

  const slides = [
    { imgSrc: "https://selleracademy.digikala.com/wp-content/uploads/2023/07/eader.e1.jpg", caption: "Caption Text" },
    { imgSrc: "https://selleracademy.digikala.com/wp-content/uploads/2022/11/%D8%AA%D8%A8%D9%84%DB%8C%D8%BA%D8%A7%D8%AA-%D9%86%D9%85%D8%A7%DB%8C%D8%B4%DB%8C-Header-1401.06.27-01.png", caption: "Caption Two" },
    { imgSrc: "https://selleracademy.digikala.com/wp-content/uploads/2022/11/%D8%AA%D8%A8%D9%84%DB%8C%D8%BA%D8%A7%D8%AA-%D9%86%D9%85%D8%A7%DB%8C%D8%B4%DB%8C2-Header-1401.06.27-02.png", caption: "Caption Three" },
  ];

  const nextSlide = () =>
    setSlideIndex((prev) => (prev === slides.length ? 1 : prev + 1));
  const prevSlide = () =>
    setSlideIndex((prev) => (prev === 1 ? slides.length : prev - 1));
  const setSlide = (index: number) => setSlideIndex(index);

  return (
    <div className="slideshow-container">
      {/* Render slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`mySlides ${slideIndex === index + 1 ? "active" : ""}`}
        >
          <div className="numbertext">
            {index + 1} / {slides.length}
          </div>
          <img
            src={slide.imgSrc}
            alt={`Slide ${index + 1}`}
            className="slide-image"
          />
          <div className="text">{slide.caption}</div>
        </div>
      ))}

      {/* Navigation buttons */}
      <button className="prev" onClick={prevSlide}>
        &#10094;
      </button>
      <button className="next" onClick={nextSlide}>
        &#10095;
      </button>

      {/* Dots */}
      <div className="dots-container">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`dot ${slideIndex === index + 1 ? "active" : ""}`}
            onClick={() => setSlide(index + 1)}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
