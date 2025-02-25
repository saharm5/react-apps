// C:\Users\Sanay\react-apps\src\components\ProductsGrid\ProductGrid2.tsx
import React, { useEffect, useState } from "react";
import ProductGrid from "./ProductGrid/ProductGrid";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../styles/global.css";
import { fetchProducts, submitForm } from "../../server/api";

interface Image {
    product_name: string;
    productImageSrc: string;
}

interface Product {
    quantity: number;
    id: number;
    product_name: string;
    final_price: number;
    description: string;
    rating: number;
    productImageSrc: Image[];
}

const ProductGrid2: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [carts, setCarts] = useState<{ id: number; quantity: number }[]>([]);

    const increasesQuantity = async (id: number) => {
        setCarts((prev) => {
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

    const decreasesQuantity = async (id: number) => {
        setCarts((prev) => {
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchProducts("api/data/");
                setProducts(data);
                const initialCart = data.map((product: Product) => ({
                    id: product.id,
                    quantity: product.quantity,
                }));
                setCarts(initialCart);
            } catch (err) {
                console.error('Failed to fetch products');
            }
        };

        fetchData();
    }, []);

    return (
        <ProductGrid
            products={products.map((product) => ({
                key: product.id,
                id: product.id,
                title: product.product_name,
                price: product.final_price,
                quantity: product.quantity,
                addcard: null,
                imageUrl: product.productImageSrc[0]?.productImageSrc || ""
            }))}
            carts={carts}
            addition={increasesQuantity}
            reduce={decreasesQuantity}
        />
    );
};

export default ProductGrid2;
