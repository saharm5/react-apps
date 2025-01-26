import React, { useState, useEffect } from "react";
import FooterResponsive from "../components/FooterResponsive";
import { fetchProducts } from '../server/api';
import "../styles/global.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchProductPage from "../components/SearchProductPage";
import Header from "../components/Header";
import HeaderSearchProducts from "../components/HeaderSearchProducts";
import Filter from "../components/Filters";
import Footer from "../components/Footer";
import useBodyClass from "../components/useBodyClass"


interface Product {
  available: any;
  id: number;
  title: string;
  brand: string;
  price: number;
  imageSrc: string;
  description: string;
  rating: number;
  category: string;
}

const ProductsPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);
  
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<{ id: number; quantity: number }[]>([]);
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  
  useBodyClass("body-main");

  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setHasLoadedOnce(true);
      console.log("Loading complete!");
    },);

    return () => clearTimeout(timer);
  }, []);



  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProducts("http://localhost:8000/data/");
        setProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        setError('Failed to fetch products');
      }
    };

    fetchData();
  }, []);


  const applyFilters = () => {
    const filtered = products.filter((product) => {
      const matchesCategory = selectedCategory && selectedCategory !== "همه کالاها"
        ? product.category === selectedCategory
        : true;
      const matchesBrand = selectedBrands.length > 0
        ? selectedBrands.includes(product.brand)
        : true;
      const matchesPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesAvailability = onlyAvailable
        ? product.available === "true"
        : true;

      return matchesCategory && matchesBrand && matchesPrice && matchesAvailability;
    });

    setFilteredProducts(filtered);
    console.log("Filters applied:", { selectedCategory, selectedBrands, priceRange, onlyAvailable });
  };


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

  return (
    <div>
      <Header />
      <HeaderSearchProducts
        SearchPath={"صفحه اصلی > محصولات > تمام محصولات"}
        NumberOfItems={filteredProducts.length}
      />
      <div className="row-container">
        <div className="boxRight">
          <Filter
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedBrands={selectedBrands}
            setSelectedBrands={setSelectedBrands}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            onlyAvailable={onlyAvailable}
            setOnlyAvailable={setOnlyAvailable}
            applyFilters={applyFilters}
          />

        </div>
        <div className="boxLeft">
          <div className="SearchProductGridContainer">
            <div className="CardGrid">
              {!hasLoadedOnce ? (
                <p>Loading...</p>
              ) : (
                filteredProducts.map((product) => {
                  const cartItem = cart.find((item) => item.id === product.id);
                  const quantity = cartItem?.quantity || 0;

                  return (
                    <div key={product.id}>
                      <SearchProductPage
                        title={product.title}
                        price={product.price}
                        imageUrl={product.imageSrc}
                        addition={() => increaseQuantity(product.id)}
                        reduce={() => decreaseQuantity(product.id)}
                        num={quantity}
                      />
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
      <FooterResponsive />
      <Footer />
    </div>
  );
};

export default ProductsPage;
