// C: \Users\Sanay\react - apps\src\pageComponents\AboutProductPage.tsx
import React, { useEffect, useState } from "react";
import FooterResponsive from "../components/FooterResponsive/FooterResponsive";
import "../styles/global.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/Header/Header";
import useBodyClass from "../components/useBodyClass/useBodyClass"
import Footer from "../components/Footer/Footer";
import AboutProduct from "../components/AboutProduct/AboutProduct";
import ProductGrid2 from "../components/ProductsGrid/ProductGrid2";
import ProductReview from "../components/ProductReview/ProductReview";
import { fetchProducts, submitForm } from "../server/api";
import { useSearchParams } from "react-router-dom";

interface Image {
    product_name: string;
    productImageSrc: string;
}
interface review {
    id: number;
    product_name: string;
    reviewdetail: string;
    customerrating: number;
    customername: string;
}

interface Product {
    quantity: number;
    production_date: string | null;
    expiration_date: string | null;
    size: string | null;
    id: number;
    product_name: string;
    category: string | null;
    sub_category: string | null;
    product_details: string | null;
    brand: string;
    main_price: number;
    Discount: number;
    final_price: number;
    productImageSrc: Image[];
    is_favorite: boolean;
}

const ProductDetails: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [carts, setCarts] = useState<{ id: number; quantity: number }[]>([]);
    const [reviews, setreviews] = useState<review[]>([]);
    const [rating, setRating] = useState<number>(4.8);
    const effectiveRating = rating > 0 ? rating : 5;
    const [params] = useSearchParams();
    const value = params.get("id");

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
            alert("لطفا وارد شوید");
            console.error(error);
        }
    };
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
            const formData = { id, operation: "add" };
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
            const formData = { id, operation: "remove" };
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
                const endpoint = `api/data?id=${value}`;
                const data = await fetchProducts(endpoint);
                setProducts(data);
                const initialCart = data.map((product: Product) => ({
                    id: product.id,
                    quantity: product.quantity,
                }));
                setCarts(initialCart);
            } catch (err) {
                console.error("Failed to fetch products");
            }
        };

        fetchData();
    }, [value]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const endpoint = `api/data?id=${value}`;
                const data = await fetchProducts(endpoint);
                setreviews(data);
                if (data.length > 0) {
                    const avgRating =
                        data.reduce((acc: number, review: review) => acc + (review.customerrating || 0), 0) /
                        data.length;
                    setRating(avgRating);
                } else {
                    setRating(4.8);
                }
            } catch (err) {
                console.error("Failed to fetch reviews");
            }
        };
        fetchData();
    }, [value]);

    useBodyClass("body-main");

    return (
        <div>
            <Header />
            <div className=" d-flex flex-column align-items-center bodyproductcard">
                <div className="productcarddiv">
                    <AboutProduct
                        products={
                            products.map((product) => ({
                                key: product.id,
                                id: product.id,
                                product_name: product.product_name,
                                category: product.category,
                                sub_category: product.sub_category,
                                product_details: product.product_details,
                                brand: product.brand,
                                main_price: product.main_price,
                                Discount: product.Discount,
                                final_price: product.final_price,
                                quantity: product.quantity,
                                productImageSrc: product.productImageSrc,
                                imageUrl: product.productImageSrc[0]?.productImageSrc || null,
                                production_date: product.production_date,
                                expiration_date: product.expiration_date,
                                size: product.size,
                                is_favorite: false,
                            }))
                        }
                        carts={carts}
                        increasesQuantity={increasesQuantity}
                        decreasesQuantity={decreasesQuantity}
                        handleAddFavorite={handleAddFavorite}
                    />
                    <div className=" shadow-lg rounded mainproductcard" style={{ margin: "1% 0 ", padding: "1.5%", overflow: "auto" }}>
                        {/* Tabs */}
                        <div className="maintabe">
                            <h5 className="ptabe" style={{ fontSize: "20px" }}>محصولات مشابه</h5>
                        </div>
                        <div className="not-scroll-container">
                            <ProductGrid2 />
                        </div>
                    </div>
                    <ProductReview
                        reviews={reviews.map((review) => ({
                            id: review.id,
                            product_name: review.product_name,
                            customerrating: review.customerrating,
                            customername: review.customername,
                            reviewdetail: review.reviewdetail,
                        }))}
                        effectiveRating={effectiveRating}
                        products={products.map((product) => ({
                            key: product.id,
                            id: product.id,
                            product_name: product.product_name,
                            imageUrl: product.productImageSrc[0]?.productImageSrc || ""
                        }))}
                    />
                </div>
            </div>
            <FooterResponsive />
            <Footer />
        </div>
    );
};

export default ProductDetails;
