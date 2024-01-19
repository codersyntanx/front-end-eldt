import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Quize = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({}); // Store user selections

  useEffect(() => {
    // Fetch questions when the component mounts
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('http://localhost:3003/getQuestionsByLessonId/65a778228747231808e9fe96'); // Replace with your endpoint
        setQuestions(response.data[0].questions);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  const handleOptionSelect = (questionIndex, optionIndex) => {
    // Update selected options
    setSelectedOptions((prevSelections) => ({
      ...prevSelections,
      [questionIndex]: optionIndex,
    }));
  };

  const handleSave = async () => {
    try {
      // Prepare data to send to the backend
      const dataToSend = questions.map((question, questionIndex) => ({
        questionId: question._id,
        selectedOption: selectedOptions[questionIndex],
      }));

      // Send data to the backend (replace with your endpoint)
      const response = await axios.post('/submitAnswers', dataToSend);

      // Handle the response, update UI, etc.
      console.log('Response from backend:', response.data);
    } catch (error) {
      console.error('Error submitting answers:', error);
    }
  };

  return (
    <div>
      <div  className='card-header p-3'>Quiz</div >
      <div className='border p-5'>
      {questions.map((question, questionIndex) => (
        <div key={question._id}>
          <p>{question.questionText}</p>
          <div className='border rounded p-3'>
          {question.options.map((option, optionIndex) => (
            <div
              key={option._id}
              style={{
                padding:"16px",
                marginTop:"10px",
                borderRadius:"12px",
                cursor:"pointer",
                backgroundColor:
                  selectedOptions[questionIndex] === optionIndex
                    ? '#FFE7B1' // Color for selected option
                    : 'white',
                    border:
                  selectedOptions[questionIndex] === optionIndex
                    ? '2px solid #FBB723' // Color for selected option
                    : ' 2px solid #E8E8E8',
              }}
              onClick={() => handleOptionSelect(questionIndex, optionIndex)}
            >
              {option.optionText}
            </div>
          ))}
        </div></div>
      ))}
      <button onClick={handleSave}>Save</button>
    </div></div>
  );
};

export default Quize;
