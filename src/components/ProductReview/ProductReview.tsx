// C:\Users\Sanay\react-apps\src\components\ProductReview\ProductReview.tsx
import React, { useState } from "react";
import Star from "../../assets/svg/Star";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ReviewMultiStepModal from "./ReviewMultiStepModal/ReviewMultiStepModal";
import "./ProductReview.css";

interface Product {
    id: number;
    imageUrl: string | null;
    product_name: string;
}

interface review {
    id: number;
    product_name: string;
    reviewdetail: string;
    customerrating: number;
    customername: string;
}
interface ProductReviewtProps {
    products: Product[];
    reviews: review[];
    effectiveRating: number;
}

const ProductReview: React.FC<ProductReviewtProps> = ({ products, reviews, effectiveRating }) => {

    const fullStars = Math.floor(effectiveRating);
    const fractionalPart = effectiveRating - fullStars;
    const totalStars = fractionalPart > 0 ? fullStars + 1 : fullStars;
    const validTotalStars = Number.isFinite(totalStars) && totalStars > 0 ? totalStars : 0;
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="d-flex flex-row rounded shadow-lg p-5 gap-5 my-5 productReviewContainer">
            {/* Left side: Show ratings*/}
            <div className="d-flex flex-column w-25 justify-content-between px-4 LeftDiv">
                <div>
                    <p className="fw-bold fs-5 m-0">امتیاز و دیدگاه کاربران</p>
                </div>
                <div className="mb-3 d-flex flex-column">
                    <div className="d-flex flex-start align-items-baseline">
                        <p className="">امتیاز این محصول:</p>
                        <p className="px-2 fontsizecustom"> 5 / <span className="fs-5 fw-bold">{effectiveRating.toFixed(1)}</span></p>
                    </div>
                    <div className="d-flex flex-row align-items-center gap-1 px-4">
                        {[...Array(validTotalStars)].map((_, index) => (
                            <Star key={index} />
                        ))}
                    </div>
                </div>
                <div className="d-flex flex-column justify-content-between mt-3 ReviewButton">
                    <button className="btn my-2 ReviewButton" onClick={() => setShowModal(true)}>
                        ثبت امتیاز و دیدگاه
                    </button>
                    <ReviewMultiStepModal
                        show={showModal}
                        handleClose={() => setShowModal(false)}
                        products={products.map((product) => ({
                            key: product.id,
                            id: product.id,
                            product_name: product.product_name,
                            imageUrl: product.imageUrl
                        }))}
                    />
                </div>
            </div>
            {/*Right side:list of reviews*/}
            <div className="w-75 overflow-auto px-3 my-3 RightDiv">
                {reviews.map((review) => (
                    <div key={review.id} className="card mb-3 ReviewCard">
                        <div className="card-header py-1 d-flex flex-row justify-content-between">
                            <div className="my-1">
                                <span className="fw-bold mx-1">
                                    {/* عنوان نظر */}
                                    {review.product_name}
                                </span>
                                <span className="mx-2">
                                    {/* امتیاز مشتری */}
                                    {review.customerrating}
                                </span>
                            </div>
                            <p className="text-muted my-1 CommentersName">
                                {/* نام مشتری */}
                                {review.customername}
                            </p>
                        </div>
                        <div className="card-body pt-3 p-4">
                            <p className="card-text ">
                                {/* متن نظر */}
                                {review.reviewdetail}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductReview;
