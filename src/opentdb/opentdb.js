const base_url = "https://opentdb.com/";

export const fetchCategories = async () => {
  try {
    const response = await fetch(base_url + "api_category.php");
    if (!response.ok) {
      throw new Error("Failed to fetch category data from API");
    }
    const data = await response.json();
    return data.trivia_categories;
  } catch (error) {
    console.error("API error: ", error);
  }
};

export const fetchQuestions = async (category, amount=10) => {
  try {
    if (!category) {
      throw new Error("No category provided");
    }
    const response = await fetch(base_url + "api.php?amount=" + amount + "&category=" + category.key);
    if (!response.ok) {
      throw new Error("Failed to fetch questions from API");
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("API error: ", error);
  }
};
