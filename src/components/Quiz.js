import React from "react";
import { useSelector } from "react-redux";

const Quiz = () => {
  const topic = useSelector((state) => state.categories.selectedCategory);
  return (
    <div className="quiz-container">
      <p>
        Current quiz topic: <span className="topic-label">{topic}</span>
      </p>
      <div className="quiz-body"></div>
    </div>
  );
};

export default Quiz;
