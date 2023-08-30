import { createSlice } from "@reduxjs/toolkit";

const quizSlice = createSlice({
  name: "quiz",
  initialState: {
    category: null,
    questions: [],
    activeQuestion: null,
    loading: false,
    error: null,
  },
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    fetchQuestionsPending: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchQuestionsSuccess: (state, action) => {
      state.loading = false;
      state.questions = action.payload;
    },
    fetchQuestionsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    offsetActiveQuestion: (state, action) => {
      state.activeQuestion = action.payload;
    },
  },
});

export const { setCategory, fetchQuestionsPending, fetchQuestionsSuccess, fetchQuestionsFailure, offsetActiveQuestion } = quizSlice.actions;



export default quizSlice.reducer;
