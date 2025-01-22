import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AboutProduct.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { fetchProducts } from "../server/api"; // Assume this function exists

interface Image {
  imagealt: string;
  imagessrc: string;
}

// Define interfaces for props
interface Product {
  id: number;
  imagesrc: string | null;
  title: string;
  category: string | null;
  SubCategory: string | null;
  description: string | null;
  brand: string;
  mainprice: number;
  Discount: number;
  finalprice: number;
  Images: Image[];
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
                    product.imagesrc ||
                    "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
                  }
                  className="card-img-top"
                  alt={product.title || "Product"}
                />
              </div>
              {/* Additional Images */}
              <div className="Products-imgs d-flex flex-row gap-3">
                {product.Images.map((img, i) => (
                  <img
                    key={i}
                    src={img.imagessrc}
                    alt={img.imagealt || "Product Image"}
                    className="card-imgs"
                  />
                ))}
              </div>
            </div>

            {/* Left Section */}
            <div className="d-flex flex-row">
              <div className="d-flex flex-column">
                <p id="title">{product.title}</p>
                <p id="description">{product.description}</p>
                <p id="category">Category: {product.category}</p>
                <p id="brand">Brand: {product.brand}</p>
                <div>
                  <p id="mainprice">{product.mainprice}</p>
                  <p id="Discount">{product.Discount}%</p>
                  <p id="finalprice">{product.finalprice}</p>
                </div>
              </div>
              <div>
                <h6>Product Features</h6>
                <ul>
                  <li>
                    {product.category}: {product.SubCategory}
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
