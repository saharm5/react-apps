import React, { useState, useEffect } from "react";
import "./Filters.css";
import { fetchProducts } from '../../server/api';

interface FilterProps {
    selectedCategory: string | null;
    setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>;
    selectedBrands: string[];
    setSelectedBrands: React.Dispatch<React.SetStateAction<string[]>>;
    priceRange: [number, number];
    setPriceRange: React.Dispatch<React.SetStateAction<[number, number]>>;
    onlyAvailable: boolean;
    setOnlyAvailable: React.Dispatch<React.SetStateAction<boolean>>;
    applyFilters: () => void;
}

const Filter: React.FC<FilterProps> = ({
    selectedCategory,
    setSelectedCategory,
    selectedBrands,
    setSelectedBrands,
    priceRange,
    setPriceRange,
    onlyAvailable,
    setOnlyAvailable,
    applyFilters,
}) => {
    const [isCategoryDropdownVisible, setIsCategoryDropdownVisible] = useState(false);
    const [categoryFilter, setCategoryFilter] = useState("");
    const [isBrandDropdownVisible, setIsBrandDropdownVisible] = useState(false);
    const [brandFilter, setBrandFilter] = useState("");
    const [categories, setCategories] = useState<string[]>([]);
    const [brands, setBrands] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data: { category: string; brand: string }[] = await fetchProducts("api/data");
                const uniqueCategories = Array.from(new Set(data.map(product => product.category)));
                const uniqueBrands = Array.from(new Set(data.map(product => product.brand)));
                setCategories(uniqueCategories);
                setBrands(uniqueBrands);
            } catch (error) {
                console.error("Error fetching product data:", error);
            }
        };
        fetchData();
    }, []);

    const handleBrandSelection = (brand: string) => {
        setSelectedBrands((prev) =>
            prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
        );
    };

    const handleCategorySelection = (category: string) => {
        setSelectedCategory(category);
    };

    const toggleCategoryDropdown = () => {
        setIsCategoryDropdownVisible((prev) => !prev);
    };

    const toggleBrandDropdown = () => {
        setIsBrandDropdownVisible((prev) => !prev);
    };

    return (
        <div className="filtern">
            <div>
                <h5 className="FilterHeaderH5">فیلتر ها</h5>
            </div>
            {/* فیلتر دسته‌بندی‌ها */}
            <div className="FilterDropdown">
                <button onClick={toggleCategoryDropdown} className="FilterDropdownBtn">
                    دسته‌بندی‌ها
                    <i className="bi bi-chevron-down"></i>
                </button>
                {isCategoryDropdownVisible && (
                    <div className="FilterDropdownContent Show">
                        <input
                            className="FilterDropdownContentInputText"
                            type="text"
                            placeholder="جستجو..."
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                        />
                        <div className="FilterDropdownContentContainer">
                            {categories
                                .filter((category) => category.includes(categoryFilter))
                                .map((category, index) => (
                                    <label key={index} className="FilterContentLabel">
                                        <input
                                            className="FilterDropdownContentInputRadio"
                                            type="radio"
                                            name="category"
                                            checked={selectedCategory === category}
                                            onChange={() => handleCategorySelection(category)}
                                        />
                                        <span className="FilterDropdownContentCheckmark">
                                            {category}
                                        </span>
                                    </label>
                                ))}
                        </div>
                    </div>
                )}
            </div>
            {/* فیلتر برندها */}
            <div className="FilterDropdown">
                <button onClick={toggleBrandDropdown} className="FilterDropdownBtn">
                    برندها
                    <i className="bi bi-chevron-down"></i>
                </button>
                {isBrandDropdownVisible && (
                    <div className="FilterDropdownContent Show">
                        <input
                            type="text"
                            placeholder="جستجو برند..."
                            value={brandFilter}
                            onChange={(e) => setBrandFilter(e.target.value)}
                            className="FilterDropdownContentInputText"
                        />
                        <div className="FilterDropdownContentContainer">
                            {brands
                                .filter((brand) => brand.includes(brandFilter))
                                .map((brand, index) => (
                                    <label key={index} className="FilterContentLabel">
                                        <input
                                            type="checkbox"
                                            checked={selectedBrands.includes(brand)}
                                            onChange={() => handleBrandSelection(brand)}
                                        />
                                        <span className="FilterDropdownContentCheckmark">{brand}</span>
                                    </label>
                                ))}
                        </div>
                    </div>
                )}
            </div>
            {/* فیلتر موجود بودن کالا */}
            <div className="FilterSwitchContainer">
                <label className="FilterSwitchContainerLabel">
                    <input
                        className="FilterSwitchInputCheckbox"
                        type="checkbox"
                        checked={onlyAvailable}
                        onChange={() => setOnlyAvailable((prev) => !prev)}
                    />
                    <span className="FilterSwitchContainerLableText FSCLTextRound" />
                </label>
                فقط کالا های موجود
            </div>
            {/* فیلتر محدوده قیمت */}
            <div className="FilterPriceRange">
                <label>محدوده قیمت</label>
                <div className="FilterPriceRangeInputs">
                    <input
                        className="FilterPriceRangeInputMin"
                        type="input"
                        value={priceRange[0]}
                        onChange={(e) =>
                            setPriceRange([parseInt(e.target.value), priceRange[1]])
                        }
                    />
                    <span className="FilterPriceRangeText">تا</span>
                    <input
                        className="FilterPriceRangeInputMax"
                        type="input"
                        value={priceRange[1]}
                        onChange={(e) =>
                            setPriceRange([priceRange[0], parseInt(e.target.value)])
                        }
                    />
                </div>
            </div>

            {/* دکمه اعمال فیلتر */}
            <div>
                <button onClick={applyFilters} className="FilterApplyBtn">
                    اعمال فیلتر
                </button>
            </div>
        </div>
    );
};

export default Filter;
