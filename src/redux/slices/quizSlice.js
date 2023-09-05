import { createSlice } from "@reduxjs/toolkit";
import { fetchQuestions } from "../../opentdb/opentdb";

const quizSlice = createSlice({
  name: "quiz",
  initialState: {
    category: null,
    questions: [],
    activeQuestionKey: null,
    loading: false,
    error: null,
    selectedAnswer: null,
    isAnswerCorrect: null,
    possibleAnswers: [],
    amount: 10,
    isDarkMode: false,
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
      state.activeQuestionKey = 0;
    },
    fetchQuestionsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setActiveQuestion: (state, action) => {
      state.activeQuestionKey = action.payload;
    },
    selectAnswer: (state, action) => {
      state.selectedAnswer = action.payload.answer;
      state.isAnswerCorrect = action.payload.isCorrect;
    },
    clearSelectedAnswer: (state) => {
      state.selectedAnswer = null;
      state.isAnswerCorrect = null;
    },
    setDarkMode: (state, action) => {
      state.isDarkMode = action.payload;
    },
    setPossibleAnswers: (state, action) => {
      state.possibleAnswers = action.payload;
    },
  },
});

export const {
  setCategory,
  fetchQuestionsPending,
  fetchQuestionsSuccess,
  fetchQuestionsFailure,
  setActiveQuestion,
  selectAnswer,
  clearSelectedAnswer,
  setDarkMode,
  setPossibleAnswers,
} = quizSlice.actions;

export const fetchNewQuestions = (category, amount) => async (dispatch) => {
  if (!category) {
    dispatch(fetchQuestionsFailure("Please select a category first!"));
    return;
  }
  dispatch(fetchQuestionsPending());
  try {
    const questions = await fetchQuestions(category, (amount = 10));
    dispatch(fetchQuestionsSuccess(questions));
  } catch (error) {
    dispatch(fetchQuestionsFailure(error));
  }
};

export default quizSlice.reducer;
