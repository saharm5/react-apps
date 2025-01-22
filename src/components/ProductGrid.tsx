//ProductGrid.tsx

import React from "react";
import "./ProductGrid.css";




// GridProps Interface
interface GridProps {
  id: number;
  imageUrl: string | null;
  title: string;
  price?: number;
  addition: () => void;
  reduce: () => void;
  num: number;
}

const ProductGrid: React.FC<GridProps> = ({ 
  imageUrl,
  title,
  price,
  addition,
  reduce,
  num, }) => {



  // Filter products based on the active tab
  // const filteredProducts = products.filter((product) => product.category === activeTab);

  return (
    <div className="productCards" >
      <img
        src={imageUrl || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs9gUXKwt2KErC_jWWlkZkGabxpeGchT-fyw&s"}
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
                <i className="bi bi-trash3 icon-Bg "></i>
              ) : (
                <span className="B-Reduce-Add" >-</span>
              )}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default ProductGrid;











