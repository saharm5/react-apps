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
    is_favorite: number;
    quantity: number;
}
const ShoppingCart: React.FC = () => {

    const [products, setProducts] = useState<Product[]>([]);
    const [carts, setCarts] = useState<{ id: number; quantity: number }[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchProducts(`/AddCart/list/`);
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
    const handleAddFavorite = async (id: number) => {
        const product = products.find((p) => p.id === id);
        if (!product) return;

        const newFavoriteStatus = product.is_favorite === 1 ? 0 : 1;

        setProducts((prevProducts) =>
            prevProducts.map((p) => (p.id === id ? { ...p, is_favorite: newFavoriteStatus } : p))
        );

        try {
            const formData = {
                url: window.location.href,
                id,
                is_favorite: newFavoriteStatus,
            };
            await submitForm("/favorites/toggle/", formData);
        } catch (error) {
            setProducts((prevProducts) =>
                prevProducts.map((p) => (p.id === id ? { ...p, is_favorite: product.is_favorite } : p))
            );
            alert("لطفا وارد شوید");
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
                    is_favorite: product.is_favorite === 1,
                    quantity: product.quantity,
                    addcard: null,
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
