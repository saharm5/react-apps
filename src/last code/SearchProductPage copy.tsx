import React from "react";
import "./SearchProductPage.css";
import "bootstrap/dist/css/bootstrap.min.css";

interface SearchProductPageProps {
  id: string;
  imageUrl: string | null;
  title: string;
  description?: string[];
  // rating?: number|undefined;
  price?: number;
  addition: () => void;
  reduce: () => void;
  onDelete: () => void;
  num: number;
}

const SearchProductPage: React.FC<SearchProductPageProps> = ({
  imageUrl,
  title,
  description = [],
  // rating,
  price,
  addition,
  reduce,
  onDelete,
  num,
}) => {
  // const formattedRating = rating !== 0 ? rating.toFixed(2) : "بدون امتیاز";

  return (
    <div className="card m-3 shadow-sm border-0 h-100">
      <div className="containe">
        <div className="body">
          <div className="row g-0">
            {/* <div className="col-12"> */}
            <div className="card">
              
              <div className="imgbtn">
                {/* div img */}
                <div className="card-img-top img-fluid">
                  <img
                    src={imageUrl || "https://via.placeholder.com/200"}
                    alt="Food Image"
                    className="imag"
                  />
                 
                </div>
               {/* div button */}
                <div className="">
                  <div className="quantityContainer">
                    {num === 1 ? (
                      <button
                        className="quantityButton"
                        onClick={onDelete}
                      >
                        🗑️
                      </button>
                    ) : (
                      <button
                        className="quantityButton"
                        onClick={reduce}
                      >
                        -
                      </button>
                    )}
                    <span className="quantityDisplay" >{num} </span>
                    <button
                      className="quantityButton"
                      onClick={addition}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              {/* div card body */}
              <div className="card-body text-right">
                <div className="card-title fw-bold">
                  <h3 className="header">{title}</h3>
                </div>
                <ul className="description">
                  {Array.isArray(description)
                    ? description.map((item, index) => (
                        <li key={index} >
                          <div className="item">{item}</div>
                        </li>
                      ))
                    : description}
                </ul>
                <p className="description">
                  {/* <span className="rating">امتیاز: {formattedRating}</span> */}
                </p>
                <p><span className="description">{price} تومان</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default SearchProductPage;
