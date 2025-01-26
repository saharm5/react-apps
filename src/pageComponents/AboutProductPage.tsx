import React, { useEffect, useState } from "react";
import FooterResponsive from "../components/FooterResponsive";
import "../styles/global.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/Header";
import ProductGrid from "../components/ProductGrid";
import { fetchProducts } from '../server/api';
import useBodyClass from "../components/useBodyClass"

import Footer from "../components/Footer";
import AboutProduct from "../components/AboutProduct";

interface Product {
    id: number;
    title: string;
    price: number;
    imageSrc: string;
    description: string;
    rating: number;
}


interface CartsItem {
    id: number;
    quantity: number;
}


const ProductDetails: React.FC = () => {
    const [carts, setCarts] = useState<CartsItem[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
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


    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchProducts('http://127.0.0.1:8000/data/?limit=9');
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
                <div>
                    <AboutProduct
                        addition={increasesQuantity}
                        reduce={decreasesQuantity}
                        carts={carts}
                    />
                    <div className=" shadow-lg rounded mainproductcard">
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
                </div>
            </div>
            <FooterResponsive />
            <Footer />
        </div>
    );
};

export default ProductDetails;
