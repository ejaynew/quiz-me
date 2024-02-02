import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setDarkMode } from "../redux/slices/quizSlice";
import { FormControlLabel, Switch } from "@mui/material";

const Header = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.quiz.isDarkMode);
  const handleDarkmodeClick = () => {
    dispatch(setDarkMode(!isDarkMode));
  };
  return (
    <div className="header-container">
      <div className="title-container">
        <h1 className="header">Quiz me!</h1>
        <p className="subheader">the app that quizzes</p>
      </div>
      <div className="dark-mode-btn-container">
      <FormControlLabel control={<Switch/>} label="Dark mode" onClick={handleDarkmodeClick} />
        {/* // <label for="dark-mode">dark mode: </label>
        // <input */}
        {/* //   type="checkbox"
        //   className="dark-mode-btn"
        //   onClick={handleDarkmodeClick}
        //   label="dark mode"
        //   name="dark mode"
        //   id="darkmode"
        //   for="Dark mode"
        // /> */}
      </div>
    </div>
  );
};

export default Header;
