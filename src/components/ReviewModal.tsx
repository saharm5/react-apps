// وارد کردن React و useState برای مدیریت state داخلی
import React, { useState } from "react";

// وارد کردن کامپوننت‌های Modal و Button از react-bootstrap
import { Modal, Button } from "react-bootstrap";

// وارد کردن کامپوننت Rating از @mui/material جهت نمایش امتیازدهی
import Rating from "@mui/material/Rating";

// تعریف اینترفیس props برای این کامپوننت
interface ReviewMultiStepModalProps {
  show: boolean;           // وضعیت نمایش مدال
  handleClose: () => void; // تابع بستن مدال
}

// تعریف کامپوننت تابعی ReviewMultiStepModal
const ReviewMultiStepModal: React.FC<ReviewMultiStepModalProps> = ({ show, handleClose }) => {
  // تعریف state مرحله فعلی، مقدار اولیه ۱
  const [step, setStep] = useState(1);
  // state امتیاز، مقدار اولیه ۰
  const [rating, setRating] = useState<number | null>(0);
  // state نام کاربر، مقدار اولیه رشته خالی
  const [name, setName] = useState<string>("");
  // state متن دیدگاه کاربر، مقدار اولیه رشته خالی
  const [comment, setComment] = useState<string>("");

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>ثبت امتیاز و دیدگاه</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {step === 1 ? (
          // **مرحله ۱: امتیازدهی**
          <div className="text-center">
            {/* نمایش تصویر نمونه محصول */}
            <img src="/path-to-product-image.jpg" alt="محصول" style={{ width: "100px" }} />
            <h5 className="mt-3">دوغ کفیر لیان</h5>
            <p>چقدر از این محصول راضی بودید؟</p>
            {/* کامپوننت Rating جهت انتخاب امتیاز */}
            <Rating
              name="product-rating"
              value={rating}
              onChange={(_, newValue) => setRating(newValue)}
            />
            {/* دکمه جهت رفتن به مرحله بعد؛ تنها در صورت انتخاب امتیاز فعال است */}
            <Button variant="primary" className="mt-3" onClick={() => setStep(2)} disabled={!rating}>
              ثبت امتیاز →
            </Button>
          </div>
        ) : (
          // **مرحله ۲: ثبت نام و دیدگاه**
          <div>
            <p className="fw-bold">امتیاز شما به دوغ کفیر لیان:</p>
            {/* نمایش امتیاز به صورت فقط خواندنی */}
            <Rating name="final-rating" value={rating} readOnly />

            <div className="mt-3">
              <label>نام خود را وارد کنید (اختیاری):</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="ناشناس"
              />
            </div>

            <div className="mt-3">
              <label>متن دیدگاه:</label>
              <textarea
                className="form-control"
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="نظر خود را درباره این کالا بنویسید..."
              />
            </div>

            {/* دکمه ثبت دیدگاه که در این نسخه تنها با بستن مدال عمل می‌کند */}
            <Button variant="success" className="mt-3" onClick={handleClose}>
              ثبت دیدگاه
            </Button>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

// صادر کردن کامپوننت
export default ReviewMultiStepModal;
