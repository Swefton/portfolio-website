import React from 'react';
import '../styles/Resume.css';

function Resume() {
  return (
    <div className='pdf'>
        <object data="/Amrit Resume.pdf#toolbar=0" type="application/pdf" width="100%" height="100%">
        </object>
    </div>
  );
}

export default Resume;
