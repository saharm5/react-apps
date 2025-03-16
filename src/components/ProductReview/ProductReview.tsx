import React, { useEffect, useState } from "react";
import { fetchProducts } from "../../server/api";
import Star from "../../assets/svg/Star";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ReviewMultiStepModal from "../ReviewMultiStepModal";
import "./ProductReview.css"

interface Product {
    id: number;
    reviewtitle: string;
    reviewdetail: string;
    customerrating: number;
    customername: string;
    productaveragerate:number;
}

const ProductReview: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const rating = 4.80;
    const fullStars = Math.floor(rating);
    const fractionalPart = rating - fullStars;
    const totalStars = fractionalPart > 0 ? fullStars + 1 : fullStars;
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchProducts(`api/data`);
                setProducts(data);
            } catch (err) {
                console.error("Failed to fetch products");
            }
        };

        fetchData();
    }, []);

    return (
        <div className="d-flex flex-row rounded shadow-lg p-5 gap-5 my-5 productReviewContainer">

            {/* Left side: Show ratings*/}
            <div className="d-flex flex-column w-25 justify-content-between px-4 LeftDiv">
                <div>
                    <p className="fw-bold fs-5 m-0">امتیاز و دیدگاه کاربران</p>
                </div>
                <div className="mb-3 d-flex flex row">
                    <div className="d-flex flex-start">
                        <p className="px-2">امتیاز این محصول: {rating}</p>
                    </div>
                    <div className="d-flex flex-row align-items-center gap-1 px-4">
                        {[...Array(totalStars)].map((_, index) => (
                            <Star key={index} />
                        ))}
                    </div>
                </div>
                <div className="d-flex flex-column justify-content-between mt-3 ReviewButton">
                    <button className="btn my-2 ReviewButton" onClick={() => setShowModal(true)}>
                        ثبت امتیاز و دیدگاه
                    </button>
                    <ReviewMultiStepModal show={showModal} handleClose={() => setShowModal(false)} />
                </div>
            </div>

            {/*Right side:list of reviews*/}
            <div className="w-75 overflow-auto px-3 my-3 RightDiv">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="card mb-3 ReviewCard"
                    >
                        <div className="card-header py-1 d-flex flex-row justify-content-between">
                            <div className="my-1">
                                <span className="fw-bold mx-1">
                                    عنوان نظر
                                    {product.reviewtitle}
                                </span>
                                <span className="mx-2">
                                    امتیاز مشتری
                                    {product.customerrating}
                                </span>
                            </div>
                            <p className="text-muted my-1 CommentersName">
                                نام مشتری
                                {product.customername}
                            </p>
                        </div>
                        <div className="card-body pt-3 p-4">
                            <p className="card-text ">
                                {/* متن نظر */}
                                {product.reviewdetail}
                                متن نظر متن نظر
                                <br /> متن نظر
                                متن نظر

                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductReview;
