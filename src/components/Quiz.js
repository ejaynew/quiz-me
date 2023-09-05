import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchNewQuestions,
  setActiveQuestion,
  clearSelectedAnswer,
} from "../redux/slices/quizSlice";
import { ActiveQuestion } from "../components/ActiveQuestion";
import { Button } from "@mui/material";

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
  const isFirstQuestion = activeQuestionKey === 0;
  const isAnswerSelected = useSelector((state) => state.quiz.selectedAnswer);
  const isAnswerCorrect = useSelector((state) => state.quiz.isAnswerCorrect);

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
          <Button
            variant="contained"
            className="quiz-btn"
            onClick={handleStartClick}
          >
            Start a new quiz
          </Button>
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
          {questions.length > 0 && (
            <div className="controls-progress">
              <span>
                question {activeQuestionKey + 1}/{questions.length}
              </span>
            </div>
          )}
          <div className="controls-btns">
            <Button
              variant="contained"
              onClick={handleBackClick}
              disabled={isFirstQuestion || !questions.length}
            >
              Back
            </Button>
            <Button
              variant="contained"
              onClick={handleClear}
              disabled={!isAnswerSelected}
            >
              Clear current answer
            </Button>
            <Button
              variant="contained"
              onClick={handleNextClick}
              disabled={!isAnswerCorrect}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
