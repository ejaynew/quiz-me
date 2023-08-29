import React from "react";
import { Breadcrumb } from "antd";

const Quiz = () => {
  return (
    <div className="quiz-container">
      <div className="breadcrumbs">
        <Breadcrumb>
          <Breadcrumb.Item>About</Breadcrumb.Item>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Quiz</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="quiz-body">

      </div>
      <p>This is the quiz!</p>
    </div>
  );
};

export default Quiz;
