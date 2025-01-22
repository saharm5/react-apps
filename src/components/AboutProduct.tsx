
import React, { useState } from "react";
import axios from "axios";
import "./AboutProduct.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Define interfaces for props
interface AboutProductProps {
    imagesrc: string | null;
    imagealt: string;
    title: string;
    category: string | null;
    imagessrc: string;
    SubCategory: string | null;
    discription: string | null;
    brand: string;
    mainprice: number;
    Discount: number;
    finalprice: number;
}


const AboutProduct: React.FC<AboutProductProps> = ({
    imagessrc,
    imagesrc,
    category,
    SubCategory,
    imagealt,
    title,
    discription,
    brand,
    mainprice,
    Discount,
    finalprice,
}) => {
    const [favorit, setFavorit] = useState<boolean>(false);
    const [isCopied, setIsCopied] = useState<boolean>(false);

    // Handle adding/removing from favorites
    const handleAddFavorit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (favorit === false) {
            setFavorit(true);
            try {

                const response = await axios.get("http://127.0.0.1:8000/save-data/", {
                    params: {
                        data: window.location.href,
                    }
                });
                console.log(response.data);
                postMessage('Data saved successfully!');
            } catch (error) {
                postMessage('Error saving data');
                console.error(error);
            }
        } else {
            setFavorit(false);
        }
    };


    const handleCopyLink = () => {
        navigator.clipboard
            .writeText(window.location.href)
            .then(() => {
                setIsCopied(true);
                setTimeout(() => setIsCopied(false), 2000);
            })
            .catch((error) => {
                console.error('Error copying to clipboard:', error);
            });
    };

    return (
        <div className="d-flex flex-row">
            {/* Right Section */}
            <div className="d-flex flex-column align-items-center" style={{ maxWidth: "250px" }}>
                {/* img container */}
                <div className="card position-relative mb-3">
                    {/* Cardicons */}
                    <div className="position-absolute top-0 start-0 m-2">
                        {/* Favorite true */}
                        <button className="btnI iconB favorit btn-light"
                            onClick={handleAddFavorit}>
                            {favorit ? (
                                <i className="bi bi-suit-heart-fill text-danger"></i>
                            ) : (
                                <i className="bi bi-suit-heart"></i>
                            )}
                        </button>
                        <button className="btnI iconB share btn-light"
                            onClick={handleCopyLink}>
                            {isCopied ? (
                                <i className="bi bi-check-lg text-success"></i>
                            ) : (
                                <i className="bi bi-link-45deg"></i>
                            )}
                        </button>
                    </div>
                    {/* Image */}
                    <img
                        src={imagesrc || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs9gUXKwt2KErC_jWWlkZkGabxpeGchT-fyw&s"}
                        className="card-img-top"
                        alt="Product"
                    />
                </div>
                {/* imgs container */}
                <div className="Products-imgs d-flex flex-row gap-3">

                
                    <div className="">
                        <img
                            src={imagessrc}
                            alt={imagealt || "Image"}
                            // key={index}
                            className="card-imgs"
                        /></div>
                  
                </div>
            </div>
            {/* Left Section */}
            <div className="d-flex flex-row">
                {/* about product */}
                <div className="d-flex flex-column">
                    <div>
                        <p id="title">{title}</p>
                        <p id="discription">{discription}</p>
                        <p id="category">{category}</p>
                        <p id="brand">{brand}</p>
                        {/* div price */}
                        <div>
                            <p id="mainprice">{mainprice}</p>
                            <p id="Discount">{Discount}</p>
                            <p id="finalprice">{finalprice}</p>
                        </div>

                    </div>
                    {/* btn add to card */}
                    <div>

                    </div>
                </div>
                {/* Product Features */}
                <div>
                    <h6>ویژگی های محصول</h6>
                    <ul>
                    
                        <li>
                            {category}: {SubCategory}
                        </li>
                      
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AboutProduct;











