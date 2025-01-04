import Login from "../components/Login";
import "../styles/global.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import FooterResponsive from "../components/FooterResponsive";
import React, { useEffect } from "react";

const LoginPage: React.FC = () => {
  useEffect(() => {
    document.body.classList.add("body-login");

    return () => {
      document.body.classList.remove("body-login");
    };
  }, []);
  return (
    <div>
      <Login />
      <FooterResponsive />
    </div>
  );
};

export default LoginPage;
