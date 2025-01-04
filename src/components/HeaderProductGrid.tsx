
import React, { useState } from "react";
import "./ProductGrid.css";


const HeaderProductGrid: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>("daily"); // Manage active tab

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };

    // Filter products based on the active tab
    // const filteredProducts = products.filter((product) => product.category === activeTab);

    return (
        <div className="products-card">
            {/* Tabs */}
            <div className="maintabe">
                <p className="ptabe">محصولات ویژه</p>
                <div className="tabs">
                    <button
                        className={`tab ${activeTab === "daily" ? "active" : ""}`}
                        onClick={() => handleTabClick("daily")}
                    >
                        نیازهای روزانه
                    </button>
                    <button
                        className={`tab ${activeTab === "discount" ? "active" : ""}`}
                        onClick={() => handleTabClick("discount")}
                    >
                        بیشترین تخفیف
                    </button>
                    <button
                        className={`tab ${activeTab === "bestseller" ? "active" : ""}`}
                        onClick={() => handleTabClick("bestseller")}
                    >
                        پرفروش‌ها
                    </button>
                </div>
            </div>
        </div>
    )
};

export default HeaderProductGrid;
