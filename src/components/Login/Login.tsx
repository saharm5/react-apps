import React, { useState } from "react";
import "./Login.css";
import { submitForm } from "../../server/api";
import Phone from "../../assets/svg/Phone";
import VerificationCode from "../../assets/svg/VerificationCode";

const Login: React.FC = () => {
  const [phone_number, setphone_number] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setphone_number(e.target.value);
    setError("");
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevents default form submission behavior
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

    if (!password) {
      setError("رمز عبور الزامی است.");
      setTimeout(() => setIsSubmitting(false), 2000);
      return;
    }

    const formData = { phone_number, password };

    try {
      await submitForm("api/auth/login/", formData);
      setphone_number("");
      setPassword("");
      setError("");
    } catch (err) {
      setError("ارسال با خطا مواجه شد. لطفاً دوباره امتحان کنید.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <h2>بقالی</h2>
      <div>
        <h3>ورود</h3>
        <p className="login-container-p">
          برای ورود شماره موبایل خود را وارد کنید.
        </p>
      </div>
      <form className="login-form " onSubmit={handleSubmit}>
        <div className="form-group-login">
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
        <div className="form-group-login" style={{ marginBottom: "25px" }}>
          <div className="form-Icom-login">
          <VerificationCode />
          </div>
          <input
            type="password"
            className={`password-input ${error ? "input-error" : ""}`}
            value={password}
            onChange={handlePasswordChange}
            placeholder="رمز ورود"
            required
          />
        </div>
        {error && <p className="validation-error">{error}</p>}
        <button className="button-login" disabled={isSubmitting} type="submit">
          ورود
        </button>
      </form>
      <p className="disclaimer-login">
        ورود شما به معنی پذیرش
        <a href="#" className="ColorRoll-login"> قوانین و مقررات </a>
        است.
      </p>
    </div>
  );
};

export default Login;
