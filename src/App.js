import "./App.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Quiz from "./components/Quiz";
import { fetchAvailableCategories } from "./redux/slices/categoriesSlice";

function App() {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.quiz.isDarkMode);

  useEffect(() => {
    dispatch(fetchAvailableCategories()); // Dispatch action to fetch categories
  }, [dispatch]);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  return (
    <div className="App">
      <Header />
      <Navbar />
      <Quiz />
      <Footer />
    </div>
  );
}

export default App;
