import { createSlice } from "@reduxjs/toolkit";
import { fetchQuestions } from "../../opentdb/opentdb";

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
  },
});

export const { setCategory, fetchQuestionsPending, fetchQuestionsSuccess, fetchQuestionsFailure } = quizSlice.actions;

export const fetchNewQuestions = (category, amount) => async (dispatch) => {
  dispatch(fetchQuestionsPending());
  try {
    const questions = await fetchQuestions(category, amount=10);
    dispatch(fetchQuestionsSuccess(questions));
  } catch (error) {
    dispatch(fetchQuestionsFailure(error));
  }
};

export default quizSlice.reducer;
