import ReactDOM from "react-dom";
import React, { Component }  from 'react';

import EditablePage from "./editablePage";
import AddTableButtonScraper from "./addTableButtonScraper";
import AddTableButton from "./addTableButton";
import AddPDFButton from "./addPDFButton";
import Image from "./editableImage";

/**
 * @constant
 * @type {React Component} rootElement - Obtains root element by id "root"
 */
const rootElement = document.getElementById("root");

const footerStyle = {
  backgroundColor: "white",
  fontSize: "20px",
  color: "black",
  borderTop: "1px solid #E7E7E7",
  textAlign: "center",
  padding: "20px",
  position: "fixed",
  left: "0",
  bottom: "0",
  height: "80px",
  width: "100%"
};

const phantomStyle = {
  display: "block",
  padding: "20px",
  height: "100px",
  width: "100%"
};

function Footer({ children }) {
  return (
    <div>
      <div style={phantomStyle} />
      <div style={footerStyle}>{children}</div>
    </div>
  );
}

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
    <Footer>
      <span><a href="https://gitlab.cas.mcmaster.ca/se3xa3_l03_g17/se3xa3_l03_g17">Gitlab Repo Group 17</a></span>
    </Footer>
  </React.StrictMode>,
  rootElement
);
