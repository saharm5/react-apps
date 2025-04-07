import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Rating from "@mui/material/Rating";
import { Box } from "@mui/material";
import "../ProductReview.css";
import { submitForm } from "../../../server/api";
import { useNavigate } from "react-router-dom";  // Import useNavigate

interface Product {
  product_name: string;
  id: number;
  imageUrl: string | null;
}

interface ReviewMultiStepModalProps {
  show: boolean;
  products: Product[];
  handleClose: () => void;
}

const ReviewMultiStepModal: React.FC<ReviewMultiStepModalProps> = ({ show, products, handleClose }) => {
  const [step, setStep] = useState(1);
  const [rating, setRating] = useState<number | null>(1);
  const [name, setName] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [hover, setHover] = useState(-1);
  const navigate = useNavigate();  // Use navigate hook

  const handleModalClose = () => {
    setError("");
    setRating(1);
    setName("");
    setComment("");
    setStep(1);
    handleClose();
  };

  const handleCloseAndReset = async (product: Product) => {
    if (!rating) {
      setError("لطفا امتیازتان را به محصول وارد کنید");
      return;
    }

    const customer_name = name || "ناشناس";
    const id = product.id;
    const formData = { id, rating, customer_name, comment };
    console.log("formData:", formData);
    try {
      await submitForm("AddReview/review/", formData, navigate);  // Pass navigate here
      setError("");
      setRating(1);
      setName("");
      setComment("");
      setStep(1);
      handleClose();
    } catch (err) {
      console.error("Error submitting form:", err);
      setError("ارسال فرم با خطا مواجه شد. لطفاً دوباره امتحان کنید.");
      alert("لطفا وارد شوید");
    }
  };

  const ratingMessages: { [key: number]: string } = {
    1: "خیلی بد",
    2: "بد",
    3: "متوسط",
    4: "خوب",
    5: "عالی",
  };

  return (
    <div>
      {products.map((product) => (
        <Modal
          key={product.id}
          show={show}
          onHide={handleModalClose}
          dialogClassName="modal-dialog-centered"
        >
          <Modal.Header closeButton className="d-flex justify-content-between">
            <Modal.Title className="fs-5">ثبت امتیاز و دیدگاه</Modal.Title>
          </Modal.Header>
          <Modal.Body className="modalsize">
            {step === 1 ? (
              <div className="h-100 text-center d-flex flex-column align-items-center justify-content-between">
                <img
                  src={
                    product.imageUrl ||
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs9gUXKwt2KErC_jWWlkZkGabxpeGchT-fyw&s"
                  }
                  alt={product.product_name}
                  className="mb-4 w-25"
                />
                <p className="m-2 fw-bold">{product.product_name}</p>
                <p className="mt-5">چقدر از این محصول راضی بودید؟</p>
                <Rating
                  className="gap-2"
                  dir="ltr"
                  name="product-rating"
                  value={rating}
                  size="large"
                  onChangeActive={(event, newHover) => {
                    setHover(newHover);
                  }}
                  onChange={(_event: React.SyntheticEvent, newValue: number | null) => {
                    setRating(newValue);
                  }}
                />
                {rating !== null && (
                  <Box className="mt-2" sx={{ ml: 2 }}>
                    {ratingMessages[hover !== -1 ? hover : rating]}
                  </Box>
                )}
                <div className="d-flex w-100 flex-column justify-content-between mt-3 ReviewButton">
                  <button className="btn mt-2 ReviewButton" onClick={() => setStep(2)} disabled={!rating}>
                    ثبت امتیاز و دیدگاه
                  </button>
                </div>
              </div>
            ) : (
              <div className="h-100 d-flex flex-column justify-content-between">
                <div>
                  <p className="mb-3">امتیاز شما به {product.product_name}:</p>
                  <Rating
                    className="mx-3 gap-2"
                    name="final-rating"
                    value={rating}
                    dir="ltr"
                    size="large"
                    onChangeActive={(event, newHover) => {
                      setHover(newHover);
                    }}
                    onChange={(_event: React.SyntheticEvent, newValue: number | null) => {
                      setRating(newValue);
                    }}
                  />
                </div>
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
                <div className="d-flex w-100 flex-column justify-content-between mt-3 ReviewButton">
                  <button className="btn mt-2 ReviewButton" onClick={() => handleCloseAndReset(product)} disabled={!rating}>
                    ثبت امتیاز و دیدگاه
                  </button>
                </div>
              </div>
            )}
          </Modal.Body>
        </Modal>
      ))}
    </div>
  );
};

export default ReviewMultiStepModal;
