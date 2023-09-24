import React, { useState } from "react"; // Step 1
import { useSelector, useDispatch } from "react-redux";
import {
  fetchNewQuestions,
  setActiveQuestion,
  clearSelectedAnswer,
  clearQuiz,
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
  const isLastQuestion = activeQuestionKey === 9;
  const isAnswerSelected = useSelector((state) => state.quiz.selectedAnswer);
  const isAnswerCorrect = useSelector((state) => state.quiz.isAnswerCorrect);

  const dispatch = useDispatch();
  const handleStartClick = () => {
    dispatch(clearSelectedAnswer());
    dispatch(fetchNewQuestions(selectedCategory));
    setShowStartMessage(false); // Step 4
    setShowCompletionMessage(false);
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
    setShowStartMessage(false); // Step 4
  };
  const handleFinishClick = () => {
    dispatch(clearQuiz());
    setShowCompletionMessage(true);
  };

  const [showStartMessage, setShowStartMessage] = useState(true); // Step 2
  const [showCompletionMessage, setShowCompletionMessage] = useState(false); // Step 2

  return (
    <div className="quiz-container">
      {showStartMessage && ( // Step 3
        <div className="start-message">
          <h3>
            Please select a category and click the button below to start the
            quiz.
          </h3>
          <Button
            variant="contained"
            className="quiz-btn"
            onClick={handleStartClick}
          >
            Start a new quiz
          </Button>
        </div>
      )}
      {showCompletionMessage && ( // Step 3
        <div className="completion-message">
          <h3>Congratulations! You have completed the quiz.</h3>
          <p>Click the button below to start a new quiz.</p>
          <Button
            variant="contained"
            className="quiz-btn"
            onClick={handleStartClick}
          >
            Start a new quiz
          </Button>
        </div>
      )}
      <p>
        Current quiz topic:{" "}
        <span className="topic-label">
          {selectedCategory && selectedCategory.label}
        </span>
      </p>
      <div className="quiz-body">
        <div className="start-quiz">
          {isFirstQuestion && (
            <Button
              variant="contained"
              className="quiz-btn"
              onClick={handleStartClick}
            >
              Start a new quiz
            </Button>
          )}
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
              disabled={!isAnswerSelected || !questions.length}
            >
              Clear current answer
            </Button>
            <Button
              variant="contained"
              onClick={handleNextClick}
              disabled={isLastQuestion || !isAnswerCorrect}
            >
              Next
            </Button>
            {isLastQuestion && isAnswerCorrect && !showCompletionMessage && (
              <Button variant="contained" onClick={handleFinishClick}>
                Finish quiz
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
