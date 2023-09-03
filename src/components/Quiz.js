import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchNewQuestions } from "../redux/slices/quizSlice";
import { decodeHtmlEntities } from "../util/htmlEntities";

const Quiz = () => {
  const selectedCategory = useSelector(
    (state) => state.categories.selectedCategory
  );
  const error = useSelector((state) => state.quiz.error);
  const questions = useSelector((state) => state.quiz.questions);
  const isLoading = useSelector((state) => state.quiz.loading);

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
            Start a new quiz
          </button>
        </div>
        <div className="loading-container">
          {isLoading ? <p>Loading...</p> : <span></span>}
        </div>
        <div className="questions-container">
          {questions.length ? (
            questions.map((question) => (
              <div className="question" key={question.id}>
                <p>{decodeHtmlEntities(question.question)}</p>
              </div>
            ))
          ) : (
            <div className="quiz-error">
              {console.log(error)}
              <p>{error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
