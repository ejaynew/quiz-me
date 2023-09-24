import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { decodeHtmlEntities } from "../util/htmlEntities";
import { shuffle } from "../util/shuffle";
import { selectAnswer, setPossibleAnswers } from "../redux/slices/quizSlice";
import { Button } from "@mui/material";

export const ActiveQuestion = () => {
  const dispatch = useDispatch();
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
    <div className="question">
      <div className="question-info">
        <h5 className="question-info-category">
          Category: {activeQuestion.category}
        </h5>
        <h5>Difficulty level: {activeQuestion.difficulty}</h5>
      </div>
      <div className="question-question">
        <p>{decodeHtmlEntities(activeQuestion.question)}</p>
      </div>
      <div className="question-answers">
        {possibleAnswers.map((option, index) => (
          <div>
            <Button
              variant="contained"
              key={index}
              onClick={handleAnswerClick}
              value={option}
            >{`${index + 1}. ${decodeHtmlEntities(option)}`}</Button>
          </div>
        ))}
        {isAnswerCorrect && (
          <p class="correct-message">
            👏 That's right! The correct answer is{" "}
            <span class="correct-answer">
              {decodeHtmlEntities(selectedAnswer)}
            </span>
            . 👏
          </p>
        )}
        {isAnswerCorrect === false && (
          <p class="incorrect-message">
            ❌ You selected{" "}
            <span class="incorrect-answer">
              {decodeHtmlEntities(selectedAnswer)}
            </span>
            , which is incorrect. Please try again. ❌
          </p>
        )}
      </div>
    </div>
  );
};
