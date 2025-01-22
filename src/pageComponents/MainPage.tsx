import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Banner from "../components/Banner";
import Categories from "../components/Categories";
import ProductGrid from "../components/ProductGrid";
import Brands from "../components/Brands";
import Footer from "../components/Footer";
import FooterResponsive from "../components/FooterResponsive";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../styles/global.css";
import { fetchProducts } from '../server/api'; 

interface Product {
  id: number;
  title: string;
  price: number;
  imageSrc: string;
  description: string;
  rating: number;
}

const MainPage: React.FC = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [cart, setCart] = useState<{ id: number; quantity: number }[]>([]);



  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      console.log("Loading complete!");
    }, 1000);

    return () => clearTimeout(timer);
  }, []);


  useEffect(() => {
    document.body.classList.add("body-main");
    
    return () => {
      document.body.classList.remove("body-main");
    };
  }, []);



  const increaseQuantity = (id: number) => {
    setCart((prev) => {
      const existingProduct = prev.find((item) => item.id === id);
      if (existingProduct) {
        return prev.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { id, quantity: 1 }];
    });
  };

  const decreaseQuantity = (id: number) => {
    setCart((prev) => {
      const existingProduct = prev.find((item) => item.id === id);
      if (existingProduct?.quantity === 1) {
        return prev.filter((item) => item.id !== id);
      }
      return prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      );
    });
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProducts('http://127.0.0.1:8000/data/?limit=10');
        setProducts(data); 
      } catch (error) {
        setError('Failed to fetch products');
      }
    };

    fetchData();
  }, []);
  
  const categories = [
    {
      imageSrc: "./src/assets/Img/kharbar.png",
      categoryName: "خواربار",
      categoryLink: "#",
    },
    {
      imageSrc: "./src/assets/Img/Spice.png",
      categoryName: "ادویه و چاشنی",
      categoryLink: "#",
    },
    {
      imageSrc: "./src/assets/Img/cannedfood.png",
      categoryName: " غذای آماده",
      categoryLink: "#",
    },
    {
      imageSrc: "./src/assets/Img/kharbar.png",
      categoryName: "خواربار",
      categoryLink: "#",
    },
    {
      imageSrc: "./src/assets/Img/cannedfood.png",
      categoryName: " غذای آماده",
      categoryLink: "#",
    },
    {
      imageSrc: "./src/assets/Img/nezafat.png",
      categoryName: "نظافت خانه",
      categoryLink: "#",
    },
    {
      imageSrc: "./src/assets/Img/kharbar.png",
      categoryName: "خواربار",
      categoryLink: "#",
    },
    {
      imageSrc: "./src/assets/Img/cannedfood.png",
      categoryName: " غذای آماده",
      categoryLink: "#",
    },
    {
      imageSrc: "./src/assets/Img/kharbar.png",
      categoryName: "خواربار",
      categoryLink: "#",
    },
    {
      imageSrc: "./src/assets/Img/tanagholat.png",
      categoryName: "تنقلات",
      categoryLink: "#",
    },
    {
      imageSrc: "./src/assets/Img/labaniat.png",
      categoryName: "لبنیات",
      categoryLink: "#",
    },
    {
      imageSrc: "./src/assets/Img/behdashti.png",
      categoryName: " بهداشتی",
      categoryLink: "#",
    },
  ];


  const brandData = [
    { imageSrc: "./src/assets/Img/mihan.png", BrandName: "میهن" },
    { imageSrc: "./src/assets/Img/Tak.png", BrandName: "تک" },
    { imageSrc: "./src/assets/Img/Yekvayek.png", BrandName: "یک و یک" },
    { imageSrc: " ./src/assets/Img/cocacola.png", BrandName: "کوکاکولا" },
    { imageSrc: " ./src/assets/Img/mazmaz.png", BrandName: "مزمز" },
    { imageSrc: " ./src/assets/Img/Choopan.png", BrandName: "چوپان" },
    { imageSrc: " ./src/assets/Img/pril.png", BrandName: "پریل" },
    { imageSrc: " ./src/assets/Img/Kaleh.png", BrandName: "کاله" },
    { imageSrc: " ./src/assets/Img/Mahram.png", BrandName: "مهرام" },
    { imageSrc: " ./src/assets/Img/Damdaran.png", BrandName: "دامداران" },
    { imageSrc: " ./src/assets/Img/Golestan.png", BrandName: "گلستان" },
    { imageSrc: " ./src/assets/Img/ChinChin.png", BrandName: "چین چین" },
    { imageSrc: " ./src/assets/Img/Minoo.png", BrandName: "مینو" },
    { imageSrc: " ./src/assets/Img/3dots.png", BrandName: "بیشتر " },
  ];


  return (
    <div>
      {isLoading ? (
        <p>Loading...</p> // Show loading state
      ) : (
        <div>
          <Header />
          <div className="mp">
            <Banner />
            <Categories categories={categories} />
            <div className="mainproductcard">
              {/* <HeaderProductGrid /> */}
              <div className="products-card">
                {/* Tabs */}
                <div className="maintabe">
                  <p className="ptabe">محصولات ویژه</p>
                </div>
                <div className="grid">
                  {products.map((product) => {
                    const cartItem = cart.find((item) => item.id === product.id);
                    const quantity = cartItem?.quantity || 0;
                    return (
                      <ProductGrid
                        key={product.id}
                        id={product.id}
                        title={product.title}
                        price={product.price}
                        imageUrl={product.imageSrc}
                        addition={() => increaseQuantity(product.id)}
                        reduce={() => decreaseQuantity(product.id)}
                        num={quantity}
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            <Brands Brands={brandData} />

          </div>
          <FooterResponsive />

          <Footer />
        </div>
      )}
    </div>
  );
};

export default MainPage;