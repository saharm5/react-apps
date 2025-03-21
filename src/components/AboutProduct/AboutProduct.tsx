import React, { useState } from "react";
import "./AboutProduct.css";
import "bootstrap/dist/css/bootstrap.min.css";
import CartButton from "../CartButton/CartButton";
import { useNavigate } from "react-router-dom";
import FreeDelivery from "../../assets/svg/FreeDelivery";
import CheckShield from "../../assets/svg/CheckShield";
import Star from "../../assets/svg/Star";
import Payment from "../../assets/svg/Payment";

interface Image {
  product_name: string;
  productImageSrc: string;
}
interface Product {
  imageUrl: string | null;
  quantity: number;
  production_date: string | null;
  expiration_date: string | null;
  size: string | null;
  id: number;
  product_name: string;
  category: string | null;
  sub_category: string | null;
  product_details: string | null;
  brand: string;
  main_price: number;
  Discount: number;
  final_price: number;
  productImageSrc: Image[];
  is_favorite: boolean;
}
interface AboutProductProps {
  products: Product[];
  carts: { id: number; quantity: number }[];
  increasesQuantity: (id: number) => void;
  decreasesQuantity: (id: number) => void;
  handleAddFavorite: (id: number) => void;

}

const AboutProduct: React.FC<AboutProductProps> = ({ products, carts, increasesQuantity, decreasesQuantity, handleAddFavorite }) => {
  const navigate = useNavigate();
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [expandedImgIndex, setExpandedImgIndex] = useState<number | null>(null);
  const [imgText, setImgText] = useState<string>("");

  const handleSearchcategory = (category: string | null) => {
    navigate(`/Products?search=${encodeURIComponent(category ?? "")}`);
  };

  const handleSearchsubcategory = (sub_category: string | null) => {
    navigate(`/Products?search=${encodeURIComponent(sub_category ?? "‌")}`);
  };

  const handlebrand = (brand: string | null) => {
    navigate(`/Products?search=${encodeURIComponent(brand ?? "‌")}`);
  };

  const handleImageClick = (index: number, alt: string) => {
    setExpandedImgIndex(index);
    setImgText("");
  };

  const closeImage = () => {
    setExpandedImgIndex(null);
    setImgText("");
  };

  const handlePrevImage = (images: Image[]) => {
    if (expandedImgIndex !== null) {
      setExpandedImgIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : (prevIndex ?? images.length) - 1
      );
    }
  };

  const handleNextImage = (images: Image[]) => {
    if (expandedImgIndex !== null) {
      setExpandedImgIndex((prevIndex) => ((prevIndex ?? -1) + 1) % images.length);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch((error) => console.error("Error copying to clipboard:", error));
  };

  return (
    <div className="d-flex flex-column align-items-center">
      {products.length === 0 ? (
        <div>No products available. Please try again later.</div>
      ) : (
        products.map((product) => {
          const cartItem = carts.find((item) => item.id === product.id);
          const quantity = cartItem ? cartItem.quantity : product.quantity;
          return (
            <div
              key={product.id}
              className="d-flex flex-row my-4 p-5 rounded shadow justify-content-between AboutPmaindiv"
            >
              <div className="d-flex flex-row">
                {/* Right Section */}
                <div className="d-flex flex-column align-items-center m-3">
                  <div className="card position-relative mb-4">
                    {/* Action Icons */}
                    <div className="position-absolute top-0 start-0 m-2">
                      <button
                        className="iconB favorite btn-light"
                        onClick={() => handleAddFavorite(product.id)}
                      >
                        {product.is_favorite ? (
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
                            onClick={closeImage}
                          >
                            &times;
                          </span>
                          <img
                            src={
                              product.productImageSrc[expandedImgIndex]?.productImageSrc || ""
                            }
                            alt={imgText}
                            className="img-fluid rounded imgsS"
                          />
                          <div className="d-flex justify-content-center gap-3 mt-3">
                            <div className="d-flex justify-content-between">
                              <button
                                className="btn btn-outline position-absolute top-50 translate-middle-y AboutProductbtnL"
                                onClick={() =>
                                  handlePrevImage(product.productImageSrc)
                                }
                              >
                                <i className="bi bi-chevron-left AboutProductbtnicon"></i>
                              </button>
                              <button
                                className="btn btn-outline position-absolute top-50 translate-middle-y AboutProductbtnR"
                                onClick={() =>
                                  handleNextImage(product.productImageSrc)
                                }
                              >
                                <i className="bi bi-chevron-right AboutProductbtnicon"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="mb-3 shadow rounded-4">
                      <img
                        src={
                          product.productImageSrc[0]?.productImageSrc ||
                          "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
                        }
                        alt={product.product_name || "Product"}
                        className="card-img-top rounded-3"
                        onClick={() =>
                          handleImageClick(0, product.product_name || "Product")
                        }
                      />
                    </div>
                    <div className="Products-imgs d-flex flex-row gap-3 rounded">
                      {product.productImageSrc.map((img, i) => (
                        <img
                          key={i}
                          src={
                            img.productImageSrc ||
                            "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
                          }
                          alt={img.product_name || "Product Image"}
                          onClick={() =>
                            handleImageClick(i, img.product_name || "Product Image")
                          }
                          className="card-imgs shadow rounded border"
                        />
                      ))}
                    </div>
                  </div>
                </div>
                {/* Center Section */}
                <div className="d-flex flex-column mx-5 gap-1 p-4">
                  <div>
                    <p id="product_name" className="fw-bold product_name">
                      {product.product_name}
                    </p>
                    <p id="product_details" className="productDetails">
                      <strong>توضیحات محصول : </strong>
                      {product.product_details}
                    </p>
                    <div id="category" className="productcategory">
                      <strong> دسته بندی : </strong>
                      <div onClick={() => handleSearchcategory(product.category)}>
                        {product.category} </div> |
                      <div onClick={() => handleSearchsubcategory(product.sub_category)}>
                        {product.sub_category}</div>
                    </div>
                    <div id="brand" className="productbrand" onClick={() => handlebrand(product.brand)}>
                      <strong> برند:</strong>
                      <p>
                        {product.brand}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="my-2 fw-bold">ویژگی های محصول:</p>
                    <ul className="px-2 ulsize">
                      <li className="d-block">
                        <p className="m-0">
                          تاریخ تولید: {product.production_date || "ثبت نشده"}
                        </p>
                      </li>
                      <li className="d-block">
                        <p className="m-0">
                          تاریخ انقضا: {product.expiration_date || "ثبت نشده"}
                        </p>
                      </li>
                      <li className="d-block">
                        <p className="m-0">
                          ابعاد بسته بندی: {product.size || "ثبت نشده"}
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* Left Section */}
              <div className="LeftSection position-relative rounded shadow m-3 gap-5 p-4">
                <div>
                  <div className="d-flex flex-row mb-3 gap-2">
                    <FreeDelivery /> ارسال رایگان
                  </div>
                  <div className="d-flex flex-row mb-3 gap-2">
                    <CheckShield /> گارانتی سلامت فیزیکی کالا
                  </div>
                  <div className="d-flex flex-row mb-3 gap-2">
                    <Star /> امتیاز های این محصول: 4.5
                  </div>
                  <div className="d-flex flex-row mb-3 gap-2">
                    <Payment /> پرداخت درب منزل
                  </div>
                </div>
                <div className="btncard">
                  <div className="d-flex flex-column align-items-end gap-2 m-3">
                    <div className="d-flex flex-row gap-2">
                      <p className="text-decoration-line-through text-muted m-0 AboutProductpS">
                        {product.main_price.toLocaleString()} تومان
                      </p>
                      <p className="badge mb-1 p-1 AboutProductpB">
                        % {product.Discount}
                      </p>
                    </div>
                    <p className="m-0 AboutProductpSS">
                      <strong>{product.final_price.toLocaleString()} تومان</strong>
                    </p>
                  </div>
                  <div style={{ width: "186.53px" }}>
                    <CartButton
                      quantity={quantity}
                      onAdd={() => increasesQuantity(product.id)}
                      onReduce={() => decreasesQuantity(product.id)}
                      addcard="افزودن به سبد خرید"
                    />
                  </div>
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
