// import React from "react";
// import "./Header.css";


// const Header: React.FC = () => {
//   return (
//     <header className="header">
//       <div className="container">
//         <h1>Baghali</h1>
//         <nav>
//           <input type="search" placeholder="به دنبال چه می‌گردید؟" />
//           <button>جستجو</button>
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Header;

import React from 'react';

const Header: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top px-4">
      {/* Left Section - Location */}
      <div className="navbar-brand d-flex align-items-center">
        <i className="bi bi-geo-alt-fill me-2"></i> {/* Bootstrap Icon */}
        زنجان، بلوار مهرانه
      </div>

      {/* Toggle Button for Mobile View */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarContent"
        aria-controls="navbarContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Collapsible Content */}
      <div className="collapse navbar-collapse" id="navbarContent">
        {/* Center Section - Search */}
        <form className="d-flex mx-auto my-2 my-lg-0 w-50">
          <input
            className="form-control me-2"
            type="search"
            placeholder="به دنبال چه می‌گردی؟"
            aria-label="Search"
          />
          <button className="btn btn-outline-light" type="submit">
            <i className="bi bi-search"></i> {/* Bootstrap Search Icon */}
          </button>
        </form>

        {/* Right Section - Icons */}
        <div className="navbar-nav ms-auto">
          <button className="btn btn-primary me-2">
            <i className="bi bi-heart"></i>
          </button>
          <button className="btn btn-primary me-2">
            <i className="bi bi-person"></i>
          </button>
          <button className="btn btn-primary me-2">
            <i className="bi bi-cart"></i>
          </button>
          <button className="btn btn-primary">
            <i className="bi bi-list"></i>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
