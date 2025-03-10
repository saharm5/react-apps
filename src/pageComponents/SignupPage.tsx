import "../styles/global.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import FooterResponsive from "../components/FooterResponsive/FooterResponsive";
import React from "react";
import useBodyClass from "../components/useBodyClass/useBodyClass"
import Signup from "../components/Signup/Signup";

const SignupPage: React.FC = () => {
    
    useBodyClass("body-login");

    return (
        <div>
            <Signup />
            <FooterResponsive />
        </div>
    );
};

export default SignupPage;
