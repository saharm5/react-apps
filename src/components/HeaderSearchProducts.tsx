import React, { useState } from "react";

import "./HeaderSearchProducts.css";

interface HeaderSearchProductsProps {
    SearchPath: string;
    NumberOfItems: number
}

const HeaderSearchProducts: React.FC<HeaderSearchProductsProps> = ({ SearchPath, NumberOfItems }) => {
    const [activeTab, setActiveTab] = useState<string>("BestSeller"); // Manage active tab

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };
    return (
        <div className="HeaderSearchProductsMain ">
            <div className="HeaderSearchProductsPTabe">
                <p className="">{SearchPath}</p>
            </div>
            {/* tabs */}
            <div className=" HeaderSearchProductsTabes ">
                <ul className="HeaderSearchProductsBreadcrumb">
                    <li>
                        <button
                            className={`tab ${activeTab === "BestSeller" ? "active" : ""}`}
                            onClick={() => handleTabClick("BestSeller")}
                        >
                            پرفروش ترین
                        </button>
                    </li>
                    <li>
                        <button
                            className={`tab ${activeTab === "Discounted" ? "active" : ""}`}
                            onClick={() => handleTabClick("Discounted")}
                        >
                            بیشترین تخفیف
                        </button>
                    </li>
                    <li>
                        <button
                            className={`tab ${activeTab === "Viewed" ? "active" : ""}`}
                            onClick={() => handleTabClick("Viewed")}
                        >
                            پربازدیدترین
                        </button>
                    </li>
                    <li>
                        <button
                            className={`tab ${activeTab === "Popular" ? "active" : ""}`}
                            onClick={() => handleTabClick("Popular")}
                        >
                            محبوب ترین
                        </button>
                    </li>
                    <li>
                        <button
                            className={`tab ${activeTab === "Newest" ? "active" : ""}`}
                            onClick={() => handleTabClick("Newest")}
                        >
                            جدید ترین
                        </button>
                    </li>
                    <li>
                        <button
                            className={`tab ${activeTab === "Cheapest" ? "active" : ""}`}
                            onClick={() => handleTabClick("Cheapest")}
                        >
                            ارزان ترین
                        </button>
                    </li>
                    <li>
                        <button
                            className={`tab ${activeTab === "Expensive" ? "active" : ""}`}
                            onClick={() => handleTabClick("Expensive")}
                        >
                            گرانترین
                        </button>
                    </li>
                </ul>
                {/* Number of items */}
                <div className="HeaderSearchProductsNumberOfItem">{NumberOfItems} عدد</div>
            </div>
        </div>


    )
}

export default HeaderSearchProducts;