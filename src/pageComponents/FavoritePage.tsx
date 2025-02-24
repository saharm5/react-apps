import React from "react";
import Favorite from "../components/Favorite/Favorite";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import useBodyClass from "../components/useBodyClass/useBodyClass";
import "bootstrap/dist/css/bootstrap.min.css";
import FooterResponsive from "../components/FooterResponsive/FooterResponsive";

const FavoritePage: React.FC = () => {
    useBodyClass("body-main");

    return (
        <div>
            <Header />
            <div className="p-5  d-flex justify-content-center">
                <Favorite />
            </div>
            <FooterResponsive />
            <Footer />

        </div>
    );
};

export default FavoritePage;
