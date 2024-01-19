import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import "./coursetitle.css";
import { Switch, Slider } from 'antd';
import Navba from "./Navba";

function Studypage() {
  const [chapters, setChapters] = useState([]);
  const [page, setPage] = useState([]);
  const [userId, setUserId] = useState("");
  const [chaptertitles, setChaptertitles] = useState([]);
  const [studentprogress, setStudentprogress] = useState([]);
  const [chapti, setChapti] = useState("Select Lesson");
  const { id } = useParams();
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [chapterIndex, setChapterIndex] = useState(2);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleChapterClick = (index, title) => {
    setChapterIndex(index);
    setChapti(title);
    setPage(chapters[index].pages[0]);
    setTotalPages(chapters[index].pages.length);
    setCurrentPageIndex(0);
  };

  const handleNextPageClick = () => {
    stopSpeaking();

    if (currentPageIndex < totalPages - 1) {
      setCurrentPageIndex((prevIndex) => prevIndex + 1);
      setPage(chapters[chapterIndex].pages[currentPageIndex + 1]);
    }
  };

  const handlePreviousPageClick = () => {
    stopSpeaking();

    if (currentPageIndex > 0) {
      setCurrentPageIndex((prevIndex) => prevIndex - 1);
      setPage(chapters[chapterIndex].pages[currentPageIndex - 1]);
    }
  };

  useEffect(() => {
    stopSpeaking();
    const personId = localStorage.getItem("userId");
  
    if (personId) {
      const decoded = jwtDecode(personId);
      setUserId(decoded.id);
    }
      if (userId) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:3003/getCourseChapters/${userId}/${id}`);
          setChapters(response.data.chapters);
          setStudentprogress(response.data.studentProgress);
          fetchChaptersTitles();
          // Set initial state only if chapters are available
          if (response.data.chapters.length > 0) {
            setPage(response.data.chapters[chapterIndex].pages[0]);
            setTotalPages(response.data.chapters[chapterIndex].pages.length);
          }
        } catch (error) {
          console.error("Error fetching chapters:", error);
        }
      };
  
      // Call fetchData
      fetchData();
    }
  }, [userId]);
  
  
  const handleToggleSpeech = () => {
    if (!isSpeaking) {
      speakText();
    } else {
      stopSpeaking();
    }
  };

  const speakText = () => {
    const speechSynthesis = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(page.description);

    // Optional: Set additional properties for the utterance, e.g., rate, pitch, etc.
    // utterance.rate = 1.0;

    speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };
  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, []);
  const fetchChaptersTitles = async () => {
    try {
      const response = await axios.get(`http://localhost:3003/getChapterTitles/${userId}/${id}`);
      setChaptertitles(response.data.chapters);
      if (response.data.chapters.length > 0) {
        setChapti(response.data.chapters[chapterIndex].title);
      }
    } catch (error) {
      console.error("Error fetching chapter titles:", error);
    }
  };

    return (
      <div className="learning">
        <Navba/>
      <div className="progressgra d-flex">
  <div className="displaypro" style={{ width: `${studentprogress.progressPercentage}%`, backgroundColor: '#FBB723',height:"100%" }}></div>
  <span>Progress: {studentprogress.progressPercentage}%</span>
</div>
<button className="prebtn" onClick={handlePreviousPageClick} disabled={currentPageIndex === 0}>
              Previous
            </button>
        <div className="main-contain-">
          <div className="card-head">Registration <Switch
  checked={isSpeaking}
  onChange={handleToggleSpeech}
  checkedChildren=""
  unCheckedChildren=""
/>

</div>
          <div className="card-con">
            <div className="titles">
            <div className="dropdown">
              <span
                className=" dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {chapti}
              </span>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton" onClick={stopSpeaking}>
                {chaptertitles.map((chapter, index) => (
                  <div
                    key={index}
                    className={`dropcon dropdown-item ${chapter.available ? "" : "disabled"}`}
                    onClick={() => handleChapterClick(index, chapter.title)}
                  >
                    {chapter.available ? (
                      <>
                      <div>{index +1}. <span style={{ color: "#2C292A" }}>{chapter.title}</span></div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
  <path d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z" stroke="#FBB723" stroke-width="2" stroke-miterlimit="10"/>
  <path d="M20 16L14 12V20L20 16Z" stroke="#FBB723" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
                      </>
                    ) : (
                      <>
                      <div>{index +1}. <span style={{ color: "#2C292A" }}>{chapter.title}</span></div>
                       
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
  <path d="M26 11H6C5.44772 11 5 11.4477 5 12V26C5 26.5523 5.44772 27 6 27H26C26.5523 27 27 26.5523 27 26V12C27 11.4477 26.5523 11 26 11Z" stroke="#2C292A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M11.5 11V6.5C11.5 5.30653 11.9741 4.16193 12.818 3.31802C13.6619 2.47411 14.8065 2 16 2C17.1935 2 18.3381 2.47411 19.182 3.31802C20.0259 4.16193 20.5 5.30653 20.5 6.5V11" stroke="#2C292A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M16 20.5C16.8284 20.5 17.5 19.8284 17.5 19C17.5 18.1716 16.8284 17.5 16 17.5C15.1716 17.5 14.5 18.1716 14.5 19C14.5 19.8284 15.1716 20.5 16 20.5Z" fill="#2C292A"/>
</svg>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>  
            <div className="mx-auto d-flex align-items-center gap-2">
                  <span className="activepage">{currentPageIndex + 1}</span>  of <span className="totalpage">{totalPages}</span>
      
            </div>
          
            </div>
          
            <div className="p-3" dangerouslySetInnerHTML={{ __html: page.description }} />
            <div className="page-navigation">
          
            <button onClick={handleToggleSpeech}>
          {isSpeaking ? "Stop Speaking" : "Start Speaking"}
        </button>
           
          </div>
          </div>
        </div>
        <button className="nextbtn" onClick={handleNextPageClick} disabled={currentPageIndex === totalPages - 1}>
              Next
            </button>
      </div>
    );
  }
  
  export default Studypage;
  