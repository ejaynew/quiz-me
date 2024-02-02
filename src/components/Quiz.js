import React, { useState } from "react"; // Step 1
import { useSelector, useDispatch } from "react-redux";
import {
  fetchNewQuestions,
  setActiveQuestion,
  clearSelectedAnswer,
  clearQuiz,
} from "../redux/slices/quizSlice";
import { ActiveQuestion } from "../components/ActiveQuestion";
import { Button, Alert } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ReplayIcon from "@mui/icons-material/Replay";

const Quiz = () => {
  const selectedCategory = useSelector(
    (state) => state.categories.selectedCategory
  );
  const error = useSelector((state) => state.quiz.error);
  const questions = useSelector((state) => state.quiz.questions);
  const isLoading = useSelector((state) => state.quiz.loading);
  const correctCount = useSelector((state) => state.quiz.correctCount);
  const activeQuestionKey = useSelector(
    (state) => state.quiz.activeQuestionKey
  );
  const isFirstQuestion = activeQuestionKey === 0;
  const isLastQuestion = activeQuestionKey === 9;
  const isAnswerSelected = useSelector((state) => state.quiz.selectedAnswer);


  const dispatch = useDispatch();
  const handleStartClick = () => {
    dispatch(clearQuiz());
    dispatch(clearSelectedAnswer());
    dispatch(fetchNewQuestions(selectedCategory));
    setShowStartMessage(false);
    setShowCompletionMessage(false);
  };

  const handleBackClick = () => {
    dispatch(clearSelectedAnswer());
    dispatch(setActiveQuestion(Math.max(activeQuestionKey - 1, 0)));
  };
  const handleNextClick = () => {
    dispatch(clearSelectedAnswer());
    dispatch(setActiveQuestion(Math.min(activeQuestionKey + 1)));
  };
  const handleClear = () => {
    dispatch(clearSelectedAnswer());
    setShowStartMessage(false);
  };
  const handleStartOverClick = () => {
    dispatch(clearQuiz());
    dispatch(clearSelectedAnswer());
    dispatch(setActiveQuestion(0)); // Set to the first question
    setShowStartMessage(true); // Show the start message
    setShowCompletionMessage(false); // Hide the completion message
  };
  const handleFinishClick = () => {
    setShowCompletionMessage(true);
    dispatch(clearQuiz());
  };

  const [showStartMessage, setShowStartMessage] = useState(true);
  const [showCompletionMessage, setShowCompletionMessage] = useState(false);

  return (
    <div className="quiz-container">
      {showStartMessage && (
        <div className="start-message">
          <p>
            Currently selected quiz topic:{" "}
            <span className="topic-label">
              {selectedCategory && selectedCategory.label}
            </span>
          </p>
          <h3>
            Please select a category and click the button below to start the
            quiz.
          </h3>
          <Button
            variant="contained"
            className="quiz-btn"
            onClick={handleStartClick}
            sx={{ margin: "5px" }}
          >
            Start a new quiz
          </Button>
        </div>
      )}
      {error && (
        <div className="error-message">
          <Alert severity="error">{error}</Alert>
          <h3>
            Please select a category and click the button below to start the
            quiz.
          </h3>
          <Button
            variant="contained"
            className="quiz-btn"
            onClick={handleStartClick}
            sx={{ margin: "5px" }}
          >
            Start a new quiz
          </Button>
        </div>
      )}

      {showCompletionMessage && (
        <div className="completion-message">
          <h3>Congratulations! You have completed the quiz.</h3>
          <h4>You got {correctCount} of 10 questions correct.</h4>
          <p>Click the button below to start a new quiz.</p>
          <Button
            variant="contained"
            className="quiz-btn"
            onClick={handleStartClick}
            sx={{ margin: "5px" }}
          >
            Start a new quiz
          </Button>
        </div>
      )}
      {!showStartMessage && !showCompletionMessage && questions && questions.length && (
        <div>
          <p>
            Question {activeQuestionKey + 1} of {questions.length}
          </p>
        </div>
      )}

      <div className="quiz-body">
        <div className="loading-container">
          {isLoading ? <p>Loading...</p> : <span></span>}
        </div>

        {/* start active question */}
        <div className="questions-container">
          {questions && questions.length ? <ActiveQuestion /> : <div></div>}
        </div>
        {/* end active question */}

        {!showStartMessage && !showCompletionMessage && questions && questions.length && (
          <div>
            <p>
              Your current score is {correctCount} out of{" "}
              {questions.length} possible points
            </p>
          </div>
        )}

        {/* start controls */}
        <div className="controls">
          <div className="controls-btns">
            {/* start back button */}
            <Button
              variant="outlined"
              onClick={handleBackClick}
              disabled={activeQuestionKey === 0}
              sx={{ margin: "5px" }}
            >
              <ArrowBackIcon />
            </Button>
            {/* end back button */}
            {/* start clear button */}
            <Button
              variant="contained"
              onClick={handleClear}
              disabled={!isAnswerSelected || !questions || !questions.length}
              sx={{ margin: "5px" }}
            >
              Clear
            </Button>
            {/* end clear button */}
            {/* start next button */}
            <Button
              variant="outlined"
              onClick={handleNextClick}
              disabled={activeQuestionKey === questions.length - 1}
              sx={{ margin: "5px" }}
            >
              <ArrowForwardIcon />
            </Button>{" "}
            <br></br>
            {/* end next button */}{" "}
            {/* start finish button IFF last question is active AND current quiz is still active */}
            {isLastQuestion && !showCompletionMessage && (
              <Button
                variant="contained"
                onClick={handleFinishClick}
                sx={{ margin: "5px" }}
              >
                Finish quiz
              </Button>
            )}
            {/* end finish button */}
            {/* start replay button */}
            <Button
              variant="contained"
              onClick={handleStartOverClick}
              disabled={showStartMessage || showCompletionMessage}
              sx={{ margin: "5px" }}
            >
              <ReplayIcon />
              Start Over
            </Button>{" "}
            <br></br>
            {/* end replay button */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
