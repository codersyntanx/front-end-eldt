import React, { useState, useEffect } from 'react';
import mammoth from 'mammoth';

const Lesson = () => {
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    // Fetch the binary content from the backend API running on port 3003
    fetch('http://localhost:3003/getDocxContent')
      .then(response => response.arrayBuffer())
      .then(binaryContent => {
        // Use mammoth to convert the binary content to HTML
        const options = {};
        return mammoth.extractRawText({ arrayBuffer: binaryContent }, options);
      })
      .then(result => {
        // Set the HTML content to be rendered in your React component
        setHtmlContent(result.value);
      })
      .catch(error => console.error('Error fetching or converting .docx content:', error));
  }, []);

  return (
    <div className='lesson-content' style={{height:"400px",overflowY:"auto"}}>
       <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
   
  );
};

export default Lesson;
