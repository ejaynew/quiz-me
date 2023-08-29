import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Quiz from "./components/Quiz";
import { Layout } from "antd";

function App() {
  const categories = ["4", "5", "6"].map((key) => ({
    key,
    label: `nav ${key}`,
  }));

  return (
    <div className="App">
      <Layout>
        <Header />
        <Layout>
          <Navbar categories={categories} />
          <Layout style={{ padding: "0 24px 24px" }}>
            <Quiz />
          </Layout>
        </Layout>
      </Layout>
      <Footer style={{ padding: "10px", alignText: "right" }} />
    </div>
  );
}

export default App;
