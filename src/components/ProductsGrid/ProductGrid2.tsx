import React, { useEffect, useState } from "react";
import ProductGrid from "./ProductGrid/ProductGrid";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../styles/global.css";
import { fetchProducts } from "../../server/api";

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

const ProductGrid2: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [carts, setCarts] = useState<{ id: number; quantity: number }[]>([]);

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
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchProducts(`api/data/`);
                setProducts(data);
            } catch (error) {
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
                imageUrl: product.productImageSrc[0]?.productImageSrc || ""
            }))}
            carts={carts}
            addition={increasesQuantity}
            reduce={decreasesQuantity}
        />

    );
};

export default ProductGrid2;
