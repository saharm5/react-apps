import Review from "../components/Review";
import "../styles/global.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import React from "react";
import useBodyClass from "../components/useBodyClass"

const ReviewPage: React.FC = () => {
  useBodyClass("body-ReviewPage");

  return (
    <div>
      <Review />
    </div>
  );
};

export default ReviewPage;
