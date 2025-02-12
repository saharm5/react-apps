import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pageComponents/MainPage";
import LoginPage from "./pageComponents/LoginPage";
import SigninPage from "./pageComponents/SigninPage";
import ProductsPage from "./pageComponents/ProductsPage";
import ProductDetails from "./pageComponents/AboutProductPage";
// import ProductPagessssss from "./pageComponents/ExamplePage";
// import HeaderResponsive from "./pageComponents/ExamplePage";
import ReviewPage from "./pageComponents/ReviewPage";
import "./styles/global.css";
import NotFoundPage from "./pageComponents/NotFoundPage";
// import Header from "./components/Header";
import 'bootstrap/dist/css/bootstrap.min.css';




export default function App() {
  return (

    <BrowserRouter>
      {/* <Header /> */}
      <Routes>
        <Route index element={<MainPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="Signin" element={<SigninPage />} />
        {/* <Route path="Page" element={<HeaderResponsive />} /> */}
        <Route path="Products" element={<ProductsPage />} />
        <Route path="ProductDetails" element={<ProductDetails />} />
        {/* <Route path="Productsssssss" element={<Page />} /> */}
        <Route path="Review" element={<ReviewPage />} />
        <Route path="*" element={<NotFoundPage />} /> {/* Optional 404 page */}
      </Routes>
    </BrowserRouter>
  );
}










