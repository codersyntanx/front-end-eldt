import React, { useEffect, useState } from 'react';
import ReactFileViewer from 'react-file-viewer';
import mammoth from 'mammoth';
// ... (other imports)

const Lesson = () => {
  const [docxContent, setDocxContent] = useState(null);
  const [speaking, setSpeaking] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [text, setText] = useState("");  

  const speak = (text) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);

    utterance.onstart = () => {
      setSpeaking(true);
      setHighlightedIndex(0);
    };

    utterance.onend = () => {
      setSpeaking(false);
      setHighlightedIndex(-1);
    };

    synth.speak(utterance);
  };

  const readText = () => {
    if (docxContent) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const arrayBuffer = reader.result;
        // Convert the array buffer to text using mammoth
        mammoth.extractRawText({ arrayBuffer })
          .then(result => {
            const text = result.value;  
            setText(text);
            speak(text);
          })
          .catch(error => console.error('Error extracting text from DOCX:', error));
      };
      reader.readAsArrayBuffer(docxContent);
    }
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setSpeaking(false);
    setHighlightedIndex(-1);
  };

  useEffect(() => {
    // Fetch the binary content from the backend API running on port 3003
    fetch('https://server-of-united-eldt.vercel.app/getDocxContent')
      .then(response => response.arrayBuffer())
      .then(binaryContent => {
        // Convert the binary content to a Blob
        const blob = new Blob([binaryContent], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
        setDocxContent(blob);
      })
      .catch(error => console.error('Error fetching .docx content:', error));
  }, []);

  useEffect(() => {
    // Simulate the highlighting effect using a timer
    if (speaking) {
      const timer = setInterval(() => {
        setHighlightedIndex(prevIndex => (prevIndex === text.length - 1 ? -1 : prevIndex + 1));
      }, 100); // Adjust the timing as needed

      return () => clearInterval(timer);
    }
  }, [speaking, text]);

  return (
    <div className='lesson-content' style={{height:"500px",overflowY:"auto"}}>
      {docxContent && (
        <>
          <ReactFileViewer
            fileType='docx'
            filePath={URL.createObjectURL(docxContent)}
          />
          <button style={{ color: 'red', backgroundColor: 'black' }} onClick={readText}>Read Text</button>
          {speaking && <button style={{ color: 'white', backgroundColor: 'red' }} onClick={stopSpeaking}>Stop</button>}
          <div style={{ marginTop: '10px', padding: '5px', backgroundColor: 'yellow' }}>
            {highlightedIndex !== -1 &&
              <span>
                {text.slice(0, highlightedIndex)}
                <span style={{ backgroundColor: 'lightblue' }}>
                  {text[highlightedIndex]}
                </span>
                {text.slice(highlightedIndex + 1)}
              </span>
            }
          </div>
        </>
      )}
    </div>
  );
};

export default Lesson;
