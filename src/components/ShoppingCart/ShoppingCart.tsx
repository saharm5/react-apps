import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductRow from "../ProductRow/ProductRow";
import { fetchProducts, submitForm } from "../../server/api";
interface Image {
    product_name: string;
    productImageSrc: string;
}

interface Product {
    id: number;
    product_name: string;
    description: string;
    rating: number;
    category: string;
    sub_category: string;
    productImageSrc: Image[];
    product_details: string | null;
    brand: string;
    main_price: number;
    Discount: number;
    final_price: number;
    is_favorite: boolean;
}
const ShoppingCart: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);

    const [carts, setCarts] = useState<{ id: number; quantity: number }[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchProducts(`api/data/`);
                // اینجا قراره لینکش عوض شه 
                setProducts(data);
            } catch (error) {
                console.error('Failed to fetch products');
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
    const handleAddFavorite = async (id: number) => {
        const product = products.find((p) => p.id === id);
        if (!product) return;

        const newFavoriteStatus = !product.is_favorite;
        setProducts((prevProducts) =>
            prevProducts.map((p) => (p.id === id ? { ...p, is_favorite: newFavoriteStatus } : p))
        );

        try {
            const formData = {
                url: window.location.href,
                id,
                is_favorite: newFavoriteStatus,
            };
            const response = await submitForm("/favorites/toggle/", formData);
            console.log(`Product ${id} toggled favorite: ${newFavoriteStatus}`, response);
        } catch (error) {
            setProducts((prevProducts) =>
                prevProducts.map((p) => (p.id === id ? { ...p, is_favorite: product.is_favorite } : p))
            );
            alert("لطفاوارد شوید");
            console.error(error);
        }
    };

    return (
        <div className="w-75">
            <ProductRow
                products={products.map((product) => ({
                    key: product.id,
                    id: product.id,
                    title: product.product_name,
                    category: product.category,
                    sub_category: product.sub_category,
                    product_details: product.product_details,
                    brand: product.brand,
                    main_price: product.main_price,
                    Discount: product.Discount,
                    final_price: product.final_price,
                    is_favorite: product.is_favorite,
                    imageUrl: product.productImageSrc[0]?.productImageSrc || ""
                }))}
                carts={carts}
                addition={increasesQuantity}
                reduce={decreasesQuantity}
                handleAddFavorite={handleAddFavorite}
            />
        </div>
    );
};

export default ShoppingCart;
