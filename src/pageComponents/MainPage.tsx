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
import { fetchProducts } from "../server/api";
import useBodyClass from "../components/useBodyClass";

// Interfaces
interface Image {
  product_name: string;
  productImageSrc: string;
}

interface Product {
  id: number;
  product_name: string;
  final_price: number;
  description: string;
  rating: number;
  productImageSrc: Image[];
}

const MainPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [cart, setCart] = useState<{ id: number; quantity: number }[]>([]);

  useBodyClass("body-main");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      console.log("Loading complete!");
    }, 1000);

    return () => clearTimeout(timer);
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

  const limit = 12;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProducts(`/data/`);
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setError("Failed to fetch products");
      }
    };

    fetchData();
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
                <ProductGrid
                  products={products.map((product) => ({
                    id: product.id,
                    title: product.product_name,
                    price: product.final_price,
                    imageUrl: product.productImageSrc[0]?.productImageSrc || ""
                  }))}
                  carts={cart}
                  addition={increaseQuantity}
                  reduce={decreaseQuantity}
                />
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
