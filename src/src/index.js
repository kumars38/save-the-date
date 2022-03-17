import React from "react";
import ReactDOM from "react-dom";

import EditablePage from "./editablePage";

/**
 * @constant
 * @type {React Component} rootElement - Obtains root element by id "root"
 */
const rootElement = document.getElementById("root");

/**
 * This is the main renderer of the application. This renders the instructions and the Editable Page.
 */
ReactDOM.render(
  <React.StrictMode>
    <h1 className="Logo">notion.clone</h1>
    <p className="Intro">
      Helloo{" "}
      <span role="img" aria-label="greetings" className="Emoji">
        👋
      </span>{" "}
      You can add content below. Type <span className="Code">/</span> to see
      available elements.
    </p>
    <EditablePage />
  </React.StrictMode>,
  rootElement
);
