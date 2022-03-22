import faker from "faker";
import { randomColor } from "./utils";

/**
 * 
 * @param {*} count 
 * @returns 
 */
export default function loadData(count) {
  let data = [];
  let options = [];
  for (let i = 0; i < count; i++) {
    let row = {
      ID: faker.mersenne.rand(),
      CourseName: "Enter Course Name",
      Description: "Enter Description",
      DueDate: "April 02, 2022",
    };
    options.push({ label: row.music, backgroundColor: randomColor() });

    data.push(row);
  }

  /**
   * 
   */
  let columns = [
    {
      id: "CourseName",
      label: "Course Name",
      accessor: "CourseName",
      minWidth: 100,
      dataType: "text",
      options: []
    },
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
      label: "DueDate",
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
