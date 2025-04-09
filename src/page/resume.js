import React, { useState, useEffect, useRef } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

import '../styles/Resume.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

function Resume() {
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

  // ResizeObserver to update containerWidth
  useEffect(() => {
    const observer = new ResizeObserver(entries => {
      for (let entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/Amrit Resume.pdf';
    link.download = 'Amrit_Resume.pdf';
    link.click();
  };

  return (
    <div className="pdf-wrapper">
      <button className="download-button" onClick={handleDownload}>
        <img
        src="/download-icon.svg"
        alt="Download PDF"
        height={20}
        width={20}
        className="icon"
        /> 
      </button>
      <div className="pdf-container" ref={containerRef}>
        <Document file="/Amrit_Resume.pdf" loading="Loading resume...">
          <Page pageNumber={1} width={containerWidth * 1} />
        </Document>
      </div>
    </div>
  );
}

export default Resume;
