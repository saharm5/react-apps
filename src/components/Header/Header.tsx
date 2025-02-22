import React, { useState } from "react";
import "./Header.css";
import { FaSearch } from 'react-icons/fa';
import { Link } from "react-router-dom";

const Header: React.FC = () => {

  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleNavbar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const NavbarCategories = [
    {
      category: "تنقلات",
      SubCategorization: [
        { SubCategory: "چیپس و پفک" },
        { SubCategory: "بیسکوییت و ویفر و کراکر" },
        { SubCategory: "کیک و کلوچه" },
        { SubCategory: "شکلات و آبنبات" },
        { SubCategory: "لواشک و آلوچه" },
        { SubCategory: "تخمه و مغزیجات طعم دار" },
        { SubCategory: "پاستیل و آدامس" },
        { SubCategory: "پودر کیک و ژله و دسر" },
        { SubCategory: "دسر های آماده" },
        { SubCategory: "نقل و گز" }
      ]
    },
    {
      category: "لبنیات",
      SubCategorization: [
        { SubCategory: "پنیر" },
        { SubCategory: "شیر" },
        { SubCategory: "ماست" },
        { SubCategory: "دوغ" },
        { SubCategory: "خامه" },
        { SubCategory: "کشک" },
        { SubCategory: "کره" },
        { SubCategory: "بستنی" }
      ]
    },
    {
      category: "نوشیدنی ها",
      SubCategorization: [
        { SubCategory: "چای" },
        { SubCategory: "دمنوش" },
        { SubCategory: "پودر قهوه" },
        { SubCategory: "قهوه فوری" },
        { SubCategory: "آب معدنی" },
        { SubCategory: "نوشابه" },
        { SubCategory: "نوشیدنی های گازدار" },
        { SubCategory: "آبمیوه" },
        { SubCategory: "شربت" },
        { SubCategory: "هات چاکلت" }
      ]
    },
    {
      category: "خواربار",
      SubCategorization: [
        { SubCategory: "نان" },
        { SubCategory: "برنج" },
        { SubCategory: "ماکارونی و رشته" },
        { SubCategory: "روغن" },
        { SubCategory: "شکر قند و نبات" },
        { SubCategory: "حبوبات" },
        { SubCategory: "غلات" },
        { SubCategory: "آرد و خمیر" }
      ]
    },
    {
      category: "نظافت منزل",
      SubCategorization: [
        { SubCategory: "دستمال کاغذی" },
        { SubCategory: "شوینده لباس" },
        { SubCategory: "شوینده ظرف" },
        { SubCategory: "نظافت آشپزخانه" },
        { SubCategory: "نظافت سرویس بهداشتی" },
        { SubCategory: "ضد عفونی کننده" },
        { SubCategory: "حشره کش" },
        { SubCategory: "شیشه پاک‌کن" },
        { SubCategory: "تی و ابزار نظافت" }
      ]
    },
    {
      category: "چاشنی و ادویه",
      SubCategorization: [
        { SubCategory: "ادویه‌جات" },
        { SubCategory: "رب گوجه‌فرنگی" },
        { SubCategory: "سس‌ها" },
        { SubCategory: "ترشیجات" },
        { SubCategory: "سرکه" },
        { SubCategory: "آبلیمو و آبغوره" }
      ]
    },
    {
      category: "کنسرو و غذای آماده",
      SubCategorization: [
        { SubCategory: "کنسرو ماهی" },
        { SubCategory: "کنسرو سبزیجات" },
        { SubCategory: "خوراک‌های آماده" },
        { SubCategory: "غذاهای یخ‌زده" }
      ]
    },
    {
      category: "آرایشی و بهداشتی",
      SubCategorization: [
        { SubCategory: "کرم و لوسیون" },
        { SubCategory: "شامپو و نرم‌کننده" },
        { SubCategory: "محصولات اصلاح" },
        { SubCategory: "محصولات مراقبت از پوست" },
        { SubCategory: "محصولات مراقبت از مو" },
        { SubCategory: "محصولات دهان و دندان" }
      ]
    },
    {
      category: "محصولات پروتئینی",
      SubCategorization: [
        { SubCategory: "گوشت قرمز" },
        { SubCategory: "مرغ" },
        { SubCategory: "ماهی و میگو" },
        { SubCategory: "تخم مرغ" },
        { SubCategory: "سوسیس و کالباس" }
      ]
    },
    {
      category: "خانه و سبک زندگی",
      SubCategorization: [
        { SubCategory: "لوازم آشپزخانه" },
        { SubCategory: "دکوراسیون" },
        { SubCategory: "لوازم خواب" },
        { SubCategory: "نورپردازی" },
        { SubCategory: "محصولات باغبانی" }
      ]
    },
    {
      category: "آجیل و خشکبار",
      SubCategorization: [
        { SubCategory: "آجیل خام" },
        { SubCategory: "آجیل شور" },
        { SubCategory: "خشکبار" },
        { SubCategory: "خرما" },
        { SubCategory: "کشمش" }
      ]
    },
    {
      category: "مادر و کودک",
      SubCategorization: [
        { SubCategory: "محصولات کودک" },
        { SubCategory: "پوشک" },
        { SubCategory: "لوازم بهداشتی کودک" },
        { SubCategory: "محصولات تغذیه کودک" },
        { SubCategory: "محصولات مادران" }
      ]
    },
    {
      category: "میوه و سبزیجات",
      SubCategorization: [
        { SubCategory: "میوه‌های تازه" },
        { SubCategory: "سبزیجات تازه" },
        { SubCategory: "سبزیجات خشک" },
        { SubCategory: "میوه‌های یخ‌زده" }
      ]
    }
  ];

  return (
    <header>
      {/* if max-width:950  show this*/}
      <div className="HeaderResponsive">
        <nav className="HeaderResponsiveNavbar">
          <button
            onClick={toggleNavbar}
            aria-controls="navbarToggleExternalContent"
            aria-expanded={isCollapsed}
            aria-label="Toggle navigation"
            className="HeaderResponsiveNavbarButton"
          >
            <span className={`collapsiblecontent ${isCollapsed ? "show" : ""}`}>
              <FaSearch className="HeaderResponsiveNavbarIconPadding" /> {/* Search Icon */}
              {/* <i className="bi bi-search HeaderResponsiveNavbarIconPadding half-size-icon"></i> */}
            </span>
            بقالی

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
      {/* if min-width:950  show this */}
      <nav className="HeaderNav">
        {/* Right Section */}
        <div className="HeaderMainDropdown">
          <button className="HeaderMainDropdownBtn">
            <h4>
              <i className="bi bi-list HeaderMainDropdownIconPadding"></i>
              <Link to={`/`} style={{ textDecoration: "none", color: "#fff" }}>بقالی</Link>
            </h4>
          </button>
          <div className="HeaderMainDropdownContainer">
            <ul className="HeaderMainDropdownUl">
              {NavbarCategories.map((NavbarCategory, index) => (

                <div className="HeaderDropdownCategory" key={index}>
                  <li className="HeaderMainDropdownLi">
                    <div className="HeaderDropdown">
                      <div>
                        <button className="HeaderDropdownBtn">
                          <Link className="HeaderMainDropdownLi" to={`/Products`}>
                            {NavbarCategory.category}
                          </Link>
                        </button>
                      </div>
                      <div>
                        <ul className="HeaderDropdownUl">
                          {NavbarCategory.SubCategorization.map((sub, subIndex) => (
                            <div className="HeaderDropdownCategory" key={subIndex}>
                              <li className="HeaderDropdownLi">
                                <Link className="HeaderDropdownLi" to={`/Products`} >{sub.SubCategory}</Link>
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
          </div>
        </div>
        {/* Center Section - Search */}
        <div className=" HeaderSearchContainer">
          <div className=" HeaderSearchdiv">
            <input
              className="HeaderSearchInput"
              type="search"
              placeholder="به دنبال چه می‌گردی؟"
              aria-label="Search"
            />
            <button className="HeaderSearchBtn" type="submit">
              <Link to={`/Products`} className="btnsumbit"><i className="bi bi-search"></i></Link>
            </button>
          </div>
        </div>
        {/* location Section */}
        <div className="Headerlocation">
          <i className="bi bi-geo-alt-fill"></i>
          <span>زنجان، بلوار مهرانه، سانای</span>
        </div>
        {/* Left Section */}
        <div className="HeaderIconContainer">
          <Link to={`/login`} className="HeaderIcon" aria-label="User Profile">
            <i className="bi bi-person"></i>
          </Link>
          <Link to={`/`} className="HeaderIcon" aria-label="Shopping Cart">
            <i className="bi bi-cart"></i>
          </Link>
          <Link to={`/`} className="HeaderIcon" aria-label="Wishlist">
            <i className="bi bi-heart-fill HeaderHaertIcon"></i>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
