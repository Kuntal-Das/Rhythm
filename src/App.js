import React from "react";
import "./styles/App.scss";

import Header from "./components/Header";
import Content from "./components/Content";
import Footer from "./components/Footer";

import { ContextProvider } from "./Context";

function App() {
  return (
    <ContextProvider>
      <div className="app">
        <Header />
        <Content />
        <Footer />
      </div>
    </ContextProvider>
  );
}

export default App;
