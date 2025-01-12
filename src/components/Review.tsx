import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Inputmask from "inputmask";
import "./Review.css";
import { submitForm } from '../server/api';

const Review: React.FC = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initialEmail = queryParams.get("email") || "";

    const [phone, setPhone] = useState<string>("");
    const [fromDate, setFromDate] = useState<string>("");
    const [email, setEmail] = useState<string>(initialEmail);
    const [comments, setComments] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [responseMessage, setResponseMessage] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const phoneInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (phoneInputRef.current) {
            const im = new Inputmask("0999-999-9999");
            im.mask(phoneInputRef.current);
        }
    }, []);

    const handleSubmit = async () => {
        setIsSubmitting(true);

        // Validate phone number
        const phoneRegex = /^[0-9]{4}-[0-9]{3}-[0-9]{4}$/;
        if (!phone) {
            setError("شماره موبایل وارد نشده است.");
            setIsSubmitting(false);
            return;
        } else if (!phoneRegex.test(phone)) {
            setError("شماره موبایل باید به فرمت صحیح باشد (0999-999-9999).");
            setIsSubmitting(false);
            return;
        }

        // Validate email
        if (!email) {
            setError("ایمیل وارد نشده است.");
            setIsSubmitting(false);
            return;
        }
        // باید براش تعریف شه 

        const formData = {
            phone: phone.replace(/-/g, ""), // Remove dashes from phone number
            fromDate,
            email,
            comments,
        };

        try {
            const result = await submitForm("http://localhost:8000/regmsg/", formData);
            setResponseMessage("فرم با موفقیت ارسال شد!");
            setError("");
            setPhone("");
            setFromDate("");
            setEmail("");
            setComments("");
        } catch (err) {
            setError("ارسال فرم با خطا مواجه شد. لطفاً دوباره امتحان کنید.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="ReviewMain">
            <div>
                <div className="ReviewTelephone">
                    <label htmlFor="Telephoneform"> شماره تلفن :</label>
                    <form>
                        <div className="ReviewFormGroupPhone">
                            <input
                                ref={phoneInputRef}
                                className={`phone-input ${error ? "input-error" : ""}`}
                                type="tel"
                                value={phone}
                                onChange={(e) => {
                                    setPhone(e.target.value);
                                    setError("");
                                }}
                                placeholder="0912-345-6789"
                                required
                            />
                            <i className="bi bi-telephone"></i>
                        </div>
                    </form>
                </div>

            </div>

            <div className="Reviewdate">
                <label htmlFor="fromDate">تاریخ تولد :</label>
                <input
                    id="fromDate"
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                />
            </div>

            <div className="ReviewEmailSubscription">
                <label htmlFor="formEmail">ایمیل شما :</label>
                <form className="ReviewEmailSubscriptionForm">
                    <div className="ReviewEmailSubscriptionInput">
                        <input
                            type="email"
                            id="formEmail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <i className="bi bi-envelope-fill"></i>
                    </div>
                </form>
            </div>

            <div className="ReviewComments">
                <label htmlFor="formComments">متن دیدگاه :</label>
                <textarea
                    id="formComments"
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    rows={4}
                    placeholder="نظر خود را اینجا بنویسید..."
                />
            </div>
            <div className="ReviewDivButtonSubmit">
                <button onClick={handleSubmit} className="ReviewButton" disabled={isSubmitting}>
                    {isSubmitting ? "در حال ارسال..." : "ارسال فرم"}
                </button>
                {error && <p className="ReviewValidationError">{error}</p>}
                {responseMessage && <p className="ReviewDivButtonresponseMessage">{responseMessage}</p>}
            </div>
        </div>
    );
};

export default Review;