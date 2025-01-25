import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AboutProduct.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { fetchProducts } from "../server/api"; // Assume this function exists

interface Image {
  productName: string;
  productImageSrc: string;
}

// Define interfaces for props
interface Product {
  id: number;
  productImageSrc: string | null;
  productName: string;
  category: string | null;
  subCategory: string | null;
  productDetails: string | null;
  brand: string;
  mainPrice: string;
  discount	: string;
  finalPrice: string;
  SubproductImages: Image[];
}

const AboutProduct: React.FC = () => {
  const [favorit, setFavorit] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);

  // Handle adding/removing from favorites
  const handleAddFavorit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFavorit(!favorit);
    if (!favorit) {
      try {
        const response = await axios.get("http://127.0.0.1:8000/save-data/", {
          params: { data: window.location.href },
        });
        console.log(response.data);
      } catch (error) {
        alert("Error saving data");
        console.error(error);
      }
    }
  };

  // Handle copying the current URL
  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch((error) => console.error("Error copying to clipboard:", error));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProducts("http://localhost:8000/data/");
        setProducts(data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="product-list">
      {products.length === 0 ? (
        <div>No products available. Please try again later.</div>
      ) : (
        products.map((product) => (
          <div key={product.id} className="d-flex flex-row mb-4">
            {/* Right Section */}
            <div
              className="d-flex flex-column align-items-center"
              style={{ maxWidth: "250px" }}
            >
              {/* Image Container */}
              <div className="card position-relative mb-3">
                {/* Action Icons */}
                <div className="position-absolute top-0 start-0 m-2">
                  <button
                    className="btnI iconB favorit btn-light"
                    onClick={handleAddFavorit}
                  >
                    {favorit ? (
                      <i className="bi bi-suit-heart-fill text-danger"></i>
                    ) : (
                      <i className="bi bi-suit-heart"></i>
                    )}
                  </button>
                  <button
                    className="btnI iconB share btn-light"
                    onClick={handleCopyLink}
                  >
                    {isCopied ? (
                      <i className="bi bi-check-lg text-success"></i>
                    ) : (
                      <i className="bi bi-link-45deg"></i>
                    )}
                  </button>
                </div>
                {/* Main Image */}
                <img
                  src={
                    product.productImageSrc ||
                    "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
                  }
                  className="card-img-top"
                  alt={product.productName || "Product"}
                />
              </div>
              {/* Additional Images */}
              <div className="Products-imgs d-flex flex-row gap-3">
                {product.SubproductImages.map((img, i) => (
                  <img
                    key={i}
                    src={img.productImageSrc}
                    alt={img.productName || "Product Image"}
                    className="card-imgs"
                  />
                ))}
              </div>
            </div>

            {/* Left Section */}
            <div className="d-flex flex-row">
              <div className="d-flex flex-column">
                <p id="productName">{product.productName}</p>
                <p id="productDetails"><strong>توضیحات محصول : </strong>{product.productDetails}</p>
                <p id="category"><strong> Category: </strong>{product.category}</p>
                <p id="brand"><strong> Brand:</strong> {product.brand}</p>
                <div>
                  <p id="mainPrice">{product.mainPrice}</p>
                  <p id="discount	">{product.discount	}%</p>
                  <p id="finalPrice">{product.finalPrice}</p>
                </div>
              </div>
              <div>
                <h6>Product Features</h6>
                <ul>
                  <li>
                    {product.category}: {product.subCategory}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AboutProduct;
