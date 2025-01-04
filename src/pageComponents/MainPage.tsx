import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Banner from "../components/Banner";
import Categories from "../components/Categories";
import ProductGrid from "../components/ProductGrid";
import Brands from "../components/Brands";
import Footer from "../components/Footer";
import FooterResponsive from "../components/FooterResponsive";
// import HeaderProductGrid from "../components/HeaderProductGrid";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../styles/global.css";

// import "vazir-font";
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

  useEffect(() => {

    const timer = setTimeout(() => {
      setIsLoading(false);
      console.log("Loading complete!");
    }, 1000);

    return () => clearTimeout(timer);
  }, []);




  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    document.body.classList.add("body-main");

    return () => {
      document.body.classList.remove("body-main");
    };
  }, []);


  const [cart, setCart] = useState<{ id: number; quantity: number }[]>([]);

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
    // Function to fetch products
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/data/?limit=20");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
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
