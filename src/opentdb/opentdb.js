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
