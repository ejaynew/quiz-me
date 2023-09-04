import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setDarkMode } from "../redux/slices/quizSlice";

const Header = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.quiz.isDarkMode);
  const handleDarkmodeClick = () => {
    dispatch(setDarkMode(!isDarkMode));
  };
  return (
    <div className="header-container">
      <div class="title-container">
        <h1 className="header">Quiz me!</h1>
        <p className="subheader">the app that quizzes</p>
      </div>
      <div class="dark-mode-btn-container">
        <label for="dark-mode">dark mode: </label>
        <input
          type="checkbox"
          className="dark-mode-btn"
          onClick={handleDarkmodeClick}
          label="dark mode"
          name="dark mode"
          id="darkmode"
          for="Dark mode"
        />
      </div>
    </div>
  );
};

export default Header;
