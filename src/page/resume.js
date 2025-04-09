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

  return (
    <div className="pdf-wrapper">
      <div className="pdf-container" ref={containerRef}>
        <Document file="/Amrit Resume.pdf" loading="Loading resume...">
          <Page pageNumber={1} width={containerWidth * 1} />
        </Document>
      </div>
    </div>
  );
}

export default Resume;
