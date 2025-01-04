import React, { useEffect, useState } from "react";
import "../styles/global.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchProductPage from "../components/SearchProductPage";
import Header from "../components/Header";
import HeaderSearchProducts from "../components/HeaderSearchProducts";
// import Filter from "../components/Filters";
import Footer from "../components/Footer";

// Product interface for type safety
interface Product {
    id: number;
    title: string;
    price: number;
    imageSrc: string;
    description: string;
    rating: number;
}

const ProductPagessssss: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasLoadedOnce, setHasLoadedOnce] = useState(false); // New state to track first load
    const [searchTerm, setSearchTerm] = useState(""); // State for search term

    const [products, setProducts] = useState<Product[]>([]);
    const [cart, setCart] = useState<{ id: number; quantity: number }[]>([]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
            setHasLoadedOnce(true); // Mark that loading has completed once
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

    useEffect(() => {
        // Function to fetch products
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8000/data/");
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

    const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <Header />
            <HeaderSearchProducts
                SearchPath={"صفحه اصلی > محصولات > تمام محصولات"}
                NumberOfItems={filteredProducts.length}
            />
            <div className="row-container">
                <div className="boxRight">
                    {/* <Filter /> */}
                </div>
                <div className="boxLeft">
                    <input
                        type="text"
                        placeholder="جستجو محصولات..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                        style={{
                            margin: "1rem",
                            padding: "0.5rem",
                            width: "calc(100% - 2rem)",
                            borderRadius: "4px",
                            border: "1px solid #ccc",
                        }}
                    />
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
                                                id={product.id}
                                                title={product.title}
                                                price={product.price}
                                                imageUrl={product.imageSrc}
                                                addition={() => increaseQuantity(product.id)}
                                                reduce={() => decreaseQuantity(product.id)}
                                                num={quantity} CategoryId={""}                                            />
                                        </div>
                                    );
                                })
                            )}
                        </div>
                        {filteredProducts.length === 0 && <p>محصولی یافت نشد.</p>}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ProductPagessssss;




// const [searchTerm, setSearchTerm] = useState(""); // State for search term
// const filteredProducts = products.filter((product) =>
//     product.title.toLowerCase().includes(searchTerm.toLowerCase())
// ); 


// value = { searchTerm }
// onChange = {(e) => setSearchTerm(e.target.value)}


// { filteredProducts.length === 0 && <p>محصولی یافت نشد.</p> }