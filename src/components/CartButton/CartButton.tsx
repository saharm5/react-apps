import React from "react";
import AddToCart from "../../assets/svg/AddToCart";
import Trash from "../../assets/svg/TrashX";
import 'bootstrap/dist/css/bootstrap.min.css';
import Minus from "../../assets/svg/Minus";
import Plus from "../../assets/svg/Plus";

interface CartButtonProps {
    quantity: number;
    onAdd: () => void;
    onReduce: () => void;
    addcard: string;
}

const CartButton: React.FC<CartButtonProps> = ({ quantity, onAdd, onReduce, addcard }) => {
    return (
        <div
            className="d-flex align-items-center text-white rounded"
            style={{
                width: "100%",
                height: "35px",
                justifyContent: "center",
                maxWidth: "100%",
            }}
        >

            {quantity === 0 ? (
                <button
                    className="btn d-flex align-items-center"
                    style={{
                        backgroundColor: "rgb(214 230 242)",
                        width: "100%",
                        height: "35px",
                        justifyContent: "center",
                        lineHeight: "1.5",
                    }}
                    onClick={onAdd}
                >
                    <span className="m-2"><AddToCart /></span>
                    <span style={{ color: "rgb(19 62 135)" }}>{addcard}</span>
                </button>
            ) : (
                <div className="d-flex rounded align-items-end  justify-content-evenly" style={{
                    width: "100%",
                    height: "35px",
                    padding: "0",
                    backgroundColor: "rgb(214 230 242)",
                    border: "rgb(19 62 135) solid 1px"


                }}>
                    <button
                        className="d-flex justify-content-center align-items-center btn text-light fw-bold"
                        style={{
                            backgroundColor: "",
                            boxShadow: "none",
                            border: "none",
                            height: "30px",
                            width: "35px",
                            padding: "0",
                        }}
                        onClick={onAdd}
                    >
                        <Plus />
                    </button>
                    <span
                        className="fw-bold d-flex align-items-center justify-content-center"
                        style={{
                            backgroundColor: "",
                            boxShadow: "none",
                            border: "none",
                            height: "28px",
                            width: "35px",
                            fontSize: "16px",
                            padding: "0",
                            color: "rgb(19 62 135)"
                        }}
                    >
                        {quantity}
                    </span>
                    <button
                        className="d-flex justify-content-center align-items-center btn text-light fw-bold"
                        style={{
                            backgroundColor: "",
                            boxShadow: "none",
                            border: "none",
                            height: "32px",
                            width: "35px",
                            padding: "0",
                        }}
                        onClick={onReduce}
                    >
                        {quantity === 1 ? (
                            <Trash />
                        ) : (
                            <Minus />
                        )}
                    </button>
                </div>
            )}
        </div>
    );
};

export default CartButton;
