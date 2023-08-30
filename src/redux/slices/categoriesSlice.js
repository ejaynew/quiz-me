import { createSlice } from "@reduxjs/toolkit";
import { fetchCategories } from "../../opentdb/opentdb";

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    selectedCategory: null,
    loading: false,
    error: null,
  },
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    selectCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    fetchCategoriesPending: (state) => {
      state.loading = true;
    },
    fetchCategoriesSuccess: (state, action) => {
      state.loading = false;
      state.categories = action.payload;
    },
    fetchCategoriesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  setCategories,
  selectCategory,
  fetchCategoriesPending,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
} = categoriesSlice.actions;

export const fetchAvailableCategories = () => async (dispatch) => {
  dispatch(fetchCategoriesPending());
  try {
    const categories = await fetchCategories();
    dispatch(fetchCategoriesSuccess(categories));
  } catch (error) {
    dispatch(fetchCategoriesFailure(error));
  }
};

export const selectCategories = (state) => state.categories;
export const getSelectedCategory = (state) => state.selectedCategory;

export default categoriesSlice.reducer;
