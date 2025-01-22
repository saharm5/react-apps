import React, { useEffect } from "react";
import FooterResponsive from "../components/FooterResponsive";
import "../styles/global.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AboutProduct from "../components/AboutProduct";



const ProductDetails: React.FC = () => {
    // const [isLoading, setIsLoading] = useState(true);






    useEffect(() => {
        document.body.classList.add("body-main");

        return () => {
            document.body.classList.remove("body-main");
        };
    }, []);


    return (
        <div>
            <Header />
            {/* {isLoading ? (
                <p>Loading...</p> // Show loading state
            ) : ( */}

            <AboutProduct />

            {/* <similar products /> */}
            {/* <product's Reviews /> */}
            {/* )} */}
            <FooterResponsive />
            <Footer />
        </div>
    );
};

export default ProductDetails;





