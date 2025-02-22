import React, { useState } from "react";
import "./HeaderResponsive.css";

const Header: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleNavbar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <header>
      <nav className="HeaderNav">
        {/* Right Section */}
        <div className="HeaderMainDropdown">
          <div>
            <button className="HeaderMainDropdownBtn">
              <h4>
                <i className="bi bi-list HeaderMainDropdownIconPadding"></i>
                بقالی
                <i className="bi bi-search HeaderMainSearchDropdownIconPadding" ></i>
              </h4>
            </button>
          </div>
          {/* search subdropdown */}
          <div className="HeaderMainDropdownSearchContainer">
            <div className="HeaderMainDropdownSearch">
              <form className="HeaderMainDropdownSearchForm">
                <button className="HeaderMainDropdownSearchBtn" type="submit">
                  <i className="bi bi-search"></i>
                </button>
                <input
                  className="HeaderMainDropdownSearchInput"
                  type="search"
                  placeholder="به دنبال چه می‌گردی؟"
                  aria-label="Search"
                />
              </form>
            </div>
          </div>
        </div>
        {/* location Section */}
        <div className="Headerlocation">
          <i className="bi bi-geo-alt-fill"></i>
          <span>زنجان، بلوار مهرانه، سانای</span>
        </div>
      </nav>
    </header>
  );
};

export default Header;
