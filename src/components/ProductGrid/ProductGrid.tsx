import React from "react";
import "./ProductGrid.css";
import CartButton from "../CartButton/CartButton";

// Product Interface
interface Product {
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

const ProductGrid: React.FC<GridProps> = ({ products, carts, addition, reduce }) => {

  return (
    <div className="products-card">
      <div className="grid">
        {products.map((product) => {
          const cartItem = carts.find((item) => item.id === product.id);
          const quantity = cartItem ? cartItem.quantity : 0;

          return (
            <div key={product.id} className="productCards">
              <a href={`/ProductDetails?id=${product.id}`}
                style={{ textDecoration: "none" }}>
                <img
                  src={product.imageUrl || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs9gUXKwt2KErC_jWWlkZkGabxpeGchT-fyw&s"}
                  alt={product.title}
                  className="product-image"
                />
              </a>
              <p className="product-Title">{product.title}</p>
              {product.price &&
                <p className="product-price">
                  <strong>{product.price.toLocaleString()}</strong> تومان
                </p>}
              <div style={{ width: "118px" }}>
                <CartButton
                  quantity={quantity}
                  onAdd={() => addition(product.id)}
                  onReduce={() => reduce(product.id)} addcard={""} /></div>
            </div>
          );
          
        })}
      </div>
    </div >
  );
};

export default ProductGrid;
