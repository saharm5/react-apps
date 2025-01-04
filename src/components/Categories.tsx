// Categories.tsx
import "./Categories.css";
import React, { useRef } from "react";

interface Category {
  imageSrc: string;
  categoryName: string;
  categoryLink: string;
}

interface CategoriesProps {
  categories: Category[];
}

const Categories: React.FC<CategoriesProps> = ({ categories }) => {
  const carouselRef = useRef<HTMLDivElement>(null); // Reference to the scrollable container

  const scrollDistance = 300; // Adjust scroll distance as needed

  const nextCategories = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: scrollDistance,
        behavior: "smooth",
      });
    }
  };

  const prevCategories = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -scrollDistance,
        behavior: "smooth",
      });
    }
  };

  return (
        <div className="containercategory">
    
      {/* Header */}
      <div className="header-container-cat">
        <p className="header-title-C">دسته بندی ها</p>
        <div className="navigation-buttons">
          <button
            className="prevCat"
            onClick={nextCategories}
            aria-label="Previous Categories"
          >
            &#10094;
          </button>
          <button
            className="nextCat"
            onClick={prevCategories}
            aria-label="Next Categories"
          >
            &#10095;
          </button>
        </div>
      </div>

      {/* Scrollable container */}
      <div ref={carouselRef} className="categories-carousel">
        {categories.map((category, index) => (
          <div className="category-card" key={index}>
            
              <img
                src={category.imageSrc}
                alt={category.categoryName}
                className="category-card__image"
              />
              <a href={category.categoryLink} className="category-card__title">
                {category.categoryName}
              </a>
            
          </div>
        ))}
      </div>

    </div>
    
  );
};

export default Categories;
