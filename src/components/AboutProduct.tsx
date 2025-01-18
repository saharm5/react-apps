
import React, { useState } from "react";
import "./AboutProduct.css";
import "bootstrap/dist/css/bootstrap.min.css";


const AboutProduct: React.FC = () => {
    const [favorit, setFavorit] = useState<string>("");
    const [isCopied, setIsCopied] = useState<boolean>(false);


    const handleAddFavorit = (icon: string) => {
        setFavorit(favorit === icon ? "" : icon);
    };

    const handleCopyLink = () => {
        navigator.clipboard
            .writeText(window.location.href) // Copies the current page's URL
            .then(() => {
                setIsCopied(true); // Mark as copied
                setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
            })
    };

    return (
        <div>
            {/* left */}
            <div></div>
            {/* right */}
            <div>
                {/* img container */}
                <div className="container d-flex justify-content-center align-items-center vh-100">
                    {/* Card */}
                    <div className="card position-relative">
                        {/* Icons */}
                        <div className="position-absolute top-0 start-0 m-2 d-flex flex-column">
                            {/* Favorite Icon */}
                            <button
                                className={`btn icon ${favorit === "favorit" ? "active" : ""}`}
                                onClick={() => handleAddFavorit("favorit")}
                            >
                                {favorit ? (
                                    <i className="bi bi-suit-heart-fill  text-danger"></i>
                                ) : (
                                    <i className="bi bi-suit-heart"></i>
                                )}
                            </button>
                            {/* Share Icon */}
                            <button
                               className="btn icon share"
                                onClick={handleCopyLink}
                            >
                                {isCopied ? (
                                    <i className="bi bi-check-lg text-success"></i>
                                ) : (
                                    <i className="bi bi-link-45deg"></i>
                                )}
                            </button>
                        </div>
                        {/* Image */}
                        <img
                            src="https://asset.okala.com/unsigned/rs:fill/size:192:192/quality:100/plain/s3://cdn/product/379324.png"
                            className="card-img-top"
                            alt="Product"
                        />
                    </div>
                </div>
                {/* imgs container */}
                <div></div>
            </div>
        </div>
    )
}
export default AboutProduct;

























































