import React from "react";
import ReactDOM from "react-dom";
import Cropper from "./components/Cropper";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <h1>Let's crop something</h1>
      <h2>Here we go!</h2>
      <Cropper />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
