import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Inputmask from "inputmask";
import "./Review.css";

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

    const handleSubmit = () => {
        const phoneRegex = /^[0-9]{4}-[0-9]{3}-[0-9]{4}$/;

        // Validate phone number
        if (!phone) {
            setError("شماره موبایل وارد نشده است.");
            return;
        } else if (!phoneRegex.test(phone)) {
            setError("شماره موبایل باید به فرمت صحیح باشد (0999-999-9999).");
            return;
        }

        // Validate email
        if (!email) {
            setError("ایمیل وارد نشده است.");
            return;
        }

        const formData = {
            phone: phone.replace(/-/g, ""), // Remove dashes from phone number
            fromDate,
            email,
            comments,
        };

        // Dynamically construct the URL (for debugging purposes, but we send data as POST)
        const url = `http://localhost:8000/regmsg/`;

        // Set isSubmitting to true when the request starts
        setIsSubmitting(true);

        // Make the POST request
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData), // Send formData as the body of the request
        })

            .then((result) => {
                console.log(result);

                // After successful fetch, clear form and show success message
                setPhone("");
                setFromDate("");
                setEmail("");
                setComments("");

                setResponseMessage("فرم با موفقیت ارسال شد!"); // Set success message
                setError(""); // Clear any previous errors
                setIsSubmitting(false); // Set isSubmitting back to false
            })
            .catch((error) => {
                console.error(error);
                setError(error.message); // Set error message if request fails
                setIsSubmitting(false); // Set isSubmitting back to false
            });
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
                                    setError(""); // Clear error when user types
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
