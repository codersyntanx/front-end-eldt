import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams,Link } from 'react-router-dom';
import Navba from './Navba';
import "./quizles.css";
import { jwtDecode } from "jwt-decode";
import { Modal } from 'antd';
import jsPDF from 'jspdf';
import certificateim from "./certificateimage.png"
import errorimage from "./Group 6674 (2).png"
import successimage from "./Group 6674.png"
import sitelogo from "./Logo (2).svg"
import Loader from './Loader';
const Quize = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [results, setResults] = useState([]);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [error, setError] = useState(false);
  const [lessonId, setLessonId] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [successmodal, setSuccessmodal] = useState(false);
  const [errormodal, setErrormodal] = useState(false);
  const [fetcquiz, setFetcquiz] = useState(false);
  const [userId, setUserId] = useState("");
  const [title,setTitle]=useState("")
  const [userName, setUserName] = useState('');


  const resetQuiz = () => {
    // Reset relevant state variables
    setSubmitAttempted(false);
    setResults([]);
    setSelectedOptions({});
    setError(false);
  };

  useEffect(() => {
    const personId = localStorage.getItem("userId");
    if (personId) {
      const decoded = jwtDecode(personId);
      setUserId(decoded.id);
      setUserName(decoded.Name)
      fetchquestions()
      
    }},[userId])
     const { index } = useParams();
  const { chap } = useParams();
  const navigate =useNavigate()
 const handlelesson = ()=>{

navigate(`/StudentLesson/${index}/${Number(chap) + 1}`)
 }
 const fetchQuestions = async () => {
  setFetcquiz(true);
  
  try {
    const response = await axios.get(`https://server-of-united-eldt.vercel.app/api/getQuestionsForStudent/${userId}/${index}/${chap}`);
    setQuestions(response.data.questions[0].questions);
    setTitle(response.data.chaptertitle);
    setLessonId(response.data.questions[0].lessonId);
    console.log(response.data); // Assuming you meant response.data instead of res.data
  } catch (error) {
    console.error('Error fetching questions:', error);
  } finally {
    setFetcquiz(false);
  }
};

const fetchquestions = () => {
  fetchQuestions();
};


  const handleOptionSelect = (questionIndex, optionIndex) => {
    setSelectedOptions((prevSelections) => ({
      ...prevSelections,
      [questionIndex]: optionIndex,
    }));
  };
  const generateCertificate = () => {
    // Create a new jsPDF instance with portrait orientation
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm', // Use millimeters as the unit
    });

    // Create a temporary canvas to draw the image and text
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Load the certificate background image
    const backgroundImage = new Image();
    backgroundImage.src = certificateim;

    backgroundImage.onload = () => {
      // Set canvas dimensions based on the image size
      canvas.width = backgroundImage.width;
      canvas.height = backgroundImage.height;

      // Draw the background image
      ctx.drawImage(backgroundImage, 0, 0);

      // Add text to the canvas
      ctx.font = '40px Arial';
      ctx.fillStyle = 'black';
      ctx.textAlign = 'center';
      ctx.fillText(userName, canvas.width / 2, canvas.height / 2);

     

      // Convert canvas to data URL
      const dataUrl = canvas.toDataURL();

      // Add the image to the PDF
      doc.addImage(dataUrl, 'JPEG', 0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight());

      // Save the PDF
      doc.save('certificate.pdf');
    };
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
  if(percentage < 79){
    setErrormodal(true)
  }else{
    setSuccessmodal(true)
  }
      // Send results to the backend
      const response = await axios.post('https://server-of-united-eldt.vercel.app/api/saveResult', {
        studentId: userId,  // Assuming userId is available in your component state
        indexNumber: index,  // Replace with the actual courseId
        chapterId: lessonId,  // Replace with the actual chapterId
        percentage,
      });
  
      if (response.data.completed === true) {
        setModalVisible(true);
      }
    } catch (error) {
      console.error('Error processing answers:', error);
    }
  };
  
  
  const [scale, setScale] = useState(1); // Initial scale factor
  const [zoomDirection, setZoomDirection] = useState(1); // Initial zoom direction

  useEffect(() => {
    const timer = setInterval(() => {
      // Adjust scale based on zoom direction
      if (scale >= 2) {
        setZoomDirection(-1); // Change direction if scale reaches 2
      } else if (scale <= 0.5) {
        setZoomDirection(1); // Change direction if scale reaches 0.5
      }
      setScale(scale + 0.1 * zoomDirection); // Update scale
    }, 200); // Decrease interval duration to increase speed

    return () => clearInterval(timer); // Cleanup interval
  }, [scale, zoomDirection]);
  return (
    <div className="main-body">
     <Navba page={"quiz"} chapterid={index}/>
     

{
  questions.length === 0 ?(
    <div className="image-container">
   <Loader/>
  </div>
  ):(
    <>
        <div className="backbutton mt-3">  <Link to={`/quiz/${index}`}>
                  <span className="bolding"><i class="fa-solid fa-arrow-left-long"></i><span className="mx-2">Back</span> </span>

        </Link></div>
    <div className="quiz-head">{title}</div>
     <div className="card-body2">
        <div className="paddingdiv">
        {questions.map((question, questionIndex) => {
  const result = results.find((result) => result.questionId === question._id);

  return (
    <div className="border rounded mianrounded mb-3 " key={question._id}>
      <b>{questionIndex + 1}.{question.questionText}</b>
      <div className="p-3">
      {question.options.map((option, optionIndex) => {
                    const isSelected = selectedOptions[questionIndex] === optionIndex;
                    const isCorrect = result?.isCorrect;
                    const isCorrectOption = result?.correctOption === optionIndex;
                    const isIncorrectOption = isSelected && !isCorrect && submitAttempted;


                    return (
                      <div
                        key={option._id}
                        style={{
                          padding: '16px',
                          marginTop: '10px',
                          borderRadius: '12px',
                          cursor: 'pointer',
                          display:"Flex",
                          alignItems:"center",
                          justifyContent:
                          isSelected && !isCorrect && submitAttempted
                          ? 'space-between' // Red for incorrect
                          : isSelected
                          ? isCorrect
                            ? 'space-between' // Green for correct
                            : '' // Initial background for selected option
                          : '',
                          backgroundColor:
                          isSelected && !isCorrect && submitAttempted
                            ? '#FFDFDF' // Red for incorrect
                            : isSelected
                            ? isCorrect
                              ? '#CFFFDD' // Green for correct
                              : '#FFE7B1' // Initial background for selected option
                            : 'white',
                        border:
                          isSelected && !isCorrect && submitAttempted
                            ? '2px solid #FF3737' // Red for incorrect
                            : isSelected
                            ? isCorrect
                              ? '2px solid #55C275' // Green for correct
                              : '2px solid #FBB723' // Initial border for selected option
                            : '2px solid #E8E8E8',
                      }}

                      onClick={() => !submitAttempted && handleOptionSelect(questionIndex, optionIndex)}

                      >
                        {option.optionText}
                        {isCorrectOption && !isCorrect && (
                          <span style={{ color: '#008000' }}> </span>
                        )}
                        {isCorrectOption && isCorrect && (
<div className='tickcontent'><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
  <path d="M21.5 13L14.1625 20L10.5 16.5" stroke="#55C275" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z" stroke="#55C275" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  </div>
)}
{
  isIncorrectOption &&  (
    <div className='tickcontent'><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
    <path d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z" stroke="#FF3737" stroke-width="2" stroke-miterlimit="10"/>
    <path d="M20 12L12 20" stroke="#FF3737" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M20 20L12 12" stroke="#FF3737" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  </div>
  )
}
                        {isSelected && !isCorrect && isCorrectOption && (
                          <span style={{ color: '#FF0000',}}> (Incorrect)</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
               <button className="endbtn" onClick={submitAttempted ? resetQuiz : handleSave}>
        {submitAttempted ? "Try again" : "Save"}
      </button>

          {error && Object.keys(selectedOptions).length !== questions.length && (
            <div style={{ color: 'red', marginTop: '10px' }}>
              Please answer all questions before submitting.
            </div>
          )}
        </div>
      </div><div className='bottommargin'></div>
      <div className="footerforstudy">
Copyright 2024, United ELDT
</div>
      </>
  )
}
     
      <Modal
  open={modalVisible}
  onOk={() => setModalVisible(false)}
  onCancel={() => setModalVisible(false)}
  footer={null}
  header={null}
>
<div className='modal-content-center'>
<svg xmlns="http://www.w3.org/2000/svg" width="91" height="93" viewBox="0 0 91 93" fill="none">
  <path d="M29.6602 21.9599C29.382 22.2381 29.1708 22.5735 28.9944 22.9412L28.9745 22.9214L1.10921 85.6928L1.13654 85.7202C0.619777 86.7214 1.48436 88.7586 3.25575 90.5325C5.02715 92.3039 7.06437 93.1685 8.0656 92.6517L8.09044 92.6766L70.8619 64.8088L70.842 64.7864C71.2073 64.6125 71.5427 64.4013 71.8234 64.1181C75.7041 60.2374 69.411 47.6538 57.7715 36.0118C46.127 24.3698 33.5434 18.0792 29.6602 21.9599Z" fill="#FBB723"/>
  <path d="M33.0738 33.1696L1.80982 84.1152L1.10921 85.6928L1.13654 85.7201C0.619777 86.7213 1.48436 88.7586 3.25575 90.5324C3.83214 91.1088 4.43088 91.5461 5.01721 91.9163L43.0115 45.5917L33.0738 33.1696Z" fill="#D69813"/>
  <path d="M57.9476 35.818C69.5499 47.4252 75.992 59.7977 72.3299 63.4547C68.6704 67.1168 56.2979 60.6772 44.6882 49.0749C33.0835 37.4677 26.6438 25.0903 30.3034 21.4307C33.9654 17.7711 46.3379 24.2108 57.9476 35.818Z" fill="#D69813"/>
  <path d="M46.9617 37.167C46.4673 37.567 45.8213 37.7757 45.1381 37.7012C42.9816 37.4676 41.168 36.7173 39.8984 35.5323C38.5544 34.2776 37.891 32.5932 38.0724 30.9063C38.3904 27.9448 41.3618 25.2269 46.4275 25.7734C48.3976 25.9846 49.2771 25.3511 49.3069 25.048C49.3417 24.7474 48.6188 23.9399 46.6486 23.7263C44.4921 23.4927 42.6785 22.7424 41.4065 21.5574C40.0624 20.3027 39.3966 18.6183 39.5804 16.9314C39.9034 13.9699 42.8723 11.252 47.9331 11.801C49.3691 11.9551 50.1268 11.6594 50.4473 11.4681C50.7032 11.3116 50.8051 11.1625 50.815 11.0756C50.8448 10.775 50.1318 9.96752 48.1567 9.75386C46.7927 9.6048 45.8039 8.38246 45.9555 7.01603C46.102 5.65208 47.3219 4.66576 48.6908 4.81483C53.7516 5.35892 56.077 8.64581 55.7565 11.6097C55.4335 14.5761 52.4647 17.2891 47.3989 16.745C45.9629 16.5885 45.2126 16.8866 44.8896 17.0779C44.6337 17.232 44.5294 17.3835 44.5195 17.468C44.4872 17.7711 45.2052 18.5761 47.1803 18.7897C52.2411 19.3363 54.5665 22.6207 54.246 25.5846C53.9255 28.5461 50.9566 31.264 45.8933 30.715C44.4574 30.5609 43.7021 30.8591 43.3791 31.0479C43.1207 31.2069 43.0214 31.3559 43.0114 31.4404C42.9791 31.741 43.6971 32.5485 45.6698 32.7621C47.0312 32.9112 48.0225 34.136 47.8709 35.5C47.8014 36.1807 47.4561 36.7695 46.9617 37.167Z" fill="#2C292A"/>
  <path d="M76.9497 60.1429C81.8515 58.7591 85.2328 60.9454 86.0378 63.8149C86.8427 66.6819 85.0987 70.3117 80.1994 71.6905C78.2864 72.2272 77.7125 73.1414 77.7895 73.4321C77.874 73.7253 78.8454 74.2073 80.7534 73.6681C85.6527 72.2893 89.034 74.4756 89.8389 77.3426C90.6489 80.2121 88.8998 83.8369 83.9981 85.2182C82.0875 85.7549 81.5111 86.6716 81.5956 86.9623C81.6776 87.253 82.6465 87.735 84.5571 87.1983C85.8738 86.8281 87.2502 87.5958 87.6204 88.915C87.9881 90.2368 87.2204 91.6082 85.8986 91.9808C81.0018 93.3597 77.6181 91.1784 76.8081 88.3064C76.0032 85.4393 77.7497 81.8146 82.654 80.4332C84.567 79.8941 85.1409 78.9823 85.0564 78.6892C84.9769 78.3985 84.008 77.914 82.1 78.4507C77.1957 79.832 73.8169 77.6507 73.0095 74.7762C72.202 71.9092 73.9486 68.2844 78.8503 66.9006C80.7584 66.3664 81.3323 65.4472 81.2528 65.159C81.1683 64.8658 80.2019 64.3838 78.2913 64.9205C76.9696 65.2931 75.6007 64.523 75.228 63.2037C74.8579 61.887 75.628 60.5156 76.9497 60.1429Z" fill="#2C292A"/>
  <path d="M57.924 53.4425C57.1936 53.4425 56.4731 53.122 55.9812 52.5108C55.1241 51.4375 55.3004 49.8748 56.3688 49.0177C56.9104 48.5829 69.8294 38.4366 88.0874 41.0477C89.4464 41.2415 90.3905 42.4986 90.1967 43.8576C90.0029 45.2141 88.7557 46.1681 87.3843 45.9644C71.2529 43.6737 59.5911 52.8065 59.4768 52.8984C59.0147 53.2661 58.4681 53.4425 57.924 53.4425Z" fill="#2C292A"/>
  <path d="M15.0705 43.1073C14.8345 43.1073 14.5935 43.0725 14.355 43.0029C13.0408 42.6079 12.2954 41.2241 12.6905 39.9098C15.5053 30.5361 18.0568 15.5773 14.9215 11.6768C14.5712 11.2346 14.042 10.7998 12.8296 10.8917C10.4992 11.0706 10.7203 15.9873 10.7228 16.037C10.8271 17.4059 9.79859 18.5984 8.43216 18.7003C7.04336 18.7847 5.87071 17.7761 5.76885 16.4071C5.51296 12.9811 6.57878 6.38248 12.4569 5.93777C15.0805 5.73901 17.2593 6.6508 18.7972 8.5638C24.6877 15.8953 18.7077 37.1496 17.4506 41.3383C17.1276 42.4141 16.1388 43.1073 15.0705 43.1073Z" fill="#2C292A"/>
  <path d="M64.1329 30.6852C66.1911 30.6852 67.8595 29.0167 67.8595 26.9586C67.8595 24.9004 66.1911 23.2319 64.1329 23.2319C62.0747 23.2319 60.4062 24.9004 60.4062 26.9586C60.4062 29.0167 62.0747 30.6852 64.1329 30.6852Z" fill="#FBB723"/>
  <path d="M5.74619 53.045C8.49041 53.045 10.715 50.8204 10.715 48.0761C10.715 45.3319 8.49041 43.1073 5.74619 43.1073C3.00197 43.1073 0.777344 45.3319 0.777344 48.0761C0.777344 50.8204 3.00197 53.045 5.74619 53.045Z" fill="#FBB723"/>
  <path d="M81.5235 55.5294C83.5817 55.5294 85.2501 53.861 85.2501 51.8028C85.2501 49.7446 83.5817 48.0762 81.5235 48.0762C79.4653 48.0762 77.7969 49.7446 77.7969 51.8028C77.7969 53.861 79.4653 55.5294 81.5235 55.5294Z" fill="#FBB723"/>
  <path d="M59.1641 85.3426C61.2223 85.3426 62.8908 83.6741 62.8908 81.6159C62.8908 79.5578 61.2223 77.8893 59.1641 77.8893C57.106 77.8893 55.4375 79.5578 55.4375 81.6159C55.4375 83.6741 57.106 85.3426 59.1641 85.3426Z" fill="#FBB723"/>
  <path d="M70.3438 18.263C73.0881 18.263 75.3127 16.0384 75.3127 13.2942C75.3127 10.5499 73.0881 8.32532 70.3438 8.32532C67.5996 8.32532 65.375 10.5499 65.375 13.2942C65.375 16.0384 67.5996 18.263 70.3438 18.263Z" fill="#FBB723"/>
  <path d="M81.5235 28.2007C83.5817 28.2007 85.2501 26.5322 85.2501 24.4741C85.2501 22.4159 83.5817 20.7474 81.5235 20.7474C79.4653 20.7474 77.7969 22.4159 77.7969 24.4741C77.7969 26.5322 79.4653 28.2007 81.5235 28.2007Z" fill="#FBB723"/>
  <path d="M74.0704 38.1385C76.1286 38.1385 77.797 36.47 77.797 34.4118C77.797 32.3537 76.1286 30.6852 74.0704 30.6852C72.0122 30.6852 70.3438 32.3537 70.3438 34.4118C70.3438 36.47 72.0122 38.1385 74.0704 38.1385Z" fill="#FBB723"/>
  <path d="M30.504 8.2532C32.5621 8.2532 34.2306 6.58473 34.2306 4.52656C34.2306 2.4684 32.5621 0.799927 30.504 0.799927C28.4458 0.799927 26.7773 2.4684 26.7773 4.52656C26.7773 6.58473 28.4458 8.2532 30.504 8.2532Z" fill="#FBB723"/>
</svg>
<span className='bold-content'>
Congratulations, you have completed the Class A course.
</span><br></br>
<span className='light-content'>Congratulations! Now you can download your certificate or print it right away.</span><br></br>
<button className='download-button' onClick={generateCertificate}>Download certificate</button>
</div></Modal>
<Modal
  open={successmodal}
  onOk={() => setSuccessmodal(false)}
  onCancel={() => setSuccessmodal(false)}
  footer={null}
  header={null}
>
<div className='modal-content-center'>
<img className='mx-auto' src={successimage} alt='done'/>
<span className='bold-content'>
Congratulations, you have completed this lesson.
</span><br></br>
<span className='light-content'>Congratulations!</span><br></br>
<button className='download-button' onClick={handlelesson}>Go to Next Lesson</button>
</div></Modal>
<Modal
  open={errormodal}
  onOk={() => setErrormodal(false)}
  onCancel={() => setErrormodal(false)}
  footer={null}
  header={null}
>
<div className='modal-content-center'>
<img className='mx-auto' src={errorimage} alt='done'/>

<span className='bold-content'>
Sorry,Please Try again
</span><br></br>
<span className='light-content'>Sorry, you did not score 80% or higher on the quiz</span><br></br>
<button className='download-button' onClick={()=>{setErrormodal(false)}}>Review</button>
</div></Modal>
    </div>
  );
};

export default Quize;
