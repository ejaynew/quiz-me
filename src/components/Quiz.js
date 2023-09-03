import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchNewQuestions } from "../redux/slices/quizSlice";

const Quiz = () => {
  const selectedCategory = useSelector(
    (state) => state.categories.selectedCategory
  );
  const questions = useSelector((state) => state.quiz.questions);

  const dispatch = useDispatch();
  const handleStartClick = () => {
    dispatch(fetchNewQuestions(selectedCategory));
  };

  return (
    <div className="quiz-container">
      <p>
        Current quiz topic:{" "}
        <span className="topic-label">
          {selectedCategory && selectedCategory.label}
        </span>
      </p>
      <div className="quiz-body">
        <div className="start-quiz">
          <h3>Click the button below to generate a quiz.</h3>
          <button className="quiz-btn" onClick={handleStartClick}>
            Start
          </button>
        </div>
        <div className="questions-container">
          {questions.map((question) => {
            console.log(question.question);
            return (
              <div class="question">
                <p>{question.question}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
