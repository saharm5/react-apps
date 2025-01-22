import React, { useState, useEffect } from "react";
import FooterResponsive from "../components/FooterResponsive";
import "../styles/global.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AboutProduct from "../components/AboutProduct";
import { fetchProducts } from '../server/api'; // Assume this function exists



const ProductDetails: React.FC = () => {
    // const [isLoading, setIsLoading] = useState(true);
    const [product, setProduct] = useState<any>(null); // Define product state
    const [error, setError] = useState<string | null>(null);



    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchProducts('http://127.0.0.1:8000/data/?limit=10'); // Fetch single product
                setProduct(data);
            } catch (error) {
                setError('Failed to fetch product details');
            }
        };

        fetchData();
    }, []);


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
            {product.map(() => (
                <AboutProduct
                    imagesrc={product.imageSrc}
                    category={product.category}
                    SubCategory={product.SubCategory}
                    title={product.title}
                    imagealt={product.imagealt}
                    imagessrc={product.imagessrc}
                    discription={product.discription}
                    brand={product.brand}
                    mainprice={product.mainprice}
                    Discount={product.Discount}
                    finalprice={product.finalprice}
                />
            ))}
            {/* <similar products /> */}
            {/* <product's Reviews /> */}
            {/* )} */}
            <FooterResponsive />
            <Footer />
        </div>
    );
};

export default ProductDetails;





