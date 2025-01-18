import React, { useEffect } from "react";
import FooterResponsive from "../components/FooterResponsive";
import "../styles/global.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ProductAbout: React.FC = () => {




    useEffect(() => {
        document.body.classList.add("body-main");

        return () => {
            document.body.classList.remove("body-main");
        };
    }, []);


    return (
        <div>
            <Header />
            <div>
                {/* compoments */}
            </div>
            <FooterResponsive />
            <Footer />
        </div>
    );
};

export default ProductAbout;
