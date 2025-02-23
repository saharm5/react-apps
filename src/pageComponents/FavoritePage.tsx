import React from "react";
import Favorite from "../components/Favorite/Favorite";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import useBodyClass from "../components/useBodyClass/useBodyClass";
import "bootstrap/dist/css/bootstrap.min.css";

const FavoritePage: React.FC = () => {
    useBodyClass("body-main");

    return (
        <div>
            <Header />
            <div className="p-5  d-flex justify-content-center">
                <Favorite />
            </div>
            <Footer />

        </div>
    );
};

export default FavoritePage;
