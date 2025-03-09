import React, { useState, useEffect } from "react";
import FooterResponsive from "../components/FooterResponsive/FooterResponsive";
import { fetchProducts, submitForm } from "../server/api";
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

interface CartItem {
  id: number;
  quantity: number;
}

const ProductsPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);
  const [products, setProducts] = useState<Products[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Products[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("BestSeller");

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const limit = 22;

  useBodyClass("body-main");

  const queryParams = new URLSearchParams(location.search);
  const search = queryParams.get("search") || "";

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setHasLoadedOnce(true);
      console.log("Loading complete!");
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setPage(1);
    setProducts([]);
    setFilteredProducts([]);
    window.scrollTo(0, 0);
  }, [activeTab, search]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const endpoint = `api/data?sort=${activeTab}&page=${page}&limit=${limit}${search ? `&search=${encodeURIComponent(search)}` : ""}`;
        const data = await fetchProducts(endpoint);

        if (page === 1) {
          setProducts(data);
          setFilteredProducts(data);
          const initialCart = data.reduce((acc: CartItem[], product: Products) => {
            if (!acc.some(item => item.id === product.id)) {
              acc.push({ id: product.id, quantity: product.quantity });
            }
            return acc;
          }, []);
          setCart(initialCart);
        } else {
          setProducts(prev => [...prev, ...data]);
          setFilteredProducts(prev => [...prev, ...data]);
          const newCart = data.reduce((acc: CartItem[], product: Products) => {
            if (!acc.some(item => item.id === product.id)) {
              acc.push({ id: product.id, quantity: product.quantity });
            }
            return acc;
          }, [] as CartItem[]);
          setCart(prev => {
            const updatedCart = [...prev];
            newCart.forEach((newItem: CartItem) => {
              if (!updatedCart.some(item => item.id === newItem.id)) {
                updatedCart.push(newItem);
              }
            });
            return updatedCart;
          });
        }

        setHasMore(data.length === limit);
      } catch (err) {
        console.error("Failed to fetch products", err);
      }
    };

    fetchData();
  }, [activeTab, page, search]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.offsetHeight;

      if (scrollTop + windowHeight + 100 >= fullHeight && hasMore) {
        setPage(prev => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore]);

  const applyFilters = () => {
    const filtered = products.filter((product) => {
      const matchesCategory =
        selectedCategory.length > 0
          ? selectedCategory.includes(product.category)
          : true;
      const matchesBrand =
        selectedBrands.length > 0
          ? selectedBrands.includes(product.brand)
          : true;
      const matchesPrice =
        product.final_price >= priceRange[0] &&
        product.final_price <= priceRange[1];
      const matchesAvailability = onlyAvailable
        ? product.available === "true"
        : true;
      return matchesCategory && matchesBrand && matchesPrice && matchesAvailability;
    });
    setFilteredProducts(filtered);
    console.log("Filters applied:", { selectedCategory, selectedBrands, priceRange, onlyAvailable });
  };

  const increaseQuantity = async (id: number) => {
    setCart(prev => {
      const existingProduct = prev.find(item => item.id === id);
      if (existingProduct) {
        return prev.map(item =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { id, quantity: 1 }];
    });
    try {
      const formData = { id, operation: "add" };
      const response = await submitForm("AddCart/cart/", formData);
      console.log(response);
    } catch (error) {
      alert("لطفا وارد شوید");
      console.error(error);
    }
  };

  const decreaseQuantity = async (id: number) => {
    setCart(prev => {
      const existingProduct = prev.find(item => item.id === id);
      if (existingProduct) {
        return prev.map(item =>
          item.id === id ? { ...item, quantity: Math.max(0, item.quantity - 1) } : item
        );
      }
      return prev;
    });
    try {
      const formData = { id, operation: "remove" };
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
                products={filteredProducts.map(product => ({
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
