import React, { useState } from "react";
import "../components/SearchProductPage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchProductPage from "./SearchProductPage";

// Add isVisible to Product interface
interface Product {
  id: number;
  title: string;
  description: string;
  rating: number;
  price: number;
  imageSrc: string;
  quantity?: number;
  isVisible?: boolean; // This was missing in your original interface
}

const ProductPage: React.FC = () => {
  const [, setMenuData] = useState<Product[]>([]);
  const [error] = useState<string | null>(null);
  const [cards, setCards] = useState<{ id: string; quantity: number }[]>([]);

  const product = [
    {
      id: 223,
      title: "شیرین عسل شوکوبیس",
      description:
        "شوکو بیسکویت کاکائویی با شکلات و کرم شیری دریم شیرین عسل 80 گرم",
      rating: 10,
      price: 25000,
      imageSrc: "https://shirinika.com/wp-content/uploads/2020/01/5100.jpg",
    },
    {
      id: 122,
      title: "شیرین عسل قدیمی موزی",
      description:
        "بیسکویت با روکش شکلات و مغزی موز 40 گرم آلبینا شیرین عسل - فروشگاه اینترنتی شیرینیکا",
      rating: 9,
      price: 5000,
      imageSrc: "https://shirinika.com/wp-content/uploads/2020/05/2404.jpg",
    },
    {
      id: 134,
      title: "شیرین عسل های بای",
      description:
        "بیسکویت دورنگ مغزدار های بای شیرین عسل - 100 گرمی | بازار انبارنفت",
      rating: 8,
      price: 15000,
      imageSrc:
        "https://anbarnaft.com/uploads/de747473453f485f8af248a3d3e8826a.jpg",
    },
    {
      id: 224,
      title: "شیرین عسل ویفر",
      description:
        "ویفر اکسترا پرتقالی 70 گرم شیرین عسل شیرین عسل - فروشگاه اینترنتی شیرینیکا",
      rating: 7,
      price: 10000,
      imageSrc:
        "https://behgaz.ir/wp-content/uploads/2024/01/dff8639d7e209fa85bf5d192767aeacffd5057e8_1635085967-400x400.jpg",
    },
    {
      id: 222,
      title: "شیرین عسل پتی بور",
      description:
        "پلیست قیمت و مشخصات محصولات برند شیرین عسل - لوازم قنادی بهگز",
      rating: 6,
      price: 8000,
      imageSrc:
        "https://behgaz.ir/wp-content/uploads/2024/01/dff8639d7e209fa85bf5d192767aeacffd5057e8_1635085967-400x400.jpg",
    },
    {
      id: 523,
      title: "شیرین عسل سی سی کیک",
      description:
        "کیک سه لایه روکشدار سی سی شیرین عسل 40 گرمی - کارتن 36 عددی | فروش عمده",
      rating: 5,
      price: 20000,
      imageSrc:
        "https://etmarket.org/wp-content/uploads/2022/10/%D8%B3%DB%8C-%D8%B3%DB%8C-%D8%B4%DB%8C%D8%B1%DB%8C%D9%86-%D8%B9%D8%B3%D9%84.jpg",
    },
    {
      id: 823,
      title: "شیرین عسل چوب شور",
      description: "چوب شور شیرین عسل - دکان مارکت | سوپر مارکت آنلاین",
      rating: 4,
      price: 5000,
      imageSrc:
        "https://blog.okala.com/wholesale/wp-content/uploads/2022/05/%D8%A8%DB%8C%D8%B3%DA%A9%D9%88%DB%8C%DB%8C%D8%AA-%D9%BE%D9%BE%D8%AA%D9%8A-%D8%A8%D9%88%D8%B1-%D9%88%D8%A7%D9%86%DB%8C%D9%84-125-%DA%AF%D8%B1%D9%85%DB%8C-%D8%B4%DB%8C%D8%B1%DB%8C%D9%86-%D8%B9%D8%B3%D9%84-768x768.jpg",
    },
  ];

  const increaseQuantity = (id: number) => {
    setCards((prev) => {
      const existingCard = prev.find((card) => card.id === id.toString());
      if (existingCard) {
        return prev.map((card) =>
          card.id === id.toString()
            ? { ...card, quantity: (existingCard.quantity || 1) + 1 }
            : card
        );
      }
      return [...prev, { id: id.toString(), quantity: 1 }];
    });
  };

  const decreaseQuantity = (id: number) => {
    setCards((prev) => {
      const existingCard = prev.find((card) => card.id === id.toString());
      if (existingCard && existingCard.quantity > 1) {
        return prev.map((card) =>
          card.id === id.toString()
            ? { ...card, quantity: (existingCard.quantity || 0) - 1 }
            : card
        );
      }
      return prev.filter((card) => card.id !== id.toString());
    });
  };

  const deleteCard = (id: number) => {
    setMenuData((prevMenuData) =>
      prevMenuData.filter((product) => product.id !== id)
    );
    setCards((prevCards) =>
      prevCards.filter((card) => card.id !== id.toString())
    );
  };

  return (
    <div id="cardContainer">
      {error ? (
        <p>{error}</p>
      ) : (
        product.map((product) =>
          product.isVisible !== false ? (
            <div key={product.id}>
              <SearchProductPage
                id={product.id.toString()}
                imageUrl={product.imageSrc || "https://via.placeholder.com/200"}
                addition={() => increaseQuantity(product.id)}
                reduce={() => decreaseQuantity(product.id)}
                onDelete={() => deleteCard(product.id)}
                num={
                  cards.find((card) => card.id === product.id.toString())
                    ?.quantity || 1
                }
                title={product.title}
                description={[product.description]}
                price={product.price}
              />
            </div>
          ) : null
        )
      )}
    </div>
  );
};

export default ProductPage;
