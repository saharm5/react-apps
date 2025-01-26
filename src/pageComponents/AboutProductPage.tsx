import React, { useEffect, useState } from "react";
import FooterResponsive from "../components/FooterResponsive";
import "../styles/global.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AboutProduct from "../components/AboutProduct";

interface CartItem {
    id: number;
    quantity: number;
}

const ProductDetails: React.FC = () => {
    const [cart, setCart] = useState<CartItem[]>([]);

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
        document.body.classList.add("body-main");
        return () => {
            document.body.classList.remove("body-main");
        };
    }, []);

    return (
        <div>
            <Header />
            <AboutProduct
                addition={increaseQuantity}
                reduce={decreaseQuantity}
                cart={cart}
            />
            <FooterResponsive />
            <Footer />
        </div>
    );
};

export default ProductDetails;
