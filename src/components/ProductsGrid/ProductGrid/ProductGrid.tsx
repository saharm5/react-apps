import React from "react";
import "./ProductGrid.css";
import CartButton from "../../CartButton/CartButton";
import { Link } from "react-router-dom";

interface Product {
  Discount: number;
  addcard: string | null;
  quantity: number;
  id: number;
  imageUrl: string | null;
  title: string;
  price: number;
}

interface GridProps {
  products: Product[];
  carts: { id: number; quantity: number }[];
  addition: (id: number) => void;
  reduce: (id: number) => void;
}

const ProductGrid: React.FC<GridProps> = ({ products, carts, addition, reduce }) => (
  <div className="products-card">
    <div className="grid">
      {products.map((product) => {
        const cartItem = carts.find((item) => item.id === product.id);
        const quantity = cartItem ? cartItem.quantity : product.quantity;

        return (
          <div key={product.id} className="productCards">
            <div className="card position-relative">

              <Link to={`/ProductDetails?id=${product.id}`} style={{ textDecoration: "none" }}>
                {/* Action Icons */}
                <div className="position-absolute top-50 start-0">
                  <p
                    className="badge p-1 productdiscount"
                  >
                    % {product.Discount}
                  </p>
                </div>
                <img
                  src={product.imageUrl || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs9gUXKwt2KErC_jWWlkZkGabxpeGchT-fyw&s"}
                  alt={product.title}
                  className="product-image"
                />
              </Link>
            </div>
            <p className="product-Title">{product.title}</p>
            {product.price && (
              <p className="product-price">
                <strong>{product.price.toLocaleString()}</strong> تومان
              </p>
            )}
            <div style={{ width: "118px" }}>
              <CartButton
                quantity={quantity}
                onAdd={() => addition(product.id)}
                onReduce={() => reduce(product.id)}
                addcard={product.addcard || ""}
              />
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

export default ProductGrid;
