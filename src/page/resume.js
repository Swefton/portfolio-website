import React, { useState, useEffect, useRef } from 'react';
import '../styles/Resume.css';

function Resume() {
  return (
        <div>
            <iframe
                class="pdf" 
                src="https://media.geeksforgeeks.org/wp-content/cdn-uploads/20210101201653/PDF.pdf#toolbar=0&#FitH"
                >
            </iframe>
        </div>
    );
}

export default Resume;