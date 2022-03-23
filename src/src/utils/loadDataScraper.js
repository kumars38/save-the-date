import faker from 'faker';
import React, { useState, useEffect } from "react";
import { randomColor } from "./utils";

/**
 * 
 * @param {*} count 
 * @returns 
 */
export default function loadData(props) {
  console.log(props.data.scrapedData)
  var arr = props.data.scrapedData;
  let data = [];
  let options = [];
  //console.log(Object.keys(arr).length);

  const count = arr.length;
  for (let i = 0; i < count; i++) {
    let row = {
      ID: faker.mersenne.rand(),
      //CourseName: "Enter Course Name",
      Description: arr[i][1],
      DueDate: arr[i][0],
    };
    options.push({ label: row.music, backgroundColor: randomColor() });
    data.push(row);
  }

  /**
   * 
   */
  let columns = [
    /*{
      id: "CourseName",
      label: "Course Name",
      accessor: "CourseName",
      minWidth: 100,
      dataType: "text",
      options: []
    }*/,
    {
      id: "Description",
      label: "Description",
      accessor: "Description",
      minWidth: 100,
      dataType: "text",
      options: []
    },
    {
      id: "DueDate",
      label: "Due Date",
      accessor: "DueDate",
      width: 100,
      dataType: "text",
      options: []
    },
    {
      id: 999999,
      width: 20,
      label: "+",
      disableResizing: true,
      dataType: "null"
    }
  ];
  return { columns: columns, data: data, skipReset: false };
}
