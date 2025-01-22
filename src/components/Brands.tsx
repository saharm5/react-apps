//Brands.tsx
import React from "react";
import "./Brands.css";

interface Brand {
  imageSrc: string;
  BrandName: string;
}

interface BrandsProps {
  Brands: Brand[];
}

const Brands: React.FC<BrandsProps> = ({ Brands }) => {
  return (
    <div className="containerBrand">
      {/* Header */}
      <div className="brand-header-container">
        <p className="header-title-brand">برندهای پرطرفدار</p>
      </div>

      {/* Carousel */}
      <div className="Brands-carousel">
        {Brands.map((Brand, index) => (

          <img
            src={Brand.imageSrc}
            alt={Brand.BrandName}
            className="Brand-circle__image"
            onError={(e) => (e.currentTarget.src = "https://png.pngtree.com/element_our/20190531/ourmid/pngtree-return-icon-image_1287495.jpg")}
          />

        ))}
      </div>
    </div>
  );
};

export default Brands;
