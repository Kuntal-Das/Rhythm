import React from "react";
import "./styles/App.scss";

import Header from "./components/Header";
import Content from "./components/Content";
import Footer from "./components/Footer";

import { RhythmContextProvider } from "./RhythmContext";

function App() {
  return (
    <RhythmContextProvider>
      <div className="app">
        <Header />
        <Content />
        <Footer />
      </div>
    </RhythmContextProvider>
  );
}

export default App;
