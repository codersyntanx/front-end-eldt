import "./studentdashcss.css"
import logo from "./Logo (2).svg"
import StudentRegistration from "./StudentRegistration";
import Progre from "./Progre";
import { useState } from "react";
function StudentNav (){
    const [selectedPage, setSelectedPage] = useState('myaccount');
    const handleNavigationClick = (page) => {
      setSelectedPage(page);
    };
  
    const renderPage = () => {
      switch (selectedPage) {

        case 'coverages':
          return <CoveragesPage changeIcon={(newIcon) => changeIcon('coverages', newIcon)} handleNavigationClick={handleNavigationClick} />;
        case 'courses':
          return <Progre />;
        case 'myaccount':
          return <StudentRegistration />;
        case 'homepage':
          return <Homepage />;
        default:
          return null;
      }
    };
  return(
    <div className="d-flex">
    <div className="main-nav">
        <div className="logo_wraper">
<img src={logo} alt="complogo"/>
</div>
<div className="Navbar_Links">
    <ul>
        <li className={` ${selectedPage === 'courses' ? 'activateding' : ''}`} onClick={() => handleNavigationClick('courses')}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
  <path d="M2.5 5.6001V11.8501" stroke="#696969" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M4.23438 17.4751C4.85974 16.5159 5.71451 15.7279 6.72128 15.1824C7.72804 14.637 8.85497 14.3513 10 14.3513C11.145 14.3513 12.272 14.637 13.2787 15.1824C14.2855 15.7279 15.1403 16.5159 15.7656 17.4751" stroke="#696969" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M17.5 5.6001L10 8.1001L2.5 5.6001L10 3.1001L17.5 5.6001Z" stroke="#696969" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M13.2266 7.02197C13.7999 7.64805 14.1787 8.4274 14.3167 9.26502C14.4548 10.1026 14.3462 10.9623 14.0042 11.7393C13.6622 12.5163 13.1015 13.1769 12.3905 13.6408C11.6795 14.1046 10.8489 14.3516 10 14.3516C9.15108 14.3516 8.3205 14.1046 7.60951 13.6408C6.89852 13.1769 6.33783 12.5163 5.99581 11.7393C5.65378 10.9623 5.54518 10.1026 5.68326 9.26502C5.82134 8.4274 6.20012 7.64805 6.77344 7.02197" stroke="#696969" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
</svg> Courses
        </li>
        <li>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
<path d="M11.875 16.8501V13.1001C11.875 12.9344 11.8092 12.7754 11.6919 12.6582C11.5747 12.541 11.4158 12.4751 11.25 12.4751H8.75C8.58424 12.4751 8.42527 12.541 8.30806 12.6582C8.19085 12.7754 8.125 12.9344 8.125 13.1001V16.8501C8.125 17.0159 8.05915 17.1749 7.94194 17.2921C7.82473 17.4093 7.66576 17.4751 7.5 17.4751H3.75C3.58424 17.4751 3.42527 17.4093 3.30806 17.2921C3.19085 17.1749 3.125 17.0159 3.125 16.8501V9.62358C3.1264 9.53708 3.14509 9.45174 3.17998 9.37258C3.21486 9.29342 3.26523 9.22204 3.32812 9.16264L9.57812 3.48296C9.69334 3.37755 9.84384 3.31909 10 3.31909C10.1562 3.31909 10.3067 3.37755 10.4219 3.48296L16.6719 9.16264C16.7348 9.22204 16.7851 9.29342 16.82 9.37258C16.8549 9.45174 16.8736 9.53708 16.875 9.62358V16.8501C16.875 17.0159 16.8092 17.1749 16.6919 17.2921C16.5747 17.4093 16.4158 17.4751 16.25 17.4751H12.5C12.3342 17.4751 12.1753 17.4093 12.0581 17.2921C11.9408 17.1749 11.875 17.0159 11.875 16.8501Z" stroke="#696969" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>  Homepage
        </li>
        <li className={` ${selectedPage === 'myaccount' ? 'activateding' : ''}`}  onClick={() => handleNavigationClick('myaccount')}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
<path d="M10 13.1001C12.7614 13.1001 15 10.8615 15 8.1001C15 5.33867 12.7614 3.1001 10 3.1001C7.23858 3.1001 5 5.33867 5 8.1001C5 10.8615 7.23858 13.1001 10 13.1001Z" stroke="#696969" stroke-width="1.5" stroke-miterlimit="10"/>
<path d="M2.42188 17.4751C3.18979 16.1447 4.2944 15.0399 5.62465 14.2718C6.9549 13.5037 8.46392 13.0994 10 13.0994C11.5361 13.0994 13.0451 13.5037 14.3753 14.2718C15.7056 15.0399 16.8102 16.1447 17.5781 17.4751" stroke="#696969" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg> My Account
        </li>
        <li>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
  <path d="M13.5938 7.31885L16.875 10.6001L13.5938 13.8813" stroke="#696969" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M8.125 10.6001H16.875" stroke="#696969" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M8.125 17.4751H3.75C3.58424 17.4751 3.42527 17.4093 3.30806 17.292C3.19085 17.1748 3.125 17.0159 3.125 16.8501V4.3501C3.125 4.18434 3.19085 4.02537 3.30806 3.90816C3.42527 3.79095 3.58424 3.7251 3.75 3.7251H8.125" stroke="#696969" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>   Logout
        </li>

    </ul>
</div>
    </div>
    <div className="main-std-dash">
    <div className="Mobile_Nav_Std">
<img src={logo} alt="complogo"/>
<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
  <path d="M6.25 20H33.75" stroke="#FBB723" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M6.25 10H33.75" stroke="#FBB723" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M6.25 30H33.75" stroke="#FBB723" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
    </div>
    {renderPage()}
    </div>
    </div>
  )
}
export default StudentNav