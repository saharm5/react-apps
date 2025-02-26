import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { fetchProducts } from "../../server/api";

interface Product {
    id: number;
    main_price: number;
    Discount: number;
    final_price: number;
    quantity: number;
}

const CheckoutCart: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [sumMainPrice, setSumMainPrice] = useState<number>(0);
    const [sumFinalPrice, setSumFinalPrice] = useState<number>(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchProducts(`/AddCart/list/`);
                setProducts(data);
                const totalMain = data.reduce((SumMainPrice: number, product: Product) => SumMainPrice + (product.main_price * product.quantity), 0);
                const totalFinal = data.reduce((sumFinalPrice: number, product: Product) => sumFinalPrice + (product.final_price * product.quantity), 0);

                setSumMainPrice(totalMain);
                setSumFinalPrice(totalFinal);
            } catch (err) {
                console.error("Failed to fetch products");
            }
        };

        fetchData();
    }, []);

    const discountTotalPrice = sumMainPrice - sumFinalPrice;
    const discountTotal = Math.ceil((discountTotalPrice * 100) / sumMainPrice)||0;


    return (
        <div className="w-25 px-3">
            <div className="CheckoutCart position-relative rounded shadow mx-3 gap-5 p-4">
                <div>
                    <div className="d-flex flex-row justify-content-between p-2">
                        <p className=" fw-bold">قیمت کالاها</p>
                        <p>{sumMainPrice} تومان</p>
                    </div>
                    <div className="d-flex flex-row justify-content-between p-2">
                        <p className="text-danger fw-bold ">سود شما از خرید</p>
                        <p>
                            <span className=" text-danger AboutProductpS px-1">
                                ({discountTotal}%)
                            </span>
                            {discountTotalPrice} تومان
                        </p>
                    </div>
                    <div className="d-flex flex-row justify-content-between p-2">
                        <p className=" fw-bold">جمع سبد خرید</p>
                        <p className="">{sumFinalPrice} تومان</p>
                    </div>
                </div>

                <div className="d-flex justify-content-center my-3">
                    <button className="btn w-100 border" style={{ backgroundColor: "rgb(214, 230, 242)" }}>
                        تکمیل سفارش
                    </button>
                </div>
                <div className="d-flex align-items-end">
                    <p className="text-muted m-0 AboutProductpS">
                        مراحل سفارشتان تکمیل نشده در صورت اتمام موجودی، کالاها حذف می‌شوند.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CheckoutCart;
