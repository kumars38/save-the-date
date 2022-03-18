import React from "react";
import { matchSorter } from "match-sorter";

/**
 * @constant
 * @type {number} MENU_HEIGHT - The height of the menu
 */
const MENU_HEIGHT = 150;

/**
 * @constant
 * @type {Array<String>} allowedTags - Array of String for allowed html tags
 */
const allowedTags = [
  {
    id: "page-title",
    tag: "h1",
    label: "Page Title"
  },
  {
    id: "heading",
    tag: "h2",
    label: "Heading"
  },
  {
    id: "subheading",
    tag: "h3",
    label: "Subheading"
  },
  {
    id: "paragraph",
    tag: "p",
    label: "Paragraph"
  }
];

/**
 * This function is the class for SelectMenu. 
 */
class SelectMenu extends React.Component {
  /**
   * Constructor for the Select Menu Class
   * @param {HTML attribute} props HTML attribute being passed for constructing SelectMenu
   */
  constructor(props) {
    super(props);
    this.keyDownHandler = this.keyDownHandler.bind(this);
    this.state = {
      command: "",
      items: allowedTags,
      selectedItem: 0
    };
  }

  /**
   * This function attaches a key listener to add any given key to the command
   */
  componentDidMount() {
    document.addEventListener("keydown", this.keyDownHandler);
  }

  /**
   * This fucntion checks whenever the command changes and looks for matching tags in the allowed list
   * @param {*} prevProps The previous properties of the editable block
   * @param {*} prevState The previous state of the editable block
   */
  componentDidUpdate(prevProps, prevState) {
    const command = this.state.command;
    if (prevState.command !== command) {
      const items = matchSorter(allowedTags, command, { keys: ["tag"] });
      this.setState({ items: items });
    }
  }

  /**
   * This fucntion unmounts the key listener
   */
  componentWillUnmount() {
    document.removeEventListener("keydown", this.keyDownHandler);
  }

  /**
   * This function hands the user input through key strokes
   * @param {*} e This is the key stroke variable
   */
  keyDownHandler(e) {
    const items = this.state.items;
    const selected = this.state.selectedItem;
    const command = this.state.command;

    switch (e.key) {
      case "Enter":
        e.preventDefault();
        this.props.onSelect(items[selected].tag);
        break;
      case "Backspace":
        if (!command) this.props.close();
        this.setState({ command: command.substring(0, command.length - 1) });
        break;
      case "ArrowUp":
        e.preventDefault();
        const prevSelected = selected === 0 ? items.length - 1 : selected - 1;
        this.setState({ selectedItem: prevSelected });
        break;
      case "ArrowDown":
      case "Tab":
        e.preventDefault();
        const nextSelected = selected === items.length - 1 ? 0 : selected + 1;
        this.setState({ selectedItem: nextSelected });
        break;
      default:
        this.setState({ command: this.state.command + e.key });
        break;
    }
  }

  /**
   * This function renders the output of the select menu option
   * @returns The rendering of the editable block
   */
  render() {
    // Define the absolute position before rendering
    const x = this.props.position.x;
    const y = this.props.position.y - MENU_HEIGHT;
    const positionAttributes = { top: y, left: x };

    return (
      <div className="SelectMenu" style={positionAttributes}>
        <div className="Items">
          {this.state.items.map((item, key) => {
            const selectedItem = this.state.selectedItem;
            const isSelected = this.state.items.indexOf(item) === selectedItem;
            return (
              <div
                className={isSelected ? "Selected" : null}
                key={key}
                role="button"
                tabIndex="0"
                onClick={() => this.props.onSelect(item.tag)}
              >
                {item.label}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default SelectMenu;
