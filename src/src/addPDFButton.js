import React, { useState } from "react";
import LoadPDF from "./loadPDF";

const AddPDFButton = () => {
  const [file, setFile] = useState([]);

  function uploadSingleFile(e) {
    let PDFsArray = Object.entries(e.target.files).map((e) =>
      URL.createObjectURL(e[1])
    );
    console.log(PDFsArray);
    setFile([...file, ...PDFsArray]);
    console.log("file", file);
  }

  function upload(e) {
    e.preventDefault();
    console.log(file);
  }

  function deleteFile(e) {
    const s = file.filter((item, index) => index !== e);
    setFile(s);
    console.log(s);
  }

  return (
    <form>
      <div className="form-group preview">
        {file.length > 0 &&
          file.map((item, index) => {
            return (
              <div key={item}>
                <LoadPDF src={item} />
                <button type="button" onClick={() => deleteFile(index)}>
                  Delete
                </button>
              </div>
            );
          })}
      </div>

      <div className="form-group">
        <input
          type="file"
          disabled={file.length === 5}
          className="form-control"
          onChange={uploadSingleFile}
          multiple
        />
      </div>
      <button
        type="button"
        className="btn btn-primary btn-block"
        onClick={upload}
      >
        Upload
      </button>
    </form>
  );
};

export default AddPDFButton;
