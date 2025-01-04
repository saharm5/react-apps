import React, { useEffect } from "react";
import Header from "../components/Header";
import Banner from "../components/Banner";
import Categories from "../components/Categories";
import ProductGrid from "../components/ProductGrid";
import Brands from "../components/Brands";
import Footer from "../components/Footer";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../styles/global.css";

// import "vazir-font";

const MainPage: React.FC = () => {
  useEffect(() => {
    document.body.classList.add("body-main");

    return () => {
      document.body.classList.remove("body-main");
    };
  }, []);

  const categories = [
    {
      imageSrc: "./Img/kharbar.png",
      categoryName: "خواربار",
      categoryLink: "#",
    },
    {
      imageSrc: "./Img/Spice.png",
      categoryName: "ادویه و چاشنی",
      categoryLink: "#",
    },
    {
      imageSrc: "./Img/cannedfood.png",
      categoryName: " غذای آماده",
      categoryLink: "#",
    },
    {
      imageSrc: "./Img/kharbar.png",
      categoryName: "خواربار",
      categoryLink: "#",
    },
    {
      imageSrc: "./Img/cannedfood.png",
      categoryName: " غذای آماده",
      categoryLink: "#",
    },
    {
      imageSrc: "./Img/nezafat.png",
      categoryName: "نظافت خانه",
      categoryLink: "#",
    },
    {
      imageSrc: "./Img/kharbar.png",
      categoryName: "خواربار",
      categoryLink: "#",
    },
    {
      imageSrc: "./Img/cannedfood.png",
      categoryName: " غذای آماده",
      categoryLink: "#",
    },
    {
      imageSrc: "./Img/kharbar.png",
      categoryName: "خواربار",
      categoryLink: "#",
    },
    {
      imageSrc: "./Img/tanagholat.png",
      categoryName: "تنقلات",
      categoryLink: "#",
    },
    {
      imageSrc: "./Img/labaniat.png",
      categoryName: "لبنیات",
      categoryLink: "#",
    },
    {
      imageSrc: "./Img/behdashti.png",
      categoryName: " بهداشتی",
      categoryLink: "#",
    },
  ];

  const brandData = [
    { imageSrc: "./Img/mihan.png", BrandName: "میهن" },
    { imageSrc: "./Img/Tak.png", BrandName: "تک" },
    { imageSrc: "./Img/Yekvayek.png", BrandName: "یک و یک" },
    { imageSrc: " ./Img/cocacola.png", BrandName: "کوکاکولا" },
    { imageSrc: " ./Img/mazmaz.png", BrandName: "مزمز" },
    { imageSrc: " ./Img/Choopan.png", BrandName: "چوپان" },
    { imageSrc: " ./Img/pril.png", BrandName: "پریل" },
    { imageSrc: " ./Img/Kaleh.png", BrandName: "کاله" },
    { imageSrc: " ./Img/Mahram.png", BrandName: "مهرام" },
    { imageSrc: " ./Img/Damdaran.png", BrandName: "دامداران" },
    { imageSrc: " ./Img/Golestan.png", BrandName: "گلستان" },
    { imageSrc: " ./Img/ChinChin.png", BrandName: "چین چین" },
    { imageSrc: " ./Img/Minoo.png", BrandName: "مینو" },
    { imageSrc: " ./Img/3dots.png", BrandName: "بیشتر " },
  ];

  const products = [
    { id: 1 , name: "صابون", image: "./Img/soup.jpg", price: "13000 " },
    { id: 2 , name: "تن ماهی", image: "./Img/oila.webp", price: "15000 " },
    { id: 3 , name: "دوغ", image: "./Img/abali.jpg", price: "15500 " },
    { id: 4 , name: "کره", image: "./Img/kareh.jpg", price: "18800 " },
    { id: 5 , name: "کوکاکولا", image: "./Img/coca.jpg", price: "125500 " },
    { id: 6 , name: "ماست", image: "./Img/seven.jpg", price: "1255000 " },
    { id: 7 , name: "خمیردندان", image: "./Img/merident.webp", price: "12000 " },
    { id: 8 , name: "بادام زمینی", image: "./Img/badam.jpg", price: "12000 " },
    { id: 9 , name: "کرانچی", image: "./Img/chitoz2.webp", price: "12000 " },
    { id: 10, name: "چیپس چی توز", image: "./Img/chitoz.jpg", price: "12000 " },
    { id: 11, name: "رب", image: "./Img/rob.jpg", price: "12000 " },
    { id: 12, name: "ماکارونی", image: "./Img/mana.jpg", price: "12000 " },
    { id: 13, name: "چیپس مزمز", image: "./Img/mazmaz.jpg", price: "12000 " },
    { id: 14, name: "فانتا", image: "./Img/fanta.jpg", price: "12000 " },
    { id: 15, name: "صابون", image: "./Img/soup.jpg", price: "12000 " },
    { id: 16, name: "تن ماهی", image: "./Img/oila.webp", price: "12000 " },
    { id: 17, name: "دوغ", image: "./Img/abali.jpg", price: "12000 " },
    { id: 18, name: "کره", image: "./Img/kareh.jpg", price: "12000 " },
    { id: 19, name: "کوکاکولا", image: "./Img/coca.jpg", price: "12000 " },
    { id: 20, name: "کوکاکولا", image: "./Img/coca.jpg", price: "12000 " },
  ];

  return (
    <div>
      <Header />
      <Banner />
      <Categories categories={categories} />
      <ProductGrid products={products} />
      <Brands Brands={brandData} />
      <Footer />
    </div>
  );
};

export default MainPage;
