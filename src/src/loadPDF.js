import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
import pdfFile from './outline.pdf';

/**
 * This function loads and renders the PDF from local storage.
 * @returns The function returns the rendering of the PDF.
 */
function LoadPDF() {
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
        <Document
          file={pdfFile}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} />
        </Document>
        <div>
          <p>
            Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
          </p>
          <button
            type="button"
            disabled={pageNumber <= 1}
            onClick={previousPage}
          >
            Previous
          </button>
          <button
            type="button"
            disabled={pageNumber >= numPages}
            onClick={nextPage}
          >
            Next
          </button>
        </div>
      </>
    );
}

export default LoadPDF;