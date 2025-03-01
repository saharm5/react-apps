import React, { useEffect, useState } from "react";
import "./FooterResponsive.css";
import { Link } from "react-router-dom";

const FooterResponsive: React.FC = () => {
    
    const [activeIcon, setActiveIcon] = useState<string>("");

    useEffect(() => {
        const path = window.location.pathname;
        if (path === "/login") {
            setActiveIcon("person");
        } else if (path === "/") {
            setActiveIcon("home");
        } else if (path === "/Favorite") {
            setActiveIcon("favorite");
        } else if (path === "/ShoppingCart") {
            setActiveIcon("cart");
        } else {
            setActiveIcon("");
        }
    }, []);

    const handleTabClick = (icon: string) => {
        setActiveIcon(icon);
    };

    const getIcon = (icon: string, isActive: boolean) => {
        switch (icon) {
            case "category":
                return isActive ? <i className="bi bi-layers-fill"></i> : <i className="bi bi-layers"></i>;
            case "person":
                return isActive ? <i className="bi bi-person-fill"></i> : <i className="bi bi-person"></i>;
            case "home":
                return isActive ? <i className="bi bi-house-fill"></i> : <i className="bi bi-house"></i>;
            case "cart":
                return isActive ? <i className="bi bi-cart-fill"></i> : <i className="bi bi-cart"></i>;
            case "favorite":
                return isActive ? <i className="bi bi-suit-heart-fill HeaderHaertIcon"></i> : <i className="bi bi-suit-heart"></i>;
            default:
                return null;
        }
    };

    return (
        <div className="FooterResponsive">
            <div className="">
                <Link
                    className={`icon ${activeIcon === "category" ? "active" : ""}`}
                    onClick={() => handleTabClick("category")}
                    to="/Review"
                >
                    {getIcon("category", activeIcon === "category")}
                </Link>
            </div>
            <div className="">
                <Link
                    className={`icon ${activeIcon === "person" ? "active" : ""}`}
                    onClick={() => handleTabClick("person")}
                    to="/Register"
                >
                    {getIcon("person", activeIcon === "person")}
                </Link>
            </div>
            <div className="">
                <Link
                    className={`icon ${activeIcon === "home" ? "active" : ""}`}
                    onClick={() => handleTabClick("home")}
                    to="/"
                >
                    {getIcon("home", activeIcon === "home")}
                </Link>
            </div>
            <div className="">
                <Link
                    className={`icon ${activeIcon === "cart" ? "active" : ""}`}
                    onClick={() => handleTabClick("cart")}
                    to="/ShoppingCart"
                >
                    {getIcon("cart", activeIcon === "cart")}
                </Link>
            </div>
            <div className="">
                <Link
                    className={`icon ${activeIcon === "favorite" ? "active" : ""}`}
                    onClick={() => handleTabClick("favorite")}
                    to="/Favorite"
                >
                    {getIcon("favorite", activeIcon === "favorite")}
                </Link>
            </div>
        </div>
    );
};

export default FooterResponsive;
