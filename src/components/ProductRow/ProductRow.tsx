import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CartButton from "../CartButton/CartButton";
import { Link } from "react-router-dom";

interface Product {
    id: number;
    title: string;
    category: string | null;
    sub_category: string | null;
    product_details: string | null;
    brand: string;
    main_price: number;
    Discount: number;
    final_price: number;
    imageUrl: string | null;
    is_favorite: boolean;
}

interface RowProps {
    products: Product[];
    carts: { id: number; quantity: number }[];
    addition: (id: number) => void;
    reduce: (id: number) => void;
    handleAddFavorite: (id: number) => void;
}

const ProductRow: React.FC<RowProps> = ({ products, carts, addition, reduce, handleAddFavorite }) => (

    <div className="row row-cols-1 row-cols-md-2 g-4">
        {products.map((product) => {
            const quantity = carts.find((item) => item.id === product.id)?.quantity || 0;

            return (
                <div key={product.id} className="col">
                    <div className="border rounded p-4 shadow-sm h-100 d-flex flex-row">
                        {/* تصویر */}
                        <div className="d-flex justify-content-center my-3">
                            <Link to={`/ProductDetails?id=${product.id}`} className="text-decoration-none">
                                <img
                                    src={product.imageUrl || "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"}
                                    alt={product.title}
                                    className="img-fluid rounded"
                                    style={{ maxHeight: "150px", maxWidth: "150px" }}
                                />
                            </Link>
                        </div>
                        <div className="w-75 ">
                            {/* اطلاعات */}
                            <div className="d-flex flex-row justify-content-between px-3">

                                <p className="fw-bolder fs-5">
                                    {product.title}
                                </p>
                                <div>
                                    <button
                                        className="iconB favorite btn-light"
                                        onClick={() => handleAddFavorite(product.id)}
                                    >
                                        {product.is_favorite ? (
                                            <i className="bi bi-suit-heart"></i>
                                        ) : (
                                           <i className="bi bi-suit-heart-fill text-danger"></i>
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div className="d-flex flex-column align-items-start px-3 text-center">

                                <p className="mb-1 fs-6">
                                    <strong>
                                        امتیاز این محصول:
                                    </strong>
                                    <span className=" px-1 fw-light">
                                        4.5
                                        {/* متغییر بشه و از بکند بیاد */}
                                    </span>
                                </p>
                                <p id="brand" className="productbrand m-0 fs-6">
                                    <strong>
                                        برند:
                                    </strong>
                                    <Link className="px-1  fw-light" to={`/`}>
                                        {product.brand}
                                    </Link>
                                </p>
                                <p id="category" className="productcategory fs-6">
                                    <strong>
                                        دسته بندی :
                                    </strong>
                                    <Link className="px-1  fw-light" to={`/`}>
                                        {product.category}
                                    </Link>
                                    |
                                    <Link className="px-1  fw-light" to={`/`}>
                                        {product.sub_category}
                                    </Link>
                                </p>

                            </div>

                            {/* قیمت */}
                            <div className="px-3">
                                <div className="d-flex flex-column align-items-end gap-2 mb-2 ">
                                    <div className="d-flex flex-row gap-2">
                                        <p className="text-decoration-line-through text-muted m-0 AboutProductpS">
                                            {product.main_price.toLocaleString()} تومان
                                        </p>
                                        <p className="badge mb-1 p-1 AboutProductpB">% {product.Discount}</p>
                                    </div>
                                    <p className="m-0 AboutProductpSS">
                                        <strong>{product.final_price.toLocaleString()} تومان</strong>
                                    </p>
                                </div>
                                {/* دکمه سبد خرید */}
                                <div className="mt-auto d-flex justify-content-center">
                                    <CartButton
                                        quantity={quantity}
                                        onAdd={() => addition(product.id)}
                                        onReduce={() => reduce(product.id)}
                                        addcard="اضافه به سبد خرید"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        })}
    </div>

);

export default ProductRow;
