import React, { useState } from "react";
import "../App.css"; // Adjust the path based on your project structure

const HeaderResponsive: React.FC = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleNavbar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <header>
            <div className="HeaderResponsive">
                <nav className="HeaderResponsiveNavbar">
                    <button
                        onClick={toggleNavbar}
                        aria-controls="navbarToggleExternalContent"
                        aria-expanded={isCollapsed}
                        aria-label="Toggle navigation"
                        className="HeaderResponsiveNavbarButton"
                    >
                        بقالی
                        <span className={`collapsiblecontent ${isCollapsed ? "show" : ""}`}>
                            <i className="bi bi-search HeaderResponsiveNavbarIconPadding"></i>
                        </span>

                    </button>
                    <div className="Headerlocation">
                        <i className="bi bi-geo-alt-fill"></i>
                        <span>زنجان، بلوار مهرانه، سانای</span>
                    </div>
                </nav>
                <div className={`collapsible-content ${isCollapsed ? "show" : ""}`}>
                    <div className="HeaderResponsiveSearchContainer">
                        <form className="HeaderResponsiveSearchForm">
                            <button className="HeaderSearchBtn" type="submit">
                                <i className="bi bi-search"></i>
                            </button>
                            <input
                                className="HeaderSearchInput"
                                type="search"
                                placeholder="به دنبال چه می‌گردی؟"
                                aria-label="Search"
                            />
                        </form>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default HeaderResponsive;
