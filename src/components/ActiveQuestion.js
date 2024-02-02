import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { decodeHtmlEntities } from "../util/htmlEntities";
import { shuffle } from "../util/shuffle";
import {
  selectAnswer,
  setPossibleAnswers,
  setActiveQuestion,
} from "../redux/slices/quizSlice";
import { Button, Typography, Paper } from "@mui/material";

export const ActiveQuestion = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.quiz.isDarkMode);
  const selectedAnswer = useSelector((state) => state.quiz.selectedAnswer);
  const isAnswerCorrect = useSelector((state) => state.quiz.isAnswerCorrect);
  const activeQuestionKey = useSelector(
    (state) => state.quiz.activeQuestionKey
  );
  const questions = useSelector((state) => state.quiz.questions);
  const activeQuestion = questions[activeQuestionKey];
  const { incorrect_answers, correct_answer } = activeQuestion;
  const possibleAnswers = useSelector((state) => state.quiz.possibleAnswers);

  useEffect(() => {
    dispatch(
      setPossibleAnswers(shuffle([...incorrect_answers, correct_answer]))
    );
  }, [activeQuestionKey]);

  const handleAnswerClick = (e) => {
    const isCorrect = e.target.value === correct_answer;
    dispatch(selectAnswer({ answer: e.target.value, isCorrect }));
  };

  return (
    <Paper elevation={3} className={`question ${isDarkMode ? "dark-mode" : ""}`}>
      <div className="question-info">
        <Typography variant="h6" className="question-info-category">
          Category: {decodeHtmlEntities(activeQuestion.category)}
        </Typography>
        <Typography variant="subtitle1">
          Difficulty level: {activeQuestion.difficulty}
        </Typography>
      </div>
      <div className="question-question">
        <Typography variant="h5" align="center">
          {decodeHtmlEntities(activeQuestion.question)}
        </Typography>
      </div>
      <div className="question-answers">
        {possibleAnswers.map((option, index) => (
          <div key={index}>
            <Button
              variant="contained"
              onClick={handleAnswerClick}
              value={option}
              sx={{ margin: "5px" }}
            >
              {`${decodeHtmlEntities(option)}`}
            </Button>
          </div>
        ))}
        {isAnswerCorrect && (
          <Typography variant="body1" className="correct-message">
            👏 That's right! The correct answer is{" "}
            <span className="correct-answer">
              {decodeHtmlEntities(selectedAnswer)}
            </span>
            . 👏
          </Typography>
        )}
        {isAnswerCorrect === false && (
          <Typography variant="body1" className="incorrect-message">
            ❌ You selected{" "}
            <span className="incorrect-answer">
              {decodeHtmlEntities(selectedAnswer)}
            </span>
            , which is incorrect. Please try again. ❌
          </Typography>
        )}
      </div>
    </Paper>
  );
};
