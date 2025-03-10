import React, { useState } from "react";
import "../Login/Login.css";
import { submitForm } from "../../server/api";
import Phone from "../../assets/svg/Phone";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


const Register: React.FC = () => {
    const [phone_number, setPhoneNumber] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhoneNumber(e.target.value);
        setError("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        const phone_numberRegex = /^[0-9]{11}$/;

        if (!phone_number) {
            setError("شماره موبایل وارد نشده است.");
            setTimeout(() => setIsSubmitting(false), 2000);
            return;
        } else if (!phone_numberRegex.test(phone_number)) {
            setError("شماره موبایل باید 11 رقم باشد.");
            setTimeout(() => setIsSubmitting(false), 2000);
            return;
        }

        const formData = {
            phone_number: phone_number,
        };

        try {
            const result = await submitForm("/api/auth/login-or-register/", formData, false);
            console.log("نتیجه ثبت نام یا ورود:", result);
            setPhoneNumber("");
            setError("");
        } catch (err) {
            setError("ارسال با خطا مواجه شد. لطفاً دوباره امتحان کنید.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="login-container" style={{ height: "400px" }}>
            <h2>بقالی</h2>
            <div>
                <h3>ورود یا ثبت‌نام</h3>
                <p className="login-container-p">
                    برای ورود یا ثبت‌نام شماره موبایل خود را وارد کنید.
                </p>
            </div>
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-group-login" style={{ marginBottom: "25px" }}>
                    <div className="form-Icom-login">
                        <Phone />
                    </div>
                    <input
                        className={`phone-input ${error ? "input-error" : ""}`}
                        type="tel"
                        value={phone_number}
                        onChange={handlePhoneChange}
                        placeholder="شماره تلفن"
                        aria-label="phone"
                        required
                    />
                </div>
                {error && <p className="validation-error">{error}</p>}
                <button className="button-login" disabled={isSubmitting} type="submit">
                    ورود
                </button>
            </form>
            <p className="Signin-login d-flex gap-1">
                برای
                {" "}<Link to="/login" className="" aria-label="User Profile">
                    ورود‌
                </Link>{" "}
                یا‌
                {" "}<Link to="/Signup" className="" aria-label="User Profile">
                    ثبت‌نام‌
                </Link>{" "}
                کلیک کنید.
            </p>
        </div>
    );
};

export default Register;
