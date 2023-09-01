import React from "react";
import { useSelector } from "react-redux";

const Quiz = () => {
  const selectedCategory = useSelector(
    (state) => state.categories.selectedCategory
  );
  return (
    <div className="quiz-container">
      <p>
        Current quiz topic:{" "}
        <span className="topic-label">{selectedCategory.label}</span>
      </p>
      <div className="quiz-body">
        <h3>Click the button below to generate a quiz.</h3>
        <button className="quiz-btn" onClick={() => {}}>
          Start
        </button>
      </div>
    </div>
  );
};

export default Quiz;
