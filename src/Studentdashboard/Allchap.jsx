import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Navba from "./Navba";
import "./quizles.css"
function Allchap(){
    const { id } = useParams();
    const [chaptertitles, setChaptertitles] = useState([]);
    const [userId, setUserId] = useState("");
    const [studentprogress, setStudentprogress] = useState([]);
    const [coursename, setCoursename] = useState([]);
    const navigate = useNavigate()
    const changepage =(index)=>{
navigate(`/StudentLesson/${id}/${index}`)
    }
    useEffect(() => {
      const personId = localStorage.getItem("userId");
      if (personId) {
        const decoded = jwtDecode(personId);
        setUserId(decoded.id);
      }
        if (userId) {
        const fetchData = async () => {
          try {

            const response = await axios.get(`http://localhost:3003/getCourseChapters/${userId}/${id}`);
            setStudentprogress(response.data.studentProgress);
            setCoursename(response.data.courseName);
            fetchChaptersTitles();
       
          } catch (error) {
            console.error("Error fetching chapters:", error);
          }
        };
    
        // Call fetchData
        fetchData();
      }
    }, [userId]);
        const fetchChaptersTitles = async () => {
            try {
              const response = await axios.get(`http://localhost:3003/getChapterTitles/${userId}/${id}`);
              setChaptertitles(response.data.chapters);
             
            } catch (error) {
              console.error("Error fetching chapter titles:", error);
            }
          };
    return(
        <>
        <div className="main-body">
          <Navba/>
          <div className="progressgra d-flex" style={{color:"grey"}}>
  <div className="displaypro" style={{ width: `${studentprogress.progressPercentage}%`, backgroundColor: '#FBB723',height:"100%" }}></div>
  <span>Progress: {studentprogress.progressPercentage}%</span>
</div>
<div className="card-hea">My courses</div>
        <div className="card-body">
          <p className="course-Name">{coursename}</p>
          <span className="stu">Your progress {studentprogress.lessonIndex} of {studentprogress.totalChapters} complete. <b>Get certificate after complete</b></span>

          <div className="progreque d-flex" >
  <div className="displayquiz" style={{ width: `${studentprogress.progressPercentage}%`, backgroundColor: '#FBB723',height:"100%" }}></div>
  <div className="circlepro">
  <span >{studentprogress.progressPercentage}%</span></div>
</div>
          {chaptertitles.map((chapter, index) => (
              <div
              key={index}
              className={`listitem ${chapter.available ? "" : "disabled"}`}
              onClick={chapter.available ? () => changepage(index, chapter.chapId) : undefined}
          > 
                    {chapter.available ? (
                      
                      <>
                      <div   className="d-flex gap-3 mx-2"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
  <path d="M21.5484 11.8625L8.05781 3.61253C7.94425 3.54248 7.81405 3.50399 7.68065 3.50104C7.54724 3.49809 7.41547 3.53078 7.29892 3.59574C7.18237 3.66071 7.08526 3.75559 7.0176 3.8706C6.94995 3.98562 6.91421 4.11659 6.91406 4.25003V20.75C6.91421 20.8835 6.94995 21.0144 7.0176 21.1295C7.08526 21.2445 7.18237 21.3393 7.29892 21.4043C7.41547 21.4693 7.54724 21.502 7.68065 21.499C7.81405 21.4961 7.94425 21.4576 8.05781 21.3875L21.5484 13.1375C21.6592 13.072 21.751 12.9788 21.8148 12.867C21.8785 12.7552 21.9121 12.6287 21.9121 12.5C21.9121 12.3713 21.8785 12.2449 21.8148 12.1331C21.751 12.0213 21.6592 11.928 21.5484 11.8625V11.8625Z" stroke="#2C292A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg> <span style={{ color: "#2C292A" }}>{chapter.title}</span></div>
<div className="lastsvg"> 
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
  <path d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z" stroke="#FBB723" stroke-width="2" stroke-miterlimit="10"/>
  <path d="M20 16L14 12V20L20 16Z" stroke="#FBB723" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg></div>
                      </>
                    ) : (
                      <>
                      <div className="d-flex gap-3 mx-2"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
  <path d="M21.5484 11.8625L8.05781 3.61253C7.94425 3.54248 7.81405 3.50399 7.68065 3.50104C7.54724 3.49809 7.41547 3.53078 7.29892 3.59574C7.18237 3.66071 7.08526 3.75559 7.0176 3.8706C6.94995 3.98562 6.91421 4.11659 6.91406 4.25003V20.75C6.91421 20.8835 6.94995 21.0144 7.0176 21.1295C7.08526 21.2445 7.18237 21.3393 7.29892 21.4043C7.41547 21.4693 7.54724 21.502 7.68065 21.499C7.81405 21.4961 7.94425 21.4576 8.05781 21.3875L21.5484 13.1375C21.6592 13.072 21.751 12.9788 21.8148 12.867C21.8785 12.7552 21.9121 12.6287 21.9121 12.5C21.9121 12.3713 21.8785 12.2449 21.8148 12.1331C21.751 12.0213 21.6592 11.928 21.5484 11.8625V11.8625Z" stroke="#2C292A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg> <span style={{ color: "#2C292A" }}>{chapter.title}</span></div>
<div className="lastsvg">      
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
  <path d="M26 11H6C5.44772 11 5 11.4477 5 12V26C5 26.5523 5.44772 27 6 27H26C26.5523 27 27 26.5523 27 26V12C27 11.4477 26.5523 11 26 11Z" stroke="#2C292A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M11.5 11V6.5C11.5 5.30653 11.9741 4.16193 12.818 3.31802C13.6619 2.47411 14.8065 2 16 2C17.1935 2 18.3381 2.47411 19.182 3.31802C20.0259 4.16193 20.5 5.30653 20.5 6.5V11" stroke="#2C292A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M16 20.5C16.8284 20.5 17.5 19.8284 17.5 19C17.5 18.1716 16.8284 17.5 16 17.5C15.1716 17.5 14.5 18.1716 14.5 19C14.5 19.8284 15.1716 20.5 16 20.5Z" fill="#2C292A"/>
</svg></div>
                      </>
                    )}
                  </div>
                ))}
             </div>
             </div> 
        </>
    )
}
export default Allchap