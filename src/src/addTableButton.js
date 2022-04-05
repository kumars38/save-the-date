import React from "react";
import EditableTable from "./editableTable";
import TableHeader from "./utils/TableHeader";

const { useState, useCallback } = React;

const Item = ({ id, removeDiv }) => {
  const clickHandler = useCallback(() => {
    removeDiv(id);
  }, [id, removeDiv]);

  return (
    <div>
      <TableHeader/>
      <EditableTable/>
      <div className="col-md-12 text-right-self">
        <button className="btn btn-danger" onClick={clickHandler}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
          </svg>
        </button>
      </div>
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
      <div  className="col-md-12 text-center">
        <button type="button" className="btn btn-outline-secondary addTable" onClick={addDiv}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-plus" viewBox="2 0 16 18">
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
        </svg>
        Table</button>
      </div>
    </div>
  );
};

export default AddTableButton;