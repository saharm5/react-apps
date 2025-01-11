import React from "react";
import "./SearchProductPage.css";

interface SearchProductPageProps {
   imageUrl: string | null;
  title: string;

  price?: number;
  addition: () => void;
  reduce: () => void;
  num: number;
}

const SearchProductPage: React.FC<SearchProductPageProps> = ({
  imageUrl,
  title,
  price,
  addition,
  reduce,
  num,
}) => {
  return (
      <div className="productCards">
        <img
          src={imageUrl || "https://via.placeholder.com/200"}
          alt={title}
          className="product-image"
        />
        <p className="product-Title">{title}</p>
        {price && (
          <p className="product-price">{price.toLocaleString()} تومان</p>
        )}
        <div className="controls">
          {num === 0 ? (
            <button className="add-to-cart" onClick={addition}>
               🛒 <span>افزودن به سبد خرید</span>
            </button>
          ) : (
            <div className="Quantity-Controls">
              <button className="action-Button" onClick={addition}>
                <span className="B-Reduce-Add" >+</span>
              </button>
              <span>{num}</span>
              <button onClick={reduce} className="action-Button">
                {num === 1 ? (
                  <i className="bi bi-trash3 iconBg"></i>
                ) : (
                  <span className="B-Reduce-Add" >-</span>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    // </div>
  );
};

export default SearchProductPage;
