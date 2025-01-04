import React, { useState, useEffect, useRef } from "react";
import Inputmask from "inputmask"; // Now TypeScript should recognize this
import "./Review.css";

const Review: React.FC = () => {
    const [phone, setPhone] = useState<string>("");
    const [error, setError] = useState<string>("");


    const phoneInputRef = useRef<HTMLInputElement>(null);


    useEffect(() => {
        if (phoneInputRef.current) {

            const im = new Inputmask("0999-999-9999");
            im.mask(phoneInputRef.current);
        }
    }, []);
    const [fromDate, setFromDate] = useState(new Date());

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhone(e.target.value);
        setError("");
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const phoneRegex = /^[0-9]{11}$/;
        if (!phone) {
            setError("شماره موبایل وارد نشده است.");
        } else if (!phoneRegex.test(phone.replace(/-/g, ""))) {
            setError("شماره موبایل باید 11 رقم باشد.");
        } else {
            setError("");
            alert("ورود با موفقیت انجام شد!");
        }
    };

    return (
        <div className="ReviewMain">

            {/* Phone Number Form */}
            <div>
                <div className="ReviewTelephone">
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="Telephoneform"> شماره تلفن :</label>
                        <div className="ReviewFormGroupPhone">
                            <input
                                ref={phoneInputRef}
                                className={`phone-input ${error ? "input-error" : ""}`}
                                type="tel"
                                value={phone}
                                onChange={handleInputChange}
                                placeholder=""
                                aria-label="phone"
                                required
                                id="Telephoneform"
                            />

                            <i className="bi bi-telephone"></i>
                        </div>
                    </form>
                </div>

                {error && <p className="ReviewValidationError">{error}</p>}
            </div>



            {/* date */}

            <div className="Reviewdate">
                <label htmlFor="fromDate">تاریخ تولد :</label>
                <input
                    id="fromDate"
                    name="fromDate"
                    type="date"
                    autoComplete="off"
                    value={
                        fromDate.getFullYear().toString() +
                        "-" +
                        (fromDate.getMonth() + 1).toString().padStart(2, '0') +
                        "-" +
                        fromDate.getDate().toString().padStart(2, '0')
                    }
                    onChange={(e) => {
                        setFromDate(new Date(e.target.value));
                    }}
                />

            </div>
            {/* Email Subscription */}
            <div className="ReviewEmailSubscription">
                <label htmlFor="formEmail">ایمیل شما :</label>
                <form className="ReviewEmailSubscriptionForm">
                    <div className="ReviewEmailSubscriptionInput">
                        <input type="email" id="formEmail" placeholder="" />
                        <i className="bi bi-envelope-fill"></i>
                    </div>
                    {/* <i className="ReviewEmailSubscriptionDiv ">
                        <FontAwesomeIcon icon={faEnvelope} />
                    </i> */}
                </form>
            </div>



            {/* Comments */}

            <div className="ReviewComments">
                <label htmlFor="formComments">
                    متن دیدگاه :
                </label>
                <input type="text"
                    id="formComments"
                    name="formComments"
                    placeholder="نظر خود را با ما به اشتراک بگذارید"
                />
            </div>
            {/* button */}
            <div className="ReviewDivButtonSubmit">
                <button className="ReviewButton" type="submit">
                    submit
                </button>

            </div>
        </div>
    );
};

export default Review;
