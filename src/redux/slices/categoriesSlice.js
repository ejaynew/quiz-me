import { createSlice } from "@reduxjs/toolkit";

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    selectedCategory: null,
  },
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    selectCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
});

export const { setCategories, selectCategory } = categoriesSlice.actions;

export default categoriesSlice.reducer;
