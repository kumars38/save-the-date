import React from "react";
import ContentEditable from "react-contenteditable";

import "./styles.css";
import SelectMenu from "./selectMenu";

import { getCaretCoordinates, setCaretToEnd } from "./utils/caretHelpers";

/**
 * @constant
 * @type {CharacterData} CMD_KEY Command key to initial Select Menu
 */
const CMD_KEY = "/";

/**
 * Class representing the EditableBlock.
 */
class EditableBlock extends React.Component {
  /**
   * Constructor for the EditableBlock Class
   * @param {HTML attribute} props HTML attribute being passed for constructing EditableBlock
   */
  constructor(props) {
    super(props);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onKeyDownHandler = this.onKeyDownHandler.bind(this);
    this.onKeyUpHandler = this.onKeyUpHandler.bind(this);
    this.openSelectMenuHandler = this.openSelectMenuHandler.bind(this);
    this.closeSelectMenuHandler = this.closeSelectMenuHandler.bind(this);
    this.tagSelectionHandler = this.tagSelectionHandler.bind(this);
    this.contentEditable = React.createRef();
    this.state = {
      htmlBackup: null, // needed to store the html temporarely
      html: "",
      tag: "p",
      previousKey: "",
      selectMenuIsOpen: false,
      selectMenuPosition: {
        x: null,
        y: null
      }
    };
  }

  /**
   * This function sets the current state to the object state
   */
  componentDidMount() {
    this.setState({ html: this.props.html, tag: this.props.tag });
  }

  /**
   * This function updates the page components if the user has either changed the html content or the tag
   * @param {*} prevProps The previous properties of the editable block state
   * @param {*} prevState The previous state of the editable block state
   */
  componentDidUpdate(prevProps, prevState) {
    const htmlChanged = prevState.html !== this.state.html;
    const tagChanged = prevState.tag !== this.state.tag;
    if (htmlChanged || tagChanged) {
      this.props.updatePage({
        id: this.props.id,
        html: this.state.html,
        tag: this.state.tag
      });
    }
  }

  /**
   * This function handles any changes to the HTML content of an EditableBlock
   * @param {*} e 
   */
  onChangeHandler(e) {
    this.setState({ html: e.target.value });
  }

  /**
   * This function handles any changes to the block from the user using key strokes
   * @param {*} e This is the key stroke variable
   */
  onKeyDownHandler(e) {
    if (e.key === CMD_KEY) {
      // If the user starts to enter a command, we store a backup copy of
      // the html. We need this to restore a clean version of the content
      // after the content type selection was finished.
      this.setState({ htmlBackup: this.state.html });
    }
    if (e.key === "Enter") {
      // While pressing "Enter" should add a new block to the page, we
      // still want to allow line breaks by pressing "Shift-Enter"
      if (this.state.previousKey !== "Shift" && !this.state.selectMenuIsOpen) {
        e.preventDefault();
        this.props.addBlock({
          id: this.props.id,
          ref: this.contentEditable.current
        });
      }
    }
    if (e.key === "Backspace" && !this.state.html) {
      // If there is no content, we delete the block by pressing "Backspace",
      // just as we would remove a line in a regular text container
      e.preventDefault();
      this.props.deleteBlock({
        id: this.props.id,
        ref: this.contentEditable.current
      });
    }
    // Store the key to detect combinations like "Shift-Enter" later on
    this.setState({ previousKey: e.key });
  }

  /**
   * This function handles the SelectMenu on KeyUp input from the user
   * @param {*} e This is the key stroke variable
   */
  onKeyUpHandler(e) {
    if (e.key === CMD_KEY) {
      // The openSelectMenuHandler function needs to be invoked on key up. Otherwise
      // the calculation of the caret coordinates does not work properly.
      this.openSelectMenuHandler();
    }
  }

  
  /**
   * This function operates after opening the SelectMenu, it then attaches a click listener to the dom that 
   * closes the menu after the next click - regardless of outside or inside menu.
   */
  openSelectMenuHandler() {
    const { x, y } = getCaretCoordinates();
    this.setState({
      selectMenuIsOpen: true,
      selectMenuPosition: { x, y }
    });
    document.addEventListener("click", this.closeSelectMenuHandler);
  }

  /**
   * This function closes the SelectMenu and changes state of the SelectMenu. 
   */
  closeSelectMenuHandler() {
    this.setState({
      htmlBackup: null,
      selectMenuIsOpen: false,
      selectMenuPosition: { x: null, y: null }
    });
    document.removeEventListener("click", this.closeSelectMenuHandler);
  }

  /**
   * This function assigns the tag to the EditableBlock.
   * @param {String} tag This is the tag for the HTML component for EditableBlock
   */
  tagSelectionHandler(tag) {
    // Restore the clean html (without the command), focus the editable
    // with the caret being set to the end, close the select menu
    this.setState({ tag: tag, html: this.state.htmlBackup }, () => {
      setCaretToEnd(this.contentEditable.current);
      this.closeSelectMenuHandler();
    });
  }

  /**
   * This function renders the output of the EditableBlock and SelectMenu
   * @returns The rendering of the EditableBlock and SelectMenu
   */
  render() {
    return (
      <>
        {this.state.selectMenuIsOpen && (
          <SelectMenu
            position={this.state.selectMenuPosition}
            onSelect={this.tagSelectionHandler}
            close={this.closeSelectMenuHandler}
          />
        )}
        <ContentEditable
          className="Block"
          innerRef={this.contentEditable}
          html={this.state.html}
          tagName={this.state.tag}
          onChange={this.onChangeHandler}
          onKeyDown={this.onKeyDownHandler}
          onKeyUp={this.onKeyUpHandler}
        />
      </>
    );
  }
}

export default EditableBlock;
