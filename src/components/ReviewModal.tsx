import React from "react";
import { Modal, Button } from "react-bootstrap";
import Review from "./Review/Review"; // ایمپورت کامپوننت فرم

interface ReviewModalProps {
    show: boolean;
    handleClose: () => void;
}

const ReviewModal: React.FC<ReviewModalProps> = ({ show, handleClose }) => {
    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>ثبت دیدگاه</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Review />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    بستن
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ReviewModal;
