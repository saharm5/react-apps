// Categories.tsx
import { fetchProducts } from "../../server/api";
import "./Categories.css";
import React, { useEffect, useRef, useState } from "react";

interface Category {
  category_image_src: string;
  category: string;
  categoryLink: string;
}

const Categories: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null); // Reference to the scrollable container
  const [Category, setCategory] = useState<Category[]>([]);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: { category: string; category_image_src: string }[] = await fetchProducts("/data");

        // استخراج ترکیب یکتا از دسته و تصویر
        const categoryMap = new Map();
        data.forEach((product) => {
          if (!categoryMap.has(product.category)) {
            categoryMap.set(product.category, product.category_image_src);
          }
        });


        const uniqueCategories = Array.from(categoryMap, ([category, category_image_src]) => ({
          category,
          category_image_src,
          categoryLink: `/categories/${category}`,
        }));
        setCategory(uniqueCategories);
      } catch (error) {
        console.error("خطا در دریافت داده‌های محصول:", error);
      }
    };

    fetchData();
  }, []);

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
        {Category.map((category, index) => (
          <div className="category-card" key={index}>

            <img
              src={category.category_image_src}
              alt={category.category}
              className="category-card__image"
            />
            <a href={category.categoryLink} className="category-card__title">
              {category.category || "#"}
            </a>

          </div>
        ))}
      </div>

    </div>

  );
};

export default Categories;
