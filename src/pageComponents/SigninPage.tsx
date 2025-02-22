import Signin from "../components/Signin/Signin";
import "../styles/global.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import FooterResponsive from "../components/FooterResponsive/FooterResponsive";
import React from "react";
import useBodyClass from "../components/useBodyClass/useBodyClass"

const SigninPage: React.FC = () => {
    
    useBodyClass("body-login");

    return (
        <div>
            <Signin />
            <FooterResponsive />
        </div>
    );
};

export default SigninPage;
