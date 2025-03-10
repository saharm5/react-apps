import React, { useState } from "react";
import "./Header.css";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from "../../assets/svg/SearchIcon";

const Header: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const toggleNavbar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault(); // جلوگیری از رفرش صفحه
    if (search.trim()) {
      navigate(`/Products?search=${encodeURIComponent(search)}`);
    }
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
              <SearchIcon />
            </span>
            <span className="mx-1">
              بقالی
            </span>
          </button>
          <div className="Headerlocation">
            <i className="bi bi-geo-alt-fill"></i>
            <span>زنجان، بلوار مهرانه، سانای</span>
          </div>
        </nav>
        {isCollapsed && (
          <div className="collapsible-content">
            <div className="HeaderResponsiveSearchContainer">
              <form onSubmit={handleSearch} className="HeaderResponsiveSearchForm">
                <input
                  className="HeaderSearchInput"
                  type="search"
                  placeholder="به دنبال چه می‌گردی؟"
                  aria-label="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button className="HeaderSearchBtn" type="submit">
                  <i className="bi bi-search"></i>
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
      {/* if min-width:950  show this */}
      <nav className="HeaderNav">
        {/* Right Section */}
        <div className="HeaderMainDropdown">
          <button className="HeaderMainDropdownBtn">
            <h4>
              <i className="bi bi-list HeaderMainDropdownIconPadding"></i>
              <Link to="/" style={{ textDecoration: "none", color: "#fff" }}>
                بقالی
              </Link>
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
        <div className="HeaderSearchContainer">
          <form onSubmit={handleSearch} className="HeaderSearchdiv">
            <input
              className="HeaderSearchInput"
              type="search"
              placeholder="به دنبال چه می‌گردی؟"
              aria-label="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="HeaderSearchBtn" type="submit">
              <i className="bi bi-search"></i>
            </button>
          </form>
        </div>
        {/* location Section */}
        <div className="Headerlocation">
          <i className="bi bi-geo-alt-fill"></i>
          <span>زنجان، بلوار مهرانه، سانای</span>
        </div>
        {/* icons*/}
        <div className="HeaderIconContainer">
          <Link to="/register" className="HeaderIcon" aria-label="User Profile">
            <i className="bi bi-person"></i>
          </Link>
          <Link to="/ShoppingCart" className="HeaderIcon" aria-label="Shopping Cart">
            <i className="bi bi-cart"></i>
          </Link>
          <Link to="/Favorite" className="HeaderIcon" aria-label="Wishlist">
            <i className="bi bi-heart-fill HeaderHaertIcon"></i>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
