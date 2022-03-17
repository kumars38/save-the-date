import React from "react";

import "./styles.css";
import EditableBlock from "./editableBlock";

import uid from "./utils/uid";
import { setCaretToEnd } from "./utils/caretHelpers";

/**
 * @constant
 * @type {Array<String>} initialBlock - Initial block id, html and tag
 */
const initialBlock = { id: uid(), html: "", tag: "p" };

/** Class representing the editable page*/
class EditablePage extends React.Component {
  /**
   * Constructor for the Editable Page.
   * @param {HTML attribute} props HTML attribute being passed for constructing EditablePage
   */
  constructor(props) {
    super(props);
    this.updatePageHandler = this.updatePageHandler.bind(this);
    this.addBlockHandler = this.addBlockHandler.bind(this);
    this.deleteBlockHandler = this.deleteBlockHandler.bind(this);
    this.state = { blocks: [initialBlock] };
  }

  /**
   * This function updates an editable block if the user makes any changes to the block.
   * @param {EditableBlock} updatedBlock 
   */
  updatePageHandler(updatedBlock) {
    const blocks = this.state.blocks;
    const index = blocks.map((b) => b.id).indexOf(updatedBlock.id);
    const updatedBlocks = [...blocks];
    updatedBlocks[index] = {
      ...updatedBlocks[index],
      tag: updatedBlock.tag,
      html: updatedBlock.html
    };
    this.setState({ blocks: updatedBlocks });
  }

  /**
   * This function adds addition blocks if the user enters a new block
   * @param {EditableBlock} currentBlock 
   */
  addBlockHandler(currentBlock) {
    const newBlock = { id: uid(), html: "", tag: "p" };
    const blocks = this.state.blocks;
    const index = blocks.map((b) => b.id).indexOf(currentBlock.id);
    const updatedBlocks = [...blocks];
    updatedBlocks.splice(index + 1, 0, newBlock);
    this.setState({ blocks: updatedBlocks }, () => {
      currentBlock.ref.nextElementSibling.focus();
    });
  }

  /**
   * This fucntion deletes the block the user choose to delete.
   * @param {EditableBlock} currentBlock 
   */
  deleteBlockHandler(currentBlock) {
    // Only delete the block, if there is a preceding one
    const previousBlock = currentBlock.ref.previousElementSibling;
    if (previousBlock) {
      const blocks = this.state.blocks;
      const index = blocks.map((b) => b.id).indexOf(currentBlock.id);
      const updatedBlocks = [...blocks];
      updatedBlocks.splice(index, 1);
      this.setState({ blocks: updatedBlocks }, () => {
        setCaretToEnd(previousBlock);
        previousBlock.focus();
      });
    }
  }

  /**
   * This function renders the output of the editable page
   * @returns The rendering of the editable page
   */
  render() {
    return (
      <div className="Page">
        {this.state.blocks.map((block, key) => {
          return (
            <EditableBlock
              key={key}
              id={block.id}
              tag={block.tag}
              html={block.html}
              updatePage={this.updatePageHandler}
              addBlock={this.addBlockHandler}
              deleteBlock={this.deleteBlockHandler}
            />
          );
        })}
      </div>
    );
  }
}

export default EditablePage;
