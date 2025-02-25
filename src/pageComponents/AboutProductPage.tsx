// C: \Users\Sanay\react - apps\src\pageComponents\AboutProductPage.tsx
import React, { useEffect, useState } from "react";
import FooterResponsive from "../components/FooterResponsive/FooterResponsive";
import "../styles/global.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/Header/Header";
import useBodyClass from "../components/useBodyClass/useBodyClass"
import Footer from "../components/Footer/Footer";
import AboutProduct from "../components/AboutProduct/AboutProduct";
import ProductGrid2 from "../components/ProductsGrid/ProductGrid2";
import { submitForm } from "../server/api";


const ProductDetails: React.FC = () => {

   
   
    useBodyClass("body-main");

    return (
        <div>
            <Header />
            <div className=" d-flex flex-column align-items-center bodyproductcard">
                <div className="productcarddiv">
                    <AboutProduct/>
                    <div className=" shadow-lg rounded mainproductcard" style={{ margin: "1% 0 ", padding: "1.5%", overflow: "auto" }}>
                        {/* Tabs */}
                        <div className="maintabe">
                            <h5 className="ptabe" style={{ fontSize: "20px" }}>محصولات مشابه</h5>
                        </div>
                        <div className="not-scroll-container">
                            <ProductGrid2 />
                        </div>
                    </div>
                </div>
            </div>
            <FooterResponsive />
            <Footer />
        </div>
    );
};

export default ProductDetails;
