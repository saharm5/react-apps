import React, { useState } from "react";
import "./Login.css";
import { submitForm } from "../server/api";

const Login: React.FC = () => {
  const [phone, setPhone] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
    setError("");
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    const phoneRegex = /^[0-9]{11}$/;
    if (!phone) {
      setError("شماره موبایل وارد نشده است.");
      // setIsSubmitting(false);
      setTimeout(() => setIsSubmitting(false), 2000);
      return;


    } else if (!phoneRegex.test(phone)) {
      setError("شماره موبایل باید 11 رقم باشد.");
      // setIsSubmitting(false);
      setTimeout(() => setIsSubmitting(false), 2000);

      return;

    }


    const formData = {
      phone,
    };

    console.log(formData);

    try {
      const result = await submitForm("/regmsg/", formData);
      setError("");
      setPhone("");
    } catch (err) {
      setError("ارسال با خطا مواجه شد. لطفاً دوباره امتحان کنید.");
    } finally {
      setIsSubmitting(false);
    }
  };


  //adding password or not 


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
              برای ورود یا ثبت‌ نام، شماره موبایل خود را وارد کنید.
            </p>
          </div>
          <div className="telephone">
            <form>
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
              <button className="button-login" onClick={handleSubmit} disabled={isSubmitting} type="submit">
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
