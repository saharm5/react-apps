import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AboutProduct.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { fetchProducts } from "../server/api"; // Assume this function exists
import CartButton from "./CartButton"; // Importing the new component

interface Image {
  productName: string;
  productImageSrc: string;
}

interface Product {
  id: number;
  productImageSrc: string | null;
  productName: string;
  category: string | null;
  subCategory: string | null;
  productDetails: string | null;
  brand: string;
  mainPrice: string;
  discount: string;
  finalPrice: string;
  SubproductImages: Image[];
}

interface AboutProductProps {
  addition: (id: number) => void;
  reduce: (id: number) => void;
  carts: { id: number; quantity: number }[];
}

const AboutProduct: React.FC<AboutProductProps> = ({ addition, reduce, carts }) => {
  const [favorit, setFavorit] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [expandedImg, setExpandedImg] = useState<string | null>(null);
  const [imgText, setImgText] = useState<string>("");

  // Handle image click to expand
  const handleImageClick = (src: string, alt: string) => {
    setExpandedImg(src);
    setImgText(alt || "Image");
  };

  // Close the expanded image
  const closeImage = () => {
    setExpandedImg(null);
    setImgText("");
  };

  // Handle adding a product to favorites
  const handleAddFavorit = async (id: number) => {
    setFavorit(!favorit);
    if (!favorit) {
      try {
        const response = await axios.get("http://127.0.0.1:8000/save-data/", {
          params: { data: window.location.href },
        });
        console.log(`Product ${id} added to favorites`, response.data);
      } catch (error) {
        alert("Error saving data");
        console.error(error);
      }
    }
  };

  // Handle copying the product link
  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch((error) => console.error("Error copying to clipboard:", error));
  };

  // Fetch product data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProducts("http://localhost:8000/data1?id=" + 9);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="product-list d-flex flex-column align-items-center">
      {products.length === 0 ? (
        <div>No products available. Please try again later.</div>
      ) : (
        products.map((product) => {
          const cartsItem = carts.find((item) => item.id === product.id);
          const quantity = cartsItem ? cartsItem.quantity : 0;

          return (
            <div key={product.id} className="d-flex flex-row mb-4 p-5 shadow-lg rounded " style={{ justifyContent: "space-between", width: "1500px" }}>
              {/* Right Section */}
              <div className="d-flex flex-column align-items-center m-3">
                <div className="card position-relative mb-4">
                  {/* Action Icons */}
                  <div className="position-absolute top-0 start-0 m-2">
                    <button
                      className="iconB favorit btn-light"
                      onClick={() => handleAddFavorit(product.id)}
                    >
                      {favorit ? (
                        <i className="bi bi-suit-heart-fill text-danger"></i>
                      ) : (
                        <i className="bi bi-suit-heart"></i>
                      )}
                    </button>
                    <button className="iconB share btn-light" onClick={handleCopyLink}>
                      {isCopied ? (
                        <i className="bi bi-check-lg text-success"></i>
                      ) : (
                        <i className="bi bi-link-45deg"></i>
                      )}
                    </button>
                  </div>

                  {/* Product Images */}
                  {expandedImg && (
                    <div className="expanded-image-overlay">
                      <div className="expanded-image-container">
                        <span className="close-btn px-3 rounded-4" style={{backgroundColor:"rgba(63, 91, 122, 0.226)"}} onClick={closeImage}>
                          &times;
                        </span>
                        <img src={expandedImg} alt={imgText} />
                        <p>{imgText}</p>
                      </div>
                    </div>
                  )}

                  <img
                    src={
                      product.SubproductImages[0]?.productImageSrc ||
                      "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
                    }
                    alt={product.productName || "Product"}
                    className="card-img-top"
                  />

                  <div className="Products-imgs d-flex flex-row gap-3">
                    {product.SubproductImages.map((img, i) => (
                      <img
                        key={i}
                        src={img.productImageSrc || "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"}
                        alt={img.productName || "Product Image"}
                        onClick={() => handleImageClick(img.productImageSrc || "", img.productName || "")}
                        className="card-imgs shadow rounded border"
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Center Section */}
              <div className="d-flex flex-column mx-5 gap-1 p-4">
                <p className="fw-bold">{product.productName}</p>
                <p><strong>توضیحات محصول: </strong>{product.productDetails || "ثبت نشده"}</p>
                <p><strong>دسته بندی: </strong>{product.category || "ثبت نشده"}</p>
                <p><strong>برند: </strong>{product.brand}</p>
              </div>

              {/* Left Section */}
              <div className="LeftSection rounded shadow m-3 gap-5 p-4">
                <p className="fw-bold">ارسال رایگان</p>
                <p className="fw-bold">گارانتی اصالت و سلامت فیزیکی کالا</p>
                <p className="fw-bold">امتیاز های این محصول: 4.5</p>
                <div className="btncard">
                  <div className="d-flex flex-row-reverse align-items-center">
                    <p className="text-decoration-line-through text-danger">{product.mainPrice}</p>
                    <p className="badge bg-success mx-2">{product.discount}</p>
                    <p className="text-success"><strong>{product.finalPrice}</strong></p>
                  </div>
                  <CartButton
                    quantity={quantity}
                    onAdd={() => addition(product.id)}
                    onReduce={() => reduce(product.id)}
                  />
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default AboutProduct;
