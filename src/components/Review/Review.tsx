// C: \Users\Sanay\react - apps\src\components\Review\Review.tsx
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { submitForm } from "../../server/api";

const Review: React.FC = () => {
    const [fromHeader, setFromHeader] = useState<string>("");
    const [rating, setRating] = useState<number | null>(1);
    const [name, setName] = useState<string | "ناشناس">("");
    const [comments, setComments] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [responseMessage, setResponseMessage] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [hover, setHover] = React.useState(-1);

    function getLabelText(rating: number) {
        return `${rating} Star${rating !== 1 ? 's' : ''}, ${ratingMessages[rating]}`;
    }
    const ratingMessages: { [key: number]: string } = {
        1: "خیلی بد",
        2: "پیشنهاد نمی‌کنم",
        3: "قابل قبول بود",
        4: "خوبه",
        5: "عالی بود",
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);

        if (!name) {
            setName("ناشناس");
            setIsSubmitting(true);
            return;
        }
        if (!rating) {
            setError("لطفا امتیازتان را به محصول وارد کنید");
            setIsSubmitting(false);
            return;
        }

        const formData = { fromHeader, rating, name, comments };

        try {
            await submitForm("api/reviews/", formData);
            setResponseMessage("فرم با موفقیت ارسال شد!");
            setError("");
            setFromHeader("");
            setRating(1);
            setName("");
            setComments("");
        } catch (err) {
            console.error("Error submitting form:", err);
            setError("ارسال فرم با خطا مواجه شد. لطفاً دوباره امتحان کنید.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mt-4 ReviewMain">
            <Box sx={{ "& > legend": { mt: 3 } }} className="mb-3 text-end" >
                <Typography component="legend">امتیاز خود را انتخاب کنید:</Typography>
                <Rating
                    dir="ltr"
                    name="simple-controlled"
                    value={rating}
                    getLabelText={getLabelText}
                    onChangeActive={(event, newHover) => {
                        setHover(newHover);
                    }}
                    onChange={(_event: React.SyntheticEvent, newValue: number | null) => setRating(newValue)}
                />
                {rating !== null && (
                    <Box className="mt-2 text-primary" sx={{ ml: 2 }}>{ratingMessages[hover !== -1 ? hover : rating]}</Box>
                )}
            </Box>
            <div className="ReviewEmailSubscription">
                <form className="ReviewEmailSubscription form-control">
                    <label htmlFor="formName" className="form-label">نام شما:</label>
                    <input
                        type="text"
                        placeholder="ناشناس"
                        id="formName"
                        className="ReviewEmailSubscriptionInput form-control"
                        value={name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                    />
                </form>
            </div>
            <div className="ReviewEmailSubscription">
                <form className="ReviewEmailSubscription form-control">
                    <label htmlFor="fromHeader" className="form-label">عنوان نظر:</label>
                    <input
                        id="fromHeader"
                        type="text"
                        className="ReviewEmailSubscriptionInput form-control"
                        value={fromHeader}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFromHeader(e.target.value)}
                    />
                </form>
            </div>
            <div className="ReviewComments">
                <label htmlFor="formComments" className="form-label">متن دیدگاه:</label>
                <textarea
                    id="formComments"
                    className="form-control"
                    value={comments}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setComments(e.target.value)}
                    rows={4}
                    placeholder="نظر خود را اینجا بنویسید..."
                />
            </div>
            <div className="ReviewDivButtonSubmit d-flex justify-content-end">
                <button onClick={handleSubmit} className="btn ReviewButton" disabled={isSubmitting}>
                    {isSubmitting ? "در حال ارسال..." : "ارسال فرم"}
                </button>
            </div>
            {error && <p className="ReviewValidationError">{error}</p>}
            {responseMessage && <p className="ReviewDivButtonresponseMessage">{responseMessage}</p>}
        </div>
    );
};

export default Review;