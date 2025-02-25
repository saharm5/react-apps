import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const CheckoutCart: React.FC = () => {

    return (
        <div className="w-25 px-3 ">
          
            <div className="CheckoutCart position-relative rounded shadow mx-3 gap-5 p-4">
                    <div>
                         <div className="d-flex flex-row justify-content-between p-2">
                            <p className="">"جمع خرید"</p><p>تومان</p>
                        </div>
                        <div className="d-flex flex-row justify-content-between p-2">
                            <p className="">"تخفیف "</p> <p className="">تومان % درصد</p>
                        </div>
                         <div className="d-flex flex-row justify-content-between p-2">
                            <p className="">"جمع  باتخفیف خرید"</p><p>تومان</p>
                        </div>
                    </div>

                <div className="d-flex justify-content-center my-3">
                    {/* style="width: 100%; height: 35px; padding: 0px; background-color: rgb(214, 230, 242); border: 1px solid rgb(19, 62, 135);" */}
                    <button className="btn w-100 border" style={{ backgroundColor: "rgb(214, 230, 242)" }}>
                            تکمیل سفارش
                        </button>
                    </div>
                    <div className="d-flex align-items-end">

                        <p className="text-muted m-0 AboutProductpS">

                            مراحل سفارشتان تکمیل نشده در صورت اتمام موجودی، کالاها حذف می‌شوند.

                        </p>
                    </div>


                </div>
             
        </div>
    );
};

export default CheckoutCart;
