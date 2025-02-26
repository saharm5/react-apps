import React, { useState, useEffect } from "react";
import FooterResponsive from "../components/FooterResponsive/FooterResponsive";
import { fetchProducts, submitForm } from '../server/api';
import "../styles/global.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductGrid from "../components/ProductsGrid/ProductGrid/ProductGrid";
import Header from "../components/Header/Header";
import HeaderSearchProducts from "../components/SearchProductPage/HeaderSearchProducts/HeaderSearchProducts";
import Filter from "../components/Filters/Filters";
import Footer from "../components/Footer/Footer";
import useBodyClass from "../components/useBodyClass/useBodyClass";

interface Image {
  product_name: string;
  productImageSrc: string;
}

interface Products {
  available: any;
  id: number;
  product_name: string;
  brand: string;
  final_price: number;
  imageSrc: string;
  description: string;
  rating: number;
  category: string;
  quantity: number;
  productImageSrc: Image[];
}

const ProductsPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);
  const [products, setProducts] = useState<Products[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Products[]>([]);
  const [cart, setCart] = useState<{ id: number; quantity: number }[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("BestSeller");

  useBodyClass("body-main");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setHasLoadedOnce(true);
      console.log("Loading complete!");
    }, 0);
    return () => clearTimeout(timer);
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const endpoint = `api/data?sort=${activeTab}`;
        const data = await fetchProducts(endpoint);
        setProducts(data);
        setFilteredProducts(data);
        const initialCart = data.map((product: Products) => ({
          id: product.id,
          quantity: product.quantity,
        }));
        setCart(initialCart);
      } catch (err) {
        console.error("Failed to fetch products");
      }
    };

    fetchData();
  }, [activeTab]);

  const applyFilters = () => {
    const filtered = products.filter((product) => {
      const matchesCategory = selectedCategory && selectedCategory !== "همه کالاها"
        ? product.category === selectedCategory
        : true;
      const matchesBrand = selectedBrands.length > 0
        ? selectedBrands.includes(product.brand)
        : true;
      const matchesPrice =
        product.final_price >= priceRange[0] && product.final_price <= priceRange[1];
      const matchesAvailability = onlyAvailable
        ? product.available === "true"
        : true;
      return matchesCategory && matchesBrand && matchesPrice && matchesAvailability;
    });
    setFilteredProducts(filtered);
    console.log("Filters applied:", { selectedCategory, selectedBrands, priceRange, onlyAvailable });
  };

  const increaseQuantity = async (id: number) => {
    setCart((prev) => {
      const existingProduct = prev.find((item) => item.id === id);
      if (existingProduct) {
        return prev.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { id, quantity: 1 }];
    });
    try {
      const formData = {
        id,
        operation: "add",
      };
      const response = await submitForm("AddCart/cart/", formData);
      console.log(response);
    } catch (error) {
      alert("لطفا وارد شوید");
      console.error(error);
    }
  };

  const decreaseQuantity = async (id: number) => {
    setCart((prev) => {
      const existingProduct = prev.find((item) => item.id === id);
      if (existingProduct) {
        return prev.map((item) =>
          item.id === id ? { ...item, quantity: Math.max(0, item.quantity - 1) } : item
        );
      }
      return prev;
    });
    try {
      const formData = {
        id,
        operation: "remove",
      };
      const response = await submitForm("AddCart/cart/", formData);
      console.log(response);
    } catch (error) {
      alert("لطفا وارد شوید");
      console.error(error);
    }
  };

  return (
    <div>
      <Header />
      <HeaderSearchProducts
        SearchPath={"صفحه اصلی > محصولات > تمام محصولات"}
        NumberOfItems={filteredProducts.length}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
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
          <div className="mainproductcard" style={{ margin: "5px", paddingInline: "30px" }}>
            {!hasLoadedOnce ? (
              <p>Loading...</p>
            ) : (
              <ProductGrid
                products={filteredProducts.map((product) => ({
                  key: product.id,
                  quantity: product.quantity,
                  id: product.id,
                  title: product.product_name,
                  price: product.final_price,
                  addcard: null,
                  imageUrl: product.productImageSrc[0]?.productImageSrc || ""
                }))}
                carts={cart}
                addition={increaseQuantity}
                reduce={decreaseQuantity}
              />
            )}
          </div>
        </div>
      </div>
      <FooterResponsive />
      <Footer />
    </div>
  );
};

export default ProductsPage;
