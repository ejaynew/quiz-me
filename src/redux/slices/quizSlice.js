import { createSlice } from "@reduxjs/toolkit";

const quizSlice = createSlice({
  name: "quiz",
  initialState: {
    category: null,
    questions: [],
    activeQuestion: null,
  },
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
    setActiveQuestion: (state, action) => {
      state.activeQuestion = action.payload;
    },
  },
});

export const { setCategory, setQuestions, setActiveQuestion } = quizSlice.actions;

export default quizSlice.reducer;
