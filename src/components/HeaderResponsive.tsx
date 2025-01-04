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

            {/* <div className="HeaderMainDropdownContainer">
              <ul className="HeaderMainDropdownUl">
                {NavbarCategories.map((NavbarCategory, index) => (

                  <div className="HeaderDropdownCategory" key={index}>
                    <li className="HeaderMainDropdownLi">
                      <div className="HeaderDropdown">
                        <div>
                          <button className="HeaderDropdownBtn">
                            <a className="HeaderMainDropdownLi" href="#">
                              {NavbarCategory.category}
                            </a>
                          </button>
                        </div>
                        <div>
                          <ul className="HeaderDropdownUl">
                            {NavbarCategory.SubCategorization.map((sub, subIndex) => (
                              <div className="HeaderDropdownCategory" key={subIndex}>
                                <li className="HeaderDropdownLi">
                                  <a className="HeaderDropdownLi" href="#">{sub.SubCategory}</a>
                                </li>
                              </div>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </li>
                  </div>

                ))}
              </ul>
            </div> */}
          </div>
        </div>

        {/* Center Section - Search */}
        {/* <div className="HeaderSearchContainer">
          <form className="HeaderSearchForm">
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
        </div> */}

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
