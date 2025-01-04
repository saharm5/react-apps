import Review from "../components/Review";
import "../styles/global.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import React, { useEffect } from "react";

const ReviewPage: React.FC = () => {
  useEffect(() => {
    document.body.classList.add("body-ReviewPage");

    return () => {
      document.body.classList.remove("body-ReviewPage");
    };
  }, []);
  return (
    <div>
      <Review />
    </div>
  );
};

export default ReviewPage;
