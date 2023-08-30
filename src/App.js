import "./App.css";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Quiz from "./components/Quiz";
import { fetchAvailableCategories } from "./redux/slices/categoriesSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAvailableCategories()); // Dispatch action to fetch categories
  }, [dispatch]);

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
