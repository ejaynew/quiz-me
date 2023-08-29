import React from "react";
import { Layout, Menu } from "antd";

const Navbar = (props) => {
  const { categories } = props;
  return (
    <div>
      <Layout.Sider
        className="sidebar"
        breakpoint={"lg"}
        theme="light"
        collapsedWidth={0}
        trigger={null}
      >
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          style={{ height: "100%", borderRight: 0 }}
          items={categories}
        />
      </Layout.Sider>
    </div>
  );
};

export default Navbar;
