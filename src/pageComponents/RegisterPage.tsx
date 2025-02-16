import Register from "../components/Register/Register";
import "../styles/global.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import FooterResponsive from "../components/FooterResponsive/FooterResponsive";
import React from "react";
import useBodyClass from "../components/useBodyClass/useBodyClass"

const RegisterPage: React.FC = () => {
  useBodyClass("body-login");


  return (
    <div>
      <Register />
      <FooterResponsive />
    </div>
  );
};

export default RegisterPage;
