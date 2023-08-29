import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer  from "./slices/categoriesSlice";
import quizReducer from "./slices/quizSlice";
// Import other slice reducers here

const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    quiz: quizReducer,
    // Add other reducer slices here
  },
});

export default store;
