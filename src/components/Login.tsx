import React, { useState } from "react";
import "./Login.css";

const Login: React.FC = () => {
  const [phone, setPhone] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
    setError("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const phoneRegex = /^[0-9]{11}$/;
    if (!phone) {
      setError("شماره موبایل وارد نشده است.");
    } else if (!phoneRegex.test(phone)) {
      setError("شماره موبایل باید 11 رقم باشد.");
    } else {
      setError("");
      alert("ورود با موفقیت انجام شد!"); // Simulate successful login
    }
  };

  return (
    <div className="">
      <div className="login-container">
        <div className="">
          <h2>بقالی</h2>
        </div>
        <div className="">
          <div className="">
            <h3>ورود | ثبت نام</h3>
          </div>
          <div className="">
            <p className="login-container-p ">
              برای ورود یا ثبت‌نام، شماره موبایل خود را وارد کنید.
            </p>
          </div>
          <div className="telephone">
            <form onSubmit={handleSubmit}>
              <div className="form-group-login">
                <i className="bi bi-telephone"></i>
                <input
                  className={`phone-input ${error ? "input-error" : ""}`}
                  type="tel"
                  value={phone}
                  onChange={handleInputChange}
                  placeholder="شماره تلفن"
                  aria-label="phone"
                  required
                />
              </div>
              {error && <p className="validation-error">{error}</p>}
              <button className="button-login" type="submit">
                ورود
              </button>
            </form>
          </div>

          <p className="disclaimer-login ">
            ورود شما به معنی پذیرش
            <a href="#" className="ColorRoll-login">
              قوانین و مقررات
            </a>
            است.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
