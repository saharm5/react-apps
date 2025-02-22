import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pageComponents/MainPage";
import LoginPage from "./pageComponents/LoginPage";
import RegisterPage from "./pageComponents/RegisterPage";
import SigninPage from "./pageComponents/SigninPage";
import ProductsPage from "./pageComponents/ProductsPage";
import ProductDetails from "./pageComponents/AboutProductPage";
import ReviewPage from "./pageComponents/ReviewPage";
import "./styles/global.css";
import NotFoundPage from "./pageComponents/NotFoundPage";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<MainPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="Register" element={<RegisterPage />} />
        <Route path="Signin" element={<SigninPage />} />
        <Route path="Products" element={<ProductsPage />} />
        <Route path="ProductDetails" element={<ProductDetails />} />
        <Route path="Review" element={<ReviewPage />} />
        <Route path="*" element={<NotFoundPage />} /> 
      </Routes>
    </BrowserRouter>
  );
}










