import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCategory } from "../redux/slices/categoriesSlice";

const Navbar = () => {
  const categories = useSelector((state) => state.categories.categories);
  const selectedCategory = useSelector(
    (state) => state.categories.selectedCategory
  );
  const dispatch = useDispatch();

  function getItem(key, label) {
    return {
      key,
      label,
    };
  }

  const categoryItems = categories.map((category) =>
    getItem(category.id, category.name)
  );

  const handleCategoryClick = (e) => {
    const categoryItem = categoryItems.filter(
      (c) => c.label === e.target.value
    );
    dispatch(selectCategory(categoryItem[0])); // Dispatch action to update selected category
  };

  return (
    <div className="sidebar">
      <h3 className="sidebar-title">Quiz Topics</h3>
      <nav className="sidebar-menu" style={{ height: "100%", borderRight: 0 }}>
        {categoryItems.map(
          (
            category // Each category gets a button in the nav menu
          ) => (
            <div className="nav-item" key={category.key}>
              <button
                onClick={handleCategoryClick}
                className={
                  selectedCategory && category.key === selectedCategory.key
                    ? "nav-btn selected"
                    : "nav-btn"
                }
                value={category.label}
              >
                {category.label}
              </button>
            </div>
          )
        )}
      </nav>
    </div>
  );
};

export default Navbar;
