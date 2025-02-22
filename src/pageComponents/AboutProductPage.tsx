import React, { useEffect, useState } from "react";
import FooterResponsive from "../components/FooterResponsive/FooterResponsive";
import "../styles/global.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/Header/Header";
import ProductGrid from "../components/ProductGrid/ProductGrid";
import { fetchProducts } from '../server/api';
import useBodyClass from "../components/useBodyClass/useBodyClass"
import Footer from "../components/Footer/Footer";
import AboutProduct from "../components/AboutProduct/AboutProduct";

interface Image {
    product_name: string;
    productImageSrc: string;
}

interface Products {
    id: number;
    product_name: string;
    final_price: number;
    description: string;
    rating: number;
    productImageSrc: Image[];
}

interface CartsItem {
    id: number;
    quantity: number;
}

const ProductDetails: React.FC = () => {

    const [carts, setCarts] = useState<CartsItem[]>([]);
    const [products, setProducts] = useState<Products[]>([]);
    const [error, setError] = useState<string | null>(null);
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

    const limit = 9
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchProducts('api/data/?limit=' + limit);

                setProducts(data);
            } catch (error) {
                setError('Failed to fetch products');
            }
        };

        fetchData();
    }, []);

    const increasesQuantity = (id: number) => {
        setCarts((prev) => {
            const existingProduct = prev.find((item) => item.id === id);
            if (existingProduct) {
                return prev.map((item) =>
                    item.id === id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { id, quantity: 1 }];
        });
    };

    const decreasesQuantity = (id: number) => {
        setCarts((prev) => {
            const existingProduct = prev.find((item) => item.id === id);
            if (existingProduct?.quantity === 1) {
                return prev.filter((item) => item.id !== id);
            }
            return prev.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity - 1 } : item
            );
        });
    };
    useBodyClass("body-main");

    return (
        <div>
            <Header />
            <div className=" d-flex flex-column align-items-center bodyproductcard">
                <div className="productcarddiv">
                    <AboutProduct
                        addition={increasesQuantity}
                        reduce={decreasesQuantity}
                        carts={carts}
                    />
                    <div className=" shadow-lg rounded mainproductcard" style={{ margin: "1% 0 ", padding: "1.5%", overflow: "auto" }}>
                        {/* Tabs */}
                        <div className="maintabe">
                            <h5 className="ptabe" style={{ fontSize: "20px" }}>محصولات مشابه</h5>
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
            </div>
            <FooterResponsive />
            <Footer />
        </div>
    );
};

export default ProductDetails;
