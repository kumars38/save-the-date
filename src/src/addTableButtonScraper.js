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
    fetch('/data')
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

      <button className="addTable" onClick={addTableClicked}>Add PDF Table</button>
    </div>
  );
};

export default AddTableButton;