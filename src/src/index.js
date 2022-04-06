import ReactDOM from "react-dom";
import React, { Component }  from 'react';

import EditablePage from "./editablePage";
import AddTableButtonScraper from "./addTableButtonScraper";
import AddTableButton from "./addTableButton";
import AddPDFButton from "./addPDFButton";
import Image from "./editableImage";
import "./style.css";
import 'bootstrap/dist/css/bootstrap.min.css';

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
    <h1 className="Logo"> This is the Table Section.</h1>
    <AddTableButtonScraper />
    <br></br>
    <AddTableButton />
    <h1 className="Logo"> This is the Image Section.</h1>
    <Image />
    <h1 className="Logo"> This is the PDF Section.</h1>
    <AddPDFButton />
    <br></br>
  </React.StrictMode>,
  rootElement
);
