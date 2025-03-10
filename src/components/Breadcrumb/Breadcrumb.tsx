import { Link, useLocation } from "react-router-dom";
import "./Breadcrumb.css"
const routeNames: Record<string, string> = {
    products: "محصولات",
    productdetails: "جزئیات محصول",
    review: "نظرات",
    signup: "ثبت نام",
    login: "ورود",
    register: "ورود یا ثبت نام",
};

const Breadcrumb = () => {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((x) => x);
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get("search");

    return (
        <nav className="text-muted my-1">
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/" className="textcolor">
                        صفحه اصلی
                    </Link>
                </li>
                {pathnames.map((name, index) => {
                    const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
                    const isLast = index === pathnames.length - 1;
                    const displayName = routeNames[name.toLowerCase()] || decodeURIComponent(name);
                    return (
                        <li key={routeTo} className="breadcrumb-item d-flex align-items-center">
                            {isLast && searchQuery ? (
                                <span className="text-muted">جستجو: {decodeURIComponent(searchQuery)}</span>
                            ) : isLast ? (
                                <span className="text-muted">{displayName}</span>
                            ) : (
                                <Link to={routeTo} className="text-primary">
                                    {displayName}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumb;
