import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchNewQuestions,
  setActiveQuestion,
  clearSelectedAnswer,
} from "../redux/slices/quizSlice";
import { ActiveQuestion } from "../components/ActiveQuestion";

const Quiz = () => {
  const selectedCategory = useSelector(
    (state) => state.categories.selectedCategory
  );
  const error = useSelector((state) => state.quiz.error);
  const questions = useSelector((state) => state.quiz.questions);
  const isLoading = useSelector((state) => state.quiz.loading);
  const activeQuestionKey = useSelector(
    (state) => state.quiz.activeQuestionKey
  );

  const dispatch = useDispatch();
  const handleStartClick = () => {
    dispatch(clearSelectedAnswer());
    dispatch(fetchNewQuestions(selectedCategory));
  };
  const handleBackClick = () => {
    dispatch(clearSelectedAnswer());
    dispatch(setActiveQuestion(Math.max(activeQuestionKey - 1, 0)));
  };
  const handleNextClick = () => {
    dispatch(clearSelectedAnswer());
    dispatch(
      setActiveQuestion(Math.min(activeQuestionKey + 1, questions.length - 1))
    );
  };
  const handleClear = () => {
    dispatch(clearSelectedAnswer());
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
            Start a new quiz
          </button>
        </div>
        <div className="loading-container">
          {isLoading ? <p>Loading...</p> : <span></span>}
        </div>
        <div className="questions-container">
          {questions.length ? (
            <ActiveQuestion />
          ) : (
            <div className="quiz-error">
              <p>{error}</p>
            </div>
          )}
        </div>
        <div className="controls">
          <button onClick={handleBackClick}>Back</button>
          <button onClick={handleClear}>Clear current answer</button>
          <button onClick={handleNextClick}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
