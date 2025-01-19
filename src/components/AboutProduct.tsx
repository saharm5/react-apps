import React, { useState } from "react";
import "./AboutProduct.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';

const AboutProduct: React.FC = () => {
    const [favorit, setFavorit] = useState<boolean>(false);
    const [isCopied, setIsCopied] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');

    // Handle adding/removing from favorites
    const handleAddFavorit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (favorit === false) {
            setFavorit(true);
            try {

                const response = await axios.get("http://localhost:8000/save-data/", {
                    params: {
                        data: window.location.href,  // Correct the query parameter name
                    }
                });
                console.log(response.data);  // Log the server response for debugging
                postMessage('Data saved successfully!');

                // await axios.get("http://localhost:8000/regmsg/", {
                //     params: {
                //         url: window.location.href,
                //     }
                // });
                // postMessage('Data saved successfully!');
            } catch (error) {
                postMessage('Error saving data');
                console.error(error);
            }
        } else {
            setFavorit(false);
        }
    };

    // Handle copying the URL to clipboard
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
    // Function to display message
    const postMessage = (msg: string) => {
        setMessage(msg);
        setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
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
                            {/* Favorite true */}
                            <button
                                className={`btn ${favorit ? "active" : ""}`}
                                onClick={handleAddFavorit}
                            >
                                {favorit ? (
                                    <i className="bi bi-suit-heart-fill text-danger"></i>
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
                {/* Feedback message */}
                {message && <div>{message}</div>}
                {/* imgs container */}
                <div></div>
            </div>
        </div>
    );
};

export default AboutProduct;