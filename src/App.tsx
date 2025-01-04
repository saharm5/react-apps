import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pageComponents/MainPage";
import LoginPage from "./pageComponents/LoginPage";
import ProductPage from "./pageComponents/ProductPage";
// import ProductPagessssss from "./pageComponents/ExamplePage";
import HeaderResponsive from "./pageComponents/ExamplePage";
import ReviewPage from "./pageComponents/ReviewPage";
import "./styles/global.css";




export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<MainPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="Page" element={<HeaderResponsive />} />
        <Route path="Product" element={<ProductPage />} />
        {/* <Route path="Productsssssss" element={<Page />} /> */}
        <Route path="Review" element={<ReviewPage />} />
      </Routes>
    </BrowserRouter>
  );
}











