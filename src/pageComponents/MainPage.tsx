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
      imageSrc: "https://github.com/saharm5/react-apps/blob/main/src/assets/Img/kharbar.png?raw=true",
      categoryName: "خواربار",
      categoryLink: "#",
    },
    {
      imageSrc: "https://github.com/saharm5/react-apps/blob/main/src/assets/Img/Spice.png?raw=true",
      categoryName: "ادویه و چاشنی",
      categoryLink: "#",
    },
    {
      imageSrc: "https://github.com/saharm5/react-apps/blob/main/src/assets/Img/cannedfood.png?raw=true",
      categoryName: " غذای آماده",
      categoryLink: "#",
    },
    {
      imageSrc: "https://github.com/saharm5/react-apps/blob/main/src/assets/Img/kharbar.png?raw=true",
      categoryName: "خواربار",
      categoryLink: "#",
    },
    {
      imageSrc: "https://github.com/saharm5/react-apps/blob/main/src/assets/Img/tanagholat.png?raw=true",
      categoryName: "تنقلات",
      categoryLink: "#",
    },
    {
      imageSrc: "https://github.com/saharm5/react-apps/blob/main/src/assets/Img/labaniat.png?raw=true",
      categoryName: "لبنیات",
      categoryLink: "#",
    },
    {
      imageSrc: "https://github.com/saharm5/react-apps/blob/main/src/assets/Img/behdashti.png?raw=true",
      categoryName: " بهداشتی",
      categoryLink: "#",
    },
    {
      imageSrc: "https://github.com/saharm5/react-apps/blob/main/src/assets/Img/cannedfood.png?raw=true",
      categoryName: " غذای آماده",
      categoryLink: "#",
    },
    {
      imageSrc: "https://github.com/saharm5/react-apps/blob/main/src/assets/Img/nezafat.png?raw=true",
      categoryName: "نظافت خانه",
      categoryLink: "#",
    },
    {
      imageSrc: "https://github.com/saharm5/react-apps/blob/main/src/assets/Img/kharbar.png?raw=true",
      categoryName: "خواربار",
      categoryLink: "#",
    },
    {
      imageSrc: "https://github.com/saharm5/react-apps/blob/main/src/assets/Img/tanagholat.png?raw=true",
      categoryName: "تنقلات",
      categoryLink: "#",
    },
    {
      imageSrc: "https://github.com/saharm5/react-apps/blob/main/src/assets/Img/labaniat.png?raw=true",
      categoryName: "لبنیات",
      categoryLink: "#",
    },
    {
      imageSrc: "https://github.com/saharm5/react-apps/blob/main/src/assets/Img/behdashti.png?raw=true",
      categoryName: " بهداشتی",
      categoryLink: "#",
    },
    {
      imageSrc: "https://github.com/saharm5/react-apps/blob/main/src/assets/Img/cannedfood.png?raw=true",
      categoryName: " غذای آماده",
      categoryLink: "#",
    },
    {
      imageSrc: "https://github.com/saharm5/react-apps/blob/main/src/assets/Img/kharbar.png?raw=true",
      categoryName: "خواربار",
      categoryLink: "#",
    },
    {
      imageSrc: "https://github.com/saharm5/react-apps/blob/main/src/assets/Img/tanagholat.png?raw=true",
      categoryName: "تنقلات",
      categoryLink: "#",
    },
    {
      imageSrc: "https://github.com/saharm5/react-apps/blob/main/src/assets/Img/labaniat.png?raw=true",
      categoryName: "لبنیات",
      categoryLink: "#",
    },
    {
      imageSrc: "https://github.com/saharm5/react-apps/blob/main/src/assets/Img/behdashti.png?raw=true",
      categoryName: " بهداشتی",
      categoryLink: "#",
    },
  ];


  const brandData = [
    { imageSrc: "https://github.com/saharm5/react-apps/blob/main/src/assets/Img/mihan.png?raw=true", BrandName: "میهن" },
    { imageSrc: "https://github.com/saharm5/react-apps/blob/main/src/assets/Img/Tak.png?raw=true", BrandName: "تک" },
    { imageSrc: "https://github.com/saharm5/react-apps/blob/main/src/assets/Img/Yekvayek.png?raw=true", BrandName: "یک و یک" },
    { imageSrc: "https://github.com/saharm5/react-apps/blob/main/src/assets/Img/coca.jpg?raw=true", BrandName: "کوکاکولا" },
    { imageSrc: "https://github.com/saharm5/react-apps/blob/main/src/assets/Img/mazmaz.png?raw=true", BrandName: "مزمز" },
    { imageSrc: "https://github.com/saharm5/react-apps/blob/main/src/assets/Img/Choopan.png?raw=true", BrandName: "چوپان" },
    { imageSrc: "https://github.com/saharm5/react-apps/blob/main/src/assets/Img/pril.png?raw=true", BrandName: "پریل" },
    { imageSrc: "https://github.com/saharm5/react-apps/blob/main/src/assets/Img/Kaleh.png?raw=true", BrandName: "کاله" },
    { imageSrc: "https://github.com/saharm5/react-apps/blob/main/src/assets/Img/Mahram.png?raw=true", BrandName: "مهرام" },
    { imageSrc: "https://github.com/saharm5/react-apps/blob/main/src/assets/Img/Damdaran.png?raw=true", BrandName: "دامداران" },
    { imageSrc: "https://github.com/saharm5/react-apps/blob/main/src/assets/Img/Golestan.png?raw=true", BrandName: "گلستان" },
    { imageSrc: "https://github.com/saharm5/react-apps/blob/main/src/assets/Img/ChinChin.png?raw=true", BrandName: "چین چین" },
    { imageSrc: "https://github.com/saharm5/react-apps/blob/main/src/assets/Img/Minoo.png?raw=true", BrandName: "مینو" },
    { imageSrc: "https://github.com/saharm5/react-apps/blob/main/src/assets/Img/3dots.png?raw=true", BrandName: "بیشتر " },
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