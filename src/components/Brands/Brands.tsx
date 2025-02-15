//Brand.tsx
import { fetchProducts } from "../../server/api";
import "./Brands.css";
import React, { useEffect, useState } from "react";

interface Brand {

  brand_image_src: string;
  brand: string;
}

const Brands: React.FC = () => {
  const [Brand, setBrand] = useState<Brand[]>([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: { brand: string; brand_image_src: string }[] = await fetchProducts("/data");
        const brandMap = new Map();
        data.forEach((product) => {
          if (!brandMap.has(product.brand)) {
            brandMap.set(product.brand, product.brand_image_src);
          }
        });


        const uniqueCategories = Array.from(brandMap, ([brand, brand_image_src]) => ({
          brand,
          brand_image_src,
        }));
        setBrand(uniqueCategories);
      } catch (error) {
        console.error("خطا در دریافت داده‌های محصول:", error);
      }
    };

    fetchData();
  }, []);



  return (
    <div className="containerBrand">
      {/* Header */}
      <div className="brand-header-container">
        <p className="header-title-brand">برندهای پرطرفدار</p>
      </div>

      {/* Carousel */}
      <div className="Brands-carousel">
        {Brand.map((brand, index) => (
          <div className="Brand-circle">
            <img
              src={brand.brand_image_src}
              alt={brand.brand}
              className="Brand-circle__image"
              onError={(e) => (e.currentTarget.src = "https://png.pngtree.com/element_our/20190531/ourmid/pngtree-return-icon-image_1287495.jpg")}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Brands;
