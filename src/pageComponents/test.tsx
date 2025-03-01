// // src/components/Search.tsx

// import React, { useState } from 'react';

// interface Product {
//     id: number;
//     name: string;
//     description: string;
// }

// const Search: React.FC = () => {
//     const [query, setQuery] = useState<string>('');
//     const [results, setResults] = useState<Product[]>([]);

//     const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         if (!query) return;

//         const response = await fetch(`http://127.0.0.1:8000/api/products?search=${query}`);
//         const data = await response.json();
//         setResults(data);
//     };

//     return (
//         <div>
//             <form onSubmit={handleSearch}>
//                 <input
//                     type="text"
//                     value={query}
//                     onChange={(e) => setQuery(e.target.value)}
//                     placeholder="جستجو..."
//                 />
//                 <button type="submit">جستجو</button>
//             </form>

//             <ul>
//                 {results.map((product) => (
//                     <li key={product.id}>
//                         {product.name}: {product.description}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default Search;


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import "./Header.css";

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
            // هدایت به صفحه محصولات با ارسال پارامتر search
            navigate(`/Products?search=${encodeURIComponent(search)}`);
        }
    };

    // (سایر بخش‌های هدر مانند منوی دسته‌بندی و آیکون‌ها در اینجا قرار می‌گیرند)

    return (
        <header>
            {/* بخش واکنش‌گرا (موبایل) */}
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
                            <FaSearch className="HeaderResponsiveNavbarIconPadding" />
                        </span>
                        بقالی
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

            {/* بخش اصلی (دسکتاپ) */}
            <nav className="HeaderNav">
                {/* سایر بخش‌های هدر (منو، آیکون‌های کاربری و ... ) */}
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
            </nav>
        </header>
    );
};

export default Header;
