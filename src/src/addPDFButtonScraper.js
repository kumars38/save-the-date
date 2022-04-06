import React, { useState } from "react";
import LoadPDF from "./loadPDF";

const AddPDFButtonScraper = () => {

  async function upload(e) {
    const file = e.target.files[0];
    console.log(file);

    if (file != null) {
      const data = new FormData();
      data.append('file_from_react', file);
  
      let response = await fetch('/file',
        {
          method: 'post',
          body: data,
        }
      );
      let res = await response.json();
      if (res.status !== 1){
        alert('Error uploading file');
      }
    }
  };

  function deleteFile(e) {
    const s = file.filter((item, index) => index !== e);
    setFile(s);
    console.log(s);
  }

  return (
    <form>
      <div className="form-group">
        <input
          type="file"
          className="form-control"
          onChange={upload}
          multiple
        />
      </div>
    </form>
  );
};

export default AddPDFButtonScraper;
