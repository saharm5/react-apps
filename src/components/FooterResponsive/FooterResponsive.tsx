import React, { useEffect, useState } from "react";
import "./FooterResponsive.css";

const FooterResponsive: React.FC = () => {
    
    const [activeIcon, setActiveIcon] = useState<string>("");

    useEffect(() => {
        const path = window.location.pathname;
        if (path === "/login") {
            setActiveIcon("person");
        } else if (path === "/") {
            setActiveIcon("home");
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
            case "favorit":
                return isActive ? <i className="bi bi-suit-heart-fill HeaderHaertIcon"></i> : <i className="bi bi-suit-heart"></i>;
            default:
                return null;
        }
    };

    return (
        <div className="FooterResponsive">
            <div className="">
                <a
                    className={`icon ${activeIcon === "category" ? "active" : ""}`}
                    onClick={() => handleTabClick("category")}
                    href="/"
                >
                    {getIcon("category", activeIcon === "category")}
                </a>
            </div>
            <div className="">
                <a
                    className={`icon ${activeIcon === "person" ? "active" : ""}`}
                    onClick={() => handleTabClick("person")}
                    href="/login"
                >
                    {getIcon("person", activeIcon === "person")}
                </a>
            </div>
            <div className="">
                <a
                    className={`icon ${activeIcon === "home" ? "active" : ""}`}
                    onClick={() => handleTabClick("home")}
                    href="/"
                >
                    {getIcon("home", activeIcon === "home")}
                </a>
            </div>
            <div className="">
                <a
                    className={`icon ${activeIcon === "cart" ? "active" : ""}`}
                    onClick={() => handleTabClick("cart")}
                    href="/"
                >
                    {getIcon("cart", activeIcon === "cart")}
                </a>
            </div>
            <div className="">
                <a
                    className={`icon ${activeIcon === "favorit" ? "active" : ""}`}
                    onClick={() => handleTabClick("favorit")}
                    href="/"
                >
                    {getIcon("favorit", activeIcon === "favorit")}
                </a>
            </div>
        </div>
    );
};

export default FooterResponsive;
