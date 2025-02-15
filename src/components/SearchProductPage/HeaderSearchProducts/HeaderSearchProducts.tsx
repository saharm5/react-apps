import React, { useState } from "react";
import "./HeaderSearchProducts.css";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface HeaderSearchProductsProps {
    SearchPath: string;
    NumberOfItems: number;
}

const HeaderSearchProducts: React.FC<HeaderSearchProductsProps> = ({ SearchPath, NumberOfItems }) => {
    const [activeTab, setActiveTab] = useState<string>("BestSeller");
    const [isSortingDropdownVisible, setIsSortingDropdownVisible] = useState(false);

    const handleTabClick = (tab: string) => setActiveTab(tab);
    const toggleSortingDropdown = () => setIsSortingDropdownVisible(prev => !prev);

    const tabs = [
        { key: "BestSeller", label: "پرفروش ترین" },
        { key: "Discounted", label: "بیشترین تخفیف" },
        { key: "Viewed", label: "پربازدیدترین" },
        { key: "Popular", label: "محبوب ترین" },
        { key: "Newest", label: "جدید ترین" },
        { key: "Cheapest", label: "ارزان ترین" },
        { key: "Expensive", label: "گرانترین" },
    ];

    const renderTabs = () => (
        <ul className="HeaderSearchProductsBreadcrumb">
            {tabs.map(tab => (
                <li key={tab.key}>
                    <button
                        className={`tab ${activeTab === tab.key ? "active" : ""}`}
                        onClick={() => handleTabClick(tab.key)}
                    >
                        {tab.label}
                    </button>
                </li>
            ))}

        </ul>
    );

    return (
        <div>
            <div className="HSPMResponsiv">
                <div className="HSPDResponsiv">
                    <button className="HSPBResponsiv" onClick={toggleSortingDropdown}>
                        <p>مرتب سازی</p>
                        <FontAwesomeIcon icon={faChevronDown} />
                    </button>
                    {isSortingDropdownVisible && <div className="HeaderSearchProductsTabes">{renderTabs()}</div>}
                </div>
                <div className="HSPDResponsiv">
                    <button className="HSPBResponsiv">
                        <p>فیلتر ها</p>
                        <FontAwesomeIcon icon={faChevronDown} />
                    </button>
                </div>
            </div>
            <div className="HeaderSearchProductsMain">
                <div className="HeaderSearchProductsPTabe">
                    <p>{SearchPath}</p>
                </div>
                <div className="HeaderSearchProductsTabes">{renderTabs()}
                    <div className="HeaderSearchProductsNumberOfItem">{NumberOfItems} عدد</div>
                </div>
            </div>

        </div>

    );
};

export default HeaderSearchProducts;
