import React, { useState, useEffect } from "react";
import FooterResponsive from "../components/FooterResponsive/FooterResponsive";
import { fetchProducts } from '../server/api';
import "../styles/global.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductGrid from "../components/ProductGrid/ProductGrid";
import Header from "../components/Header/Header";
import HeaderSearchProducts from "../components/SearchProductPage/HeaderSearchProducts/HeaderSearchProducts";
import Filter from "../components/Filters/Filters";
import Footer from "../components/Footer/Footer";
import useBodyClass from "../components/useBodyClass/useBodyClass"

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

  useBodyClass("body-main");


  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setHasLoadedOnce(true);
      console.log("Loading complete!");
    },);

    return () => clearTimeout(timer);
  }, []);




  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProducts("/data/");
        setProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        Error('Failed to fetch products');
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
        product.final_price >= priceRange[0] && product.final_price <= priceRange[1];
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
          <div className="mainproductcard" style={{margin:"5px ", paddingInline:"30px"}}>
            {!hasLoadedOnce ? (
              <p>Loading...</p>
            ) : (
              <ProductGrid
                products={filteredProducts.map((product) => ({
                  id: product.id,
                  title: product.product_name,
                  price: product.final_price,
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
