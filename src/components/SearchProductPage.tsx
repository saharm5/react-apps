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
 
      <div className="SearchProductCard">
        <img
          src={imageUrl || "https://via.placeholder.com/200"}
          alt={title}
          className="SearchProductImage"
        />
        <p className="SearchProductTitle">{title}</p>
        {price && (
          <p className="SearchProductPrice">{price.toLocaleString()} تومان</p>
        )}
        <div className="controls">
          {num === 0 ? (
            <button className="AddToCart" onClick={addition}>
              🛒 افزودن به سبد خرید
            </button>
          ) : (
            <div className="QuantityControls">
              <button className="actionButton" onClick={addition}>
                <span className="BReduceAdd" >+</span>
              </button>
              <span>{num}</span>
              <button onClick={reduce} className="actionButton">
                {num === 1 ? (
                  <i className="bi bi-trash3 iconBg"></i>
                ) : (
                  <span className="BReduceAdd" >-</span>
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
