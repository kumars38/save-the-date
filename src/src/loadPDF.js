import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
import pdfFile from './outline.pdf';
import TableHeader from "./utils/TableHeader";

/**
 * This function loads and renders the PDF from local storage.
 * @returns The function returns the rendering of the PDF.
 */
function LoadPDF(props) {
    pdfFile = props.src;
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
  
    /**
     * This function sets the number of pages and the initial page number to 1
     * @param {ReactDOM} numPages This parameter contains the number of pages in the document. 
     */
    function onDocumentLoadSuccess({ numPages }) {
      setNumPages(numPages);
      setPageNumber(1);
    }
  
    /**
     * This function calcuates the current page.
     * @param {number} offset This parameter contains the changes in page number.
     */
    function changePage(offset) {
      setPageNumber(prevPageNumber => prevPageNumber + offset);
    }
  
    /**
     * This function calculates the previous page by decrementing the current page.
     */
    function previousPage() {
      changePage(-1);
    }
  
    /**
     * This function calculates the next page by incrementing the current page.
     */
    function nextPage() {
      changePage(1);
    }
  
    return (
      <>
        <TableHeader/>
        <Document
          file={pdfFile}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} />
        </Document>
        <div class="col-md-12 text-center">
          <p>
            Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
          </p>
          <button
            class="btn btn-outline-dark"
            type="button"
            disabled={pageNumber <= 1}
            onClick={previousPage}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left-short" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"/>
            </svg>
          </button>
          <span> </span>
          <button
            class="btn btn-outline-dark"
            type="button"
            disabled={pageNumber >= numPages}
            onClick={nextPage}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right-short" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
            </svg>
          </button>
        </div>
      </>
    );
}

export default LoadPDF;