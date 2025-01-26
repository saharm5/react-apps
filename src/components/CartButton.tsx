import React from "react";

interface CartButtonProps {
    quantity: number;
    onAdd: () => void;
    onReduce: () => void;
}

const CartButton: React.FC<CartButtonProps> = ({ quantity, onAdd, onReduce }) => {
    return (
        <div
            className="d-flex align-items-center text-white rounded"
            style={{
                width: "208.531px",
                height: "40px", // Ensure consistent height
                justifyContent: "center",
            }}
        >
            {quantity === 0 ? (
                <button
                    className="btn btn-primary  d-flex align-items-center h-100"
                    style={{
                        width: "208.531px",
                        height: "40px", // Ensure consistent height
                        justifyContent: "center",
                        lineHeight: "1.5",
                    }}

                    onClick={onAdd}
                >
                    🛒 <span className="ms-2">افزودن به سبد خرید</span>
                </button>
            ) : (
                <div className="d-flex bg-primary rounded align-items-center gap-2 h-100" style={{
                    width: "208.531px",
                    height: "40px", // Ensure consistent height
                    justifyContent: "space-evenly",
                    lineHeight: "1.5",
                }}>
                    <button
                        className="btn btn-primary text-light fw-bold h-100"
                        style={{ width: "40px" }} // Fixed width for uniformity
                        onClick={onAdd}
                    >
                        +
                    </button>
                    <span
                        className="fw-bold d-flex align-items-center justify-content-center"
                        style={{
                            width: "40px",
                            height: "100%", // Match parent height
                        }}
                    >
                        {quantity}
                    </span>
                    <button
                        className="btn btn-primary text-light  text-danger h-100"
                        style={{ width: "40px" }} // Fixed width for uniformity
                        onClick={onReduce}
                    >
                        {quantity === 1 ? (
                            <i className="bi bi-trash3 "></i>
                        ) : (
                            <span>-</span>
                        )}
                    </button>
                </div>
            )}
        </div>
    );
};

export default CartButton;
