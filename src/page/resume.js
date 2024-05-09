import React from 'react';
import '../styles/Resume.css';

function Resume() {
  return (
    <div className='pdf'>
        <object data="/Amrit Srivastava Resume.pdf#toolbar=0" type="application/pdf" width="100%" height="100%">
            <p>Alternative text - include a link <a href="http://africau.edu/images/default/sample.pdf">to the PDF!</a></p>
        </object>
    </div>
  );
}

export default Resume;
