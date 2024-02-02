import { useEffect, useState } from "react";
import logo from "./Logo (2).svg";
import "./quizles.css"
import { Link, useNavigate } from "react-router-dom";
function Navba ({page,chapterid}){
  const [chapter, setChapter]=useState("")
  const [lesson, setLesson]=useState("")
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
      setIsOpen(!isOpen);
  };
const navigate = useNavigate()
  useEffect(()=>{
const chapter = localStorage.getItem("chapindex")
const lesson = localStorage.getItem("lessonid")
if(chapter != ""){
  setChapter(chapter)
  setLesson(lesson)
}

  },[])
  const gotochapterlist=()=>{
    if(chapterid != null){
      if(page === "Alllessons"){
        navigate(`/Alllessons/${chapterid}`)
      }else{
        navigate(`/quiz/${chapterid}`)
    }
      
    }
    }
  const gotolastchap=()=>{
    if(chapter != ""){
      navigate(`/StudentLesson/${lesson}/${chapter}`)
    }
    }
    return(
        <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/studentdash">
     <img src={logo} alt="logo"/> 
    </Link>
    {/* <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNavDropdown"
      aria-controls="navbarNavDropdown"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button> */}
    <div style={{border:"none"}} className="navbar-toggler"  data-bs-toggle="collapse" data-bs-target="#navbarNav"  aria-controls="navbarNavDropdown" aria-expanded="false"
      aria-label="Toggle navigation" onClick={handleToggle}>
                    {isOpen ? (
                       <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
  <path d="M25 7L7 25" stroke="#FBB723" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M25 25L7 7" stroke="#FBB723" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                      <path d="M6.25 20H33.75" stroke="#FBB723" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M6.25 10H33.75" stroke="#FBB723" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M6.25 30H33.75" stroke="#FBB723" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    )}
                </div>
    <div  className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
      <ul className="navbar-nav ms-auto">
        <li className="nav-item">
          <Link className="nav-link d-flex" aria-current="page"  to="/studentdash">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
  <path d="M2.5 5.1001V11.3501" stroke="#696969" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M4.23438 16.9751C4.85974 16.0159 5.71451 15.2279 6.72128 14.6824C7.72804 14.137 8.85497 13.8513 10 13.8513C11.145 13.8513 12.272 14.137 13.2787 14.6824C14.2855 15.2279 15.1403 16.0159 15.7656 16.9751" stroke="#696969" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M17.5 5.1001L10 7.6001L2.5 5.1001L10 2.6001L17.5 5.1001Z" stroke="#696969" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M13.2266 6.52197C13.7999 7.14805 14.1787 7.9274 14.3167 8.76502C14.4548 9.60263 14.3462 10.4623 14.0042 11.2393C13.6622 12.0163 13.1015 12.6769 12.3905 13.1408C11.6795 13.6046 10.8489 13.8516 10 13.8516C9.15108 13.8516 8.3205 13.6046 7.60951 13.1408C6.89852 12.6769 6.33783 12.0163 5.99581 11.2393C5.65378 10.4623 5.54518 9.60263 5.68326 8.76502C5.82134 7.9274 6.20012 7.14805 6.77344 6.52197" stroke="#696969" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
</svg> My courses
          </Link>
        </li>
        <li className="nav-item " onClick={gotochapterlist}>
          <Link className="nav-link  d-flex">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
  <path d="M6.875 5.1001H16.875" stroke="#696969" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M6.875 10.1001H16.875" stroke="#696969" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M6.875 15.1001H16.875" stroke="#696969" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M3.4375 6.0376C3.95527 6.0376 4.375 5.61786 4.375 5.1001C4.375 4.58233 3.95527 4.1626 3.4375 4.1626C2.91973 4.1626 2.5 4.58233 2.5 5.1001C2.5 5.61786 2.91973 6.0376 3.4375 6.0376Z" fill="#696969"/>
  <path d="M3.4375 11.0376C3.95527 11.0376 4.375 10.6179 4.375 10.1001C4.375 9.58233 3.95527 9.1626 3.4375 9.1626C2.91973 9.1626 2.5 9.58233 2.5 10.1001C2.5 10.6179 2.91973 11.0376 3.4375 11.0376Z" fill="#696969"/>
  <path d="M3.4375 16.0376C3.95527 16.0376 4.375 15.6179 4.375 15.1001C4.375 14.5823 3.95527 14.1626 3.4375 14.1626C2.91973 14.1626 2.5 14.5823 2.5 15.1001C2.5 15.6179 2.91973 16.0376 3.4375 16.0376Z" fill="#696969"/>
</svg> Contents
          </Link>
        </li>
        
        <li className="nav-item " onClick={gotolastchap}>
        <a className="nav-link  d-flex" href="#"> 
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
  <path d="M14.375 6.3501H3.125C2.77982 6.3501 2.5 6.62992 2.5 6.9751V15.7251C2.5 16.0703 2.77982 16.3501 3.125 16.3501H14.375C14.7202 16.3501 15 16.0703 15 15.7251V6.9751C15 6.62992 14.7202 6.3501 14.375 6.3501Z" stroke="#696969" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M5 3.8501H16.875C17.0408 3.8501 17.1997 3.91595 17.3169 4.03316C17.4342 4.15037 17.5 4.30934 17.5 4.4751V13.8501" stroke="#696969" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>     Resume     </a>

        </li>
      </ul>
    </div>
  </div>
</nav>  
        </>
    )
}
export default Navba;