import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navba from './Navba';
import "./quizles.css";
import { jwtDecode } from "jwt-decode";

const Quize = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [results, setResults] = useState([]);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [error, setError] = useState(false);
  const [lessonId, setLessonId] = useState("");


  const [userId, setUserId] = useState("");
  const [title,setTitle]=useState("")
  useEffect(() => {
    const personId = localStorage.getItem("userId");
    if (personId) {
      const decoded = jwtDecode(personId);
      setUserId(decoded.id);
      fetchquestions()
    }},[userId])
     const { index } = useParams();
  const { chap } = useParams();
 
console.log(index)
console.log(chap)
  const fetchquestions=()=> {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`http://localhost:3003/getQuestionsForStudent/${userId}/${index}/${chap}`);
        setQuestions(response.data.questions[0].questions);
        setTitle(response.data.chaptertitle)
        setLessonId(response.data.questions[0].lessonId)
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };
// new lesson work
    fetchQuestions();
  };

  const handleOptionSelect = (questionIndex, optionIndex) => {
    setSelectedOptions((prevSelections) => ({
      ...prevSelections,
      [questionIndex]: optionIndex,
    }));
  };

  const handleSave = async () => {
    try {
      // Check if all questions are answered
      if (Object.keys(selectedOptions).length !== questions.length) {
        setError(true);
        return;
      }
  
      setSubmitAttempted(true);
  
      const results = questions.map((question, questionIndex) => {
        const correctOptionIndex = question.options.findIndex((option) => option.isCorrect);
        const userSelectedOption = selectedOptions[questionIndex];
  
        return {
          questionId: question._id,
          userSelectedOption,
          isCorrect: userSelectedOption === correctOptionIndex,
          correctOption: correctOptionIndex,
        };
      });
  
      setResults(results);
  
      // Calculate percentage
      const correctCount = results.filter(result => result.isCorrect).length;
      const totalQuestions = results.length;
      const percentage = (correctCount / totalQuestions) * 100;
  
      // Send results to the backend
      await axios.post('http://localhost:3003/saveResult', {
        studentId: userId,  // Assuming userId is available in your component state
        courseId: index,  // Replace with the actual courseId
        chapterId: lessonId,  // Replace with the actual chapterId
        percentage,
      });
  
    } catch (error) {
      console.error('Error processing answers:', error);
    }
  };
  
  
  return (
    <div className="main-body">
      <Navba />
      <div className="quiz-head">{title}</div>
      <div className="card-body">
        <div className="p-5">
        {questions.map((question, questionIndex) => {
  const result = results.find((result) => result.questionId === question._id);

  return (
    <div className="border rounded p-3 mb-3" key={question._id}>
      <b>{questionIndex + 1}.{question.questionText}</b>
      <div className="p-3">
      {question.options.map((option, optionIndex) => {
                    const isSelected = selectedOptions[questionIndex] === optionIndex;
                    const isCorrect = result?.isCorrect;
                    const isCorrectOption = result?.correctOption === optionIndex;


                    return (
                      <div
                        key={option._id}
                        style={{
                          padding: '16px',
                          marginTop: '10px',
                          borderRadius: '12px',
                          cursor: 'pointer',
                          backgroundColor:
                          isSelected && !isCorrect && submitAttempted
                            ? '#FFC0CB' // Red for incorrect
                            : isSelected
                            ? isCorrect
                              ? '#ADEBAD' // Green for correct
                              : '#FFE7B1' // Initial background for selected option
                            : 'white',
                        border:
                          isSelected && !isCorrect && submitAttempted
                            ? '2px solid #FF0000' // Red for incorrect
                            : isSelected
                            ? isCorrect
                              ? '2px solid #008000' // Green for correct
                              : '2px solid #FBB723' // Initial border for selected option
                            : '2px solid #E8E8E8',
                      }}

                      onClick={() => !submitAttempted && handleOptionSelect(questionIndex, optionIndex)}

                      >
                        {option.optionText}
                        {isCorrectOption && !isCorrect && (
                          <span style={{ color: '#008000' }}> (Correct)</span>
                        )}
                        {isSelected && !isCorrect && isCorrectOption && (
                          <span style={{ color: '#FF0000' }}> (Incorrect)</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
          <button className="endbtn" onClick={handleSave}>
            Save
          </button>
          {error && Object.keys(selectedOptions).length !== questions.length && (
            <div style={{ color: 'red', marginTop: '10px' }}>
              Please answer all questions before submitting.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quize;
