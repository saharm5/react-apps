import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Rating from "@mui/material/Rating";

interface ReviewMultiStepModalProps {
  show: boolean;
  handleClose: () => void;
}

const ReviewMultiStepModal: React.FC<ReviewMultiStepModalProps> = ({ show, handleClose }) => {
  const [step, setStep] = useState(1); // مدیریت مراحل مدال
  const [rating, setRating] = useState<number | null>(0);
  const [name, setName] = useState<string>("");
  const [comment, setComment] = useState<string>("");

  // تابع برای بستن مدال و بازنشانی مرحله به ۱
  const handleCloseAndReset = () => {
    setStep(1);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleCloseAndReset} dialogClassName="modal-dialog-centered">
      <Modal.Header closeButton>
        <Modal.Title>ثبت امتیاز و دیدگاه</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {step === 1 ? (
          // **مرحله ۱: امتیازدهی**
          <div className="text-center">
            <img
              src="/path-to-product-image.jpg"
              alt="محصول"
              style={{ width: "100px", marginBottom: "10px" }}
            />
            <h5 className="mt-2">دوغ کفیر لیان</h5>
            <p className="mt-3">چقدر از این محصول راضی بودید؟</p>
            <Rating
              name="product-rating"
              value={rating}
              size="large"
              onChange={(_, newValue) => setRating(newValue)}
            />
            <Button
              variant="primary"
              className="mt-4 w-100"
              onClick={() => setStep(2)}
              disabled={!rating}
            >
              ثبت امتیاز →
            </Button>
          </div>
        ) : (
          // **مرحله ۲: ثبت نام و دیدگاه**
          <div>
            <p className="fw-bold">امتیاز شما به دوغ کفیر لیان:</p>
            <Rating name="final-rating" value={rating} readOnly />

            <div className="mt-3">
              <label className="form-label">نام خود را وارد کنید (اختیاری):</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="ناشناس"
              />
            </div>

            <div className="mt-3">
              <label className="form-label">متن دیدگاه:</label>
              <textarea
                className="form-control"
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="نظر خود را درباره این کالا بنویسید..."
              />
            </div>

            <div className="d-flex justify-content-between mt-4">
              {/* دکمه بازگشت */}
              <Button variant="secondary" onClick={() => setStep(1)}>
                ← بازگشت
              </Button>

              {/* دکمه ثبت نظر */}
              <Button variant="success" onClick={handleCloseAndReset}>
                ثبت دیدگاه
              </Button>
            </div>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ReviewMultiStepModal;
