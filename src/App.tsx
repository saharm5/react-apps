import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pageComponents/MainPage";
import LoginPage from "./pageComponents/LoginPage";
import RegisterPage from "./pageComponents/RegisterPage";
import SignupPage from "./pageComponents/SignupPage";
import ProductsPage from "./pageComponents/ProductsPage";
import ProductDetails from "./pageComponents/AboutProductPage";
import ReviewPage from "./pageComponents/ReviewPage";
import NotFoundPage from "./pageComponents/NotFoundPage";
import FavoritePage from "./pageComponents/FavoritePage";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles/global.css";
import ShoppingCartPage from "./pageComponents/ShoppingCartPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<MainPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="Register" element={<RegisterPage />} />
        <Route path="Signup" element={<SignupPage />} />
        <Route path="Products" element={<ProductsPage />} />
        <Route path="ProductDetails" element={<ProductDetails />} />
        <Route path="Favorite" element={<FavoritePage />} />
        <Route path="ShoppingCart" element={<ShoppingCartPage />} />
        <Route path="Review" element={<ReviewPage />} />
        <Route path="*" element={<NotFoundPage />} /> 
      </Routes>
    </BrowserRouter>
  );
}










