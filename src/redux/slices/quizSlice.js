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
    correctCount: 0,
    alreadyCounted: [],
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
      state.questions = action.payload;
      state.activeQuestionKey = 0;
      state.correctCount = 0;
      state.alreadyCounted = [];
      state.loading = false;
    },
    fetchQuestionsFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setActiveQuestion: (state, action) => {
      state.activeQuestionKey = action.payload;
    },
    selectAnswer: (state, action) => {
      state.selectedAnswer = action.payload.answer;
      state.isAnswerCorrect = action.payload.isCorrect;
      if (state.isAnswerCorrect && !(state.activeQuestionKey in state.alreadyCounted)) {
        state.correctCount++;
        state.alreadyCounted.push(state.activeQuestionKey);
      }
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
    clearQuiz: (state) => {
      state.questions = [];
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
  clearQuiz,
} = quizSlice.actions;

export const fetchNewQuestions =
  (category, amount = 10) =>
  async (dispatch) => {
    dispatch(fetchQuestionsPending());
    try {
      console.log(category);
      if (!category) {
        throw new Error("No category selected");
      }
      const questions = await fetchQuestions(category, amount);
      dispatch(fetchQuestionsSuccess(questions));
    } catch (error) {
      dispatch(fetchQuestionsFailure(error.message));
    }
  };

export default quizSlice.reducer;
