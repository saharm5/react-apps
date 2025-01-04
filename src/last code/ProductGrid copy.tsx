//ProductGrid.tsx

import React, { useState } from "react";
import "./ProductGrid.css";


interface Product {
  id: number;
  name: string;
  image: string;
  price: string;
  // category: string;
}

// Props Interface
interface Props {
  products: Product[];
}

const ProductGrid: React.FC<Props> = ({ products }) => {
  const [activeTab, setActiveTab] = useState<string>("daily"); // Manage active tab

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  // Filter products based on the active tab
  // const filteredProducts = products.filter((product) => product.category === activeTab);

  return (
    <div className="search-product-card">
      {/* Tabs */}
      <div className="maintabe">
        <p className="ptabe">محصولات ویژه</p>
        <div className="tabs">
          <button
            className={`tab ${activeTab === "daily" ? "active" : ""}`}
            onClick={() => handleTabClick("daily")}
          >
            نیازهای روزانه
          </button>
          <button
            className={`tab ${activeTab === "discount" ? "active" : ""}`}
            onClick={() => handleTabClick("discount")}
          >
            بیشترین تخفیف
          </button>
          <button
            className={`tab ${activeTab === "bestseller" ? "active" : ""}`}
            onClick={() => handleTabClick("bestseller")}
          >
            پرفروش‌ها
          </button>
        </div>
      </div>
      {/* Products Grid */}
      <div className="grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />
            <p className="product-name">{product.name}</p>
            <p className="product-price">{product.price}</p>
            <button className="add-to-cart">قیمت و افزودن</button>

          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;











