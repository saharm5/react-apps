import React from "react";
import AddToCart from "../assets/svg/AddToCart";
import Trash from "../assets/svg/TrashX";
import 'bootstrap/dist/css/bootstrap.min.css';
import Minus from "../assets/svg/Minus";
import Plus from "../assets/svg/Plus";

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
                height: "45px",
                justifyContent: "center",
                maxWidth: "100%",
            }}
        >

            {quantity === 0 ? (
                <button
                    className="btn d-flex align-items-center"
                    style={{
                        backgroundColor: "rgb(19 62 135)",
                        width: "100%",
                        height: "45px",
                        justifyContent: "center",
                        lineHeight: "1.5",
                    }}
                    onClick={onAdd}
                >
                    <span className="m-2"><AddToCart /></span>
                    <span style={{color:"white"}}>{addcard}</span>
                </button>
            ) : (
                    <div className="d-flex rounded align-items-center  justify-content-evenly" style={{
                    width: "100%",
                    height: "45px",
                    padding: "0",
                    backgroundColor: "rgb(19 62 135)",

                }}>
                    <button
                        className="d-flex justify-content-center align-items-center btn text-light fw-bold"
                        style={{
                            backgroundColor: "پ rgb(19 62 135)",
                            boxShadow: "none",
                            border: "none",
                            height: "30px",
                            width: "30px",
                            padding: "0",
                            margin: "5px"
                        }}
                        onClick={onAdd}
                    >
                        <Plus />
                    </button>
                    <span
                        className="fw-bold d-flex align-items-center justify-content-center"
                        style={{
                            backgroundColor: "inherit",
                            boxShadow: "none",
                            border: "none",
                            height: "30px",
                            width: "auto",
                            margin: "0 10px",
                            padding: "3px 0 0"
                        }}
                    >
                        {quantity}
                    </span>
                    <button
                        className="d-flex justify-content-center align-items-center btn text-light fw-bold"
                        style={{
                            backgroundColor: "rgb(19 62 135)",
                            boxShadow: "none",
                            border: "none",
                            height: "30px",
                            width: "30px",
                            padding: "0",
                            margin: "5px"
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
