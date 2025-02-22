import Login from "../components/Login/Login";
import "../styles/global.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import FooterResponsive from "../components/FooterResponsive/FooterResponsive";
import React from "react";
import useBodyClass from "../components/useBodyClass/useBodyClass"

const LoginPage: React.FC = () => {

  useBodyClass("body-login");

  return (
    <div>
      <Login />
      <FooterResponsive />
    </div>
  );
};

export default LoginPage;
