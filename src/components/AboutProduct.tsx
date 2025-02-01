import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AboutProduct.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { fetchProducts } from "../server/api"; // Assume this function exists
import CartButton from "./CartButton"; // Importing the new component
import { useSearchParams } from "react-router-dom";
import FreeDelivery from "../assets/svg/FreeDelivery";
import CheckShield from "../assets/svg/CheckShield";
import Star from "../assets/svg/Star";
import Payment from "../assets/svg/Payment"



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
  const [expandedImgIndex, setExpandedImgIndex] = useState<number | null>(null);
  const [imgText, setImgText] = useState<string>("");
  const [params, setParams] = useSearchParams()
  const value = params.get('id')
  // Handle image click to expand
  const handleImageClick = (index: number, alt: string) => {
    setExpandedImgIndex(index);
    setImgText("");
  };

  // Close the expanded image
  const closeImage = () => {
    setExpandedImgIndex(null);
    setImgText("");
  };

  // Navigate to previous image
  const handlePrevImage = (images: Image[]) => {
    if (expandedImgIndex !== null) {
      setExpandedImgIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : (prevIndex || images.length) - 1));
    }
  };

  // Navigate to next image
  const handleNextImage = (images: Image[]) => {
    if (expandedImgIndex !== null) {
      setExpandedImgIndex((prevIndex) => ((prevIndex || -1) + 1) % images.length);
    }
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
        const data = await fetchProducts("http://localhost:8000/data1?id=" + value);
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
            <div
              key={product.id}
              className="d-flex flex-row mb-5 p-5 rounded shadow-lg"
              style={{ justifyContent: "space-between", width: "1500px" }}
            >
              <div className="d-flex flex-row">
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
                    {expandedImgIndex !== null && (
                      <div className="expanded-image-overlay">
                        <div className="expanded-image-container d-flex flex-column align-items-center">
                          <span
                            className="close-btn px-3 rounded-4 mb-2"
                            style={{ backgroundColor: "rgba(63, 91, 122, 0.226)" }}
                            onClick={closeImage}
                          >
                            &times;
                          </span>
                          <img
                            src={
                              product.SubproductImages[expandedImgIndex]?.productImageSrc || ""
                            }
                            alt={imgText}
                            style={{ height: "750px", width: "750px" }}
                            className="img-fluid rounded"
                          />
                          <div className="d-flex justify-content-center gap-3 mt-3">
                            <div className="d-flex justify-content-between">
                              <button
                                className="btn btn-outline position-absolute top-50 translate-middle-y"
                                style={{ left: "0", height: "600px", border: "none" }}
                                onClick={() => handlePrevImage(product.SubproductImages)}
                              >
                                <i className="bi bi-chevron-left" style={{ fontSize: "20px" }}></i>
                              </button>
                              <button
                                className="btn btn-outline position-absolute top-50 translate-middle-y"
                                style={{ right: "0", height: "600px", border: "none" }}
                                onClick={() => handleNextImage(product.SubproductImages)}
                              >
                                <i className="bi bi-chevron-right" style={{ fontSize: "20px" }}></i>
                              </button>
                            </div>

                          </div>
                        </div>
                      </div>
                    )}

                    <div className="mb-3 shadow-lg rounded-5 ">
                      <img
                        src={
                          product.SubproductImages[0]?.productImageSrc ||
                          "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
                        }
                        alt={product.productName || "Product"}
                        className="card-img-top"
                        onClick={() => handleImageClick(0, product.productName || "Product")}
                      />
                    </div>
                    <div className="Products-imgs d-flex flex-row gap-3 rounded">
                      {product.SubproductImages.map((img, i) => (
                        <img
                          key={i}
                          src={
                            img.productImageSrc ||
                            "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
                          }
                          alt={img.productName || "Product Image"}
                          onClick={() => handleImageClick(i, img.productName || "Product Image")}
                          className="card-imgs shadow rounded border"
                        />
                      ))}
                    </div>
                  </div>
                </div>
                {/* center Section */}
                <div className="d-flex flex-column mx-5 gap-1 p-4">
                  <div>
                    <p id="productName" className="fw-bold productName">
                      {product.productName}
                    </p>
                    <p id="productDetails" className="productDetails">
                      <strong>توضیحات محصول : </strong>
                      {product.productDetails}
                    </p>
                    <p id="category" className="productcategory">
                      <strong> دسته بندی : </strong>
                      <a href="#">{product.category}</a>
                    </p>
                    <p id="brand" className="productbrand">
                      <strong> برند:</strong> <a href="#">{product.brand}</a>
                    </p>
                  </div>
                  <div>
                    <p className="my-2 fw-bold">ویژگی های محصول:</p>
                    <ul className="px-2 ulsize">
                      <li className="d-block ">
                        <p className="m-0"> تاریخ تولید: {product.productName || "ثبت نشده"}</p>
                      </li>
                      <li className="d-block">
                        <p className="m-0"> تاریخ انقضا: {product.productName || "ثبت نشده"}</p>
                      </li>
                      <li className="d-block">
                        <p className="m-0"> ابعاد بسته بندی: {product.productName || "ثبت نشده"}</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* Left Section */}
              <div className="LeftSection rounded shadow m-3 gap-5 p-4">
                <div className="d-flex fw-bold flex-row mb-3 gap-2">
                  <FreeDelivery /> ارسال رایگان
                </div>
                <div className="d-flex fw-bold flex-row mb-3 gap-2">
                  <CheckShield />
                  گارانتی سلامت فیزیکی کالا
                </div>
                <div className="d-flex fw-bold flex-row mb-3 gap-2">
                  <Star />
                  امتیاز های این محصول: 4.5
                </div>
                <div className="d-flex fw-bold flex-row mb-3 gap-2">
                  <Payment />
                  پرداخت درب منزل
                </div>

                <div className="btncard">
                  <div className="d-flex flex-row-reverse align-items-center">
                    <p className="text-decoration-line-through text-danger">
                      {product.mainPrice}
                    </p>
                    <p className="badge bg-success mx-2">{product.discount}</p>
                    <p className="text-success">
                      <strong>{product.finalPrice}</strong>
                    </p>
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
