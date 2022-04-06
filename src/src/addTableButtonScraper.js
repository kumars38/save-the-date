import React, { useEffect } from "react";
import EditableTableScraper from "./editableTableScraper";

const { useState, useCallback } = React;

const Item = ({ id, removeDiv, data }) => {
  const clickHandler = useCallback(() => {
    removeDiv(id);
  }, [id, removeDiv]);

  return (
    <div>
      <EditableTableScraper data={data}/>
      <button onClick={clickHandler}>Remove</button>
    </div>
  );
};

const AddTableButton = () => {
  const [items, setItems] = useState([]);
  const [arr, setArr] = useState([]);

  useEffect(() => {
    fetchData();
  },[]);

  const fetchData = () => {
    fetch('/file')
      .then((response) => response.json())
      .then((res) => {
        //console.log(res);
        setArr(res);
      })
      .catch(() => {
        console.log("error fetching");;
      });
  };

  function addTableClicked(e) {
    addDiv();
  }

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
        <Item key={id} id={id} removeDiv={removeDiv} data={arr}/>
      ))}
      <div className="col-md-12 text-center">
        <button type="button" className="btn btn-outline-secondary addTable" onClick={addTableClicked}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-plus" viewBox="2 0 16 18">
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
        </svg>
        PDF Table</button>
      </div>
    </div>
  );
};

export default AddTableButton;