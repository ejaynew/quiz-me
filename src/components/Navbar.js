import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCategory } from "../redux/slices/categoriesSlice";
import Nav from 'react-bootstrap/Nav';

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
    getItem(category.key, category.name)
  );

  const handleCategoryClick = (e) => {
    console.log(e.target.value);
    dispatch(selectCategory(e.target.value)); // Dispatch action to update selected category
  };

  return (
    <div className="sidebar">
      <h3 className="sidebar-title">Quiz Topics</h3>
      <Nav
        className="sidebar-menu"
        mode="inline"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        style={{ height: "100%", borderRight: 0 }}
      >
        {categoryItems.map((category) => (
          <Nav.Item>
            <Nav.Link
              href={handleCategoryClick}
              className={category.key === selectedCategory ? "selected" : ""}
              key={category.key}
              value={category.label}
            >
              {category.label}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
    </div>
  );
};

export default Navbar;
