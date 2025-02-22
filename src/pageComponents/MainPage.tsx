import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import Banner from "../components/Banner/Banner";
import Categories from "../components/Categories/Categories";
import Brands from "../components/Brands/Brands";
import Footer from "../components/Footer/Footer";
import FooterResponsive from "../components/FooterResponsive/FooterResponsive";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../styles/global.css";
import useBodyClass from "../components/useBodyClass/useBodyClass";
import ProductGrid2 from "../components/ProductsGrid/ProductGrid2";

const MainPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useBodyClass("body-main");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      console.log("Loading complete!");
    }, 1000);

    return () => clearTimeout(timer);
  }, []);


  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <Header />
          <div className="mp">
            <Banner />
            <Categories />
            <div className="mainproductcard">
              <div className="maintabe">
                <p className="ptabe">محصولات ویژه</p>
              </div>
              <div className="scroll-container">
                <ProductGrid2 />
              </div>
            </div>
            <Brands />
          </div>
          <FooterResponsive />
          <Footer />
        </div>
      )}
    </div>
  );
};

export default MainPage;
