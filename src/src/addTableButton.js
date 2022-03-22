import React from "react";
import EditableTable from "./editableTable";

const { useState, useCallback } = React;

const Item = ({ id, removeDiv }) => {
  const clickHandler = useCallback(() => {
    removeDiv(id);
  }, [id, removeDiv]);

  return (
    <div>
      <EditableTable/>
      <button onClick={clickHandler}>Remove</button>
    </div>
  );
};

const AddTableButton = () => {
  const [items, setItems] = useState([]);

  const addDiv = useCallback(() => {
    // using timestamp as a unique ID
    setItems([...items, new Date().getTime()]);
  }, [items]);

  const removeDiv = useCallback((itemId) => {
    // filter out the div which matches the ID
    setItems(items.filter((id) => id !== itemId));
  }, [items]);

  return (
    <div className="addDiv">
      {items.map((id) => (
        <Item key={id} id={id} removeDiv={removeDiv} />
      ))}

      <button className="addTable" onClick={addDiv}>Add Table</button>
    </div>
  );
};

export default AddTableButton;