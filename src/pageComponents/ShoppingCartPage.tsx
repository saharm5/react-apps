import React from "react";
import ShoppingCart from "../components/ShoppingCart/ShoppingCart";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import useBodyClass from "../components/useBodyClass/useBodyClass";
import "bootstrap/dist/css/bootstrap.min.css";
import CheckoutCart from "../components/CheckoutCart/CheckoutCart";

const ShoppingCartPage: React.FC = () => {
    useBodyClass("body-main");

    return (
        <div>
            <Header />
            <div className="p-5  d-flex justify-content-center">
                <ShoppingCart />
                <CheckoutCart />
            </div>
            <Footer />

        </div>
    );
};

export default ShoppingCartPage;
