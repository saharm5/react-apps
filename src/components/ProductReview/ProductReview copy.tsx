import React, { useEffect, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Star from "../../assets/svg/Star";
import { Link } from "react-router-dom";
import { fetchProducts } from "../../server/api";
interface product {
    id: number;
}

const ProductReview: React.FC = () => {
    const rating = 4.80;
    const fullStars = Math.floor(rating);
    const fractionalPart = rating - fullStars;
    const totalStars = fractionalPart > 0 ? fullStars + 1 : fullStars;

    const [product, setProduct] = useState<product[]>([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchProducts(`api/data`);
                setProduct(data);
            } catch (err) {
                console.error("Failed to fetch products");
            }
        };

        fetchData();
    }, []);
    return (
        <div className="d-flex flex-row rounded shadow-lg p-5 gap-5 my-5">
            <div className="d-flex flex-column w-25 justify-content-between px-4" style={{ height: "300px" }}>
                <div>
                    <p className="fw-bold fs-5 m-0">امتیاز و دیدگاه کاربران</p>
                </div>
                <div className="mb-3 d-flex flex row">
                    <div className=" d-flex flex-start">
                        <p className="px-2 ">امتیاز این محصول: {rating}</p>
                    </div>
                    <div className="d-flex flex-row align-items-center gap-1 px-4">
                        {[...Array(totalStars)].map((_, index) => (
                            <Star key={index} />
                        ))}
                    </div>
                </div>

                <div className="d-flex flex-column justify-content-between mt-3">
                    <p className="text-muted m-2" style={{ fontSize: "13px" }}>شما هم درباره این کالا دیدگاه ثبت کنید.</p>
                    <div className="btn my-2" style={{ backgroundColor: "rgb(230, 242, 252)", color: "#133e87" }}>
                        <Link to="/Review" className="text fw-bold text-decoration-none fs-6" style={{ color: "#133e87" }}>
                            ثبت دیدگاه
                        </Link>
                    </div>
                </div>
            </div>
            <div className="w-75 overflow-auto p-3" style={{ height: "500px" }}>
                {product.map((product) => (
                    <div key={product.id} className="card mb-3" style={{ maxWidth: "100%", backgroundColor: "rgb(230, 242, 252)", color: "#133e87" }}>
                        <div className="card-header py-1 d-flex flex-row justify-content-between">
                            <div className="my-1">
                                <span className="fw-bold mx-1">
                                    عنوان نظر
                                </span>
                                <span className="mx-2">
                                    امتیاز مشتری
                                </span>
                            </div>
                            <p className="text-muted my-1" style={{ fontSize: "14px" }}> نام مشتری</p>
                        </div>
                        <div className="card-body pt-3 p-4">
                            <p className="card-text">
                                متن نظر
                                <br />
                                لورم ایپسوم دولور سیت آمیت، کانسکتتور آدیپیسینگ الیت. نولا فاسیلیسی. ساسپندیسه پوتنتی. فوسه اید جاستو آک لورم وینناتیس تینسیدنت. پروین اجت لاکوس ات ساپیئن فریترا دابیوس. نام آک نونک ول لیگولا آلترسوس آلیکام. سد اوت فلیس ول تورپیس فریترا مالسوادا نون نون تورتور
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductReview;
