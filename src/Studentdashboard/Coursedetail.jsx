import { useEffect, useState } from "react";
import "./first.css";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { Link } from "react-router-dom";
import { Progress, Space } from 'antd';

function Coursedetail() {
  const [userId, setUserId] = useState("");
  const [comp, setComp] = useState([]);
  const [uncomp, setUncomp] = useState([]);

  useEffect(() => {
    const personId = localStorage.getItem("userId");
    if (personId) {
      const decoded = jwtDecode(personId);
      setUserId(decoded.id);
      fetchUserInfo();
    }
  }, [userId]);

  const fetchUserInfo = () => {
    axios
      .get(`https://server-of-united-eldt.vercel.app/api/student/${userId}/courses`)
      .then((res) => {
        setComp(res.data.completedCourses);
        setUncomp(res.data.uncompletedCourses);
      })
      .catch((error) => {
        console.error("Error fetching user info:", error);
      });
  };

  return (
    <div>
      <style>
        {`
          .accordion-button:focus {
            box-shadow: none;
            border-radius: 16px;
            background: #F5F5F5;
          } 
          .accordion-button{
            box-shadow: none;
            border-radius: 16px;
            background: #F5F5F5;
          }
         
          .accordion-item{
            border-radius: 16px;
            border:none;
            background: #F5F5F5;
          }
         
         
          .progress-bar {
            height: 20px;
            border-radius: 10px;
            background: grey;
          }
          .progress-fill {
            height: 100%;
            background: yellow;
          }
          .chart-container {
            position: relative;
            width: 100; // Adjust as needed
            height: 100px; // Adjust as needed
          }
        `}
      </style>
      <div className="backbtn">
           <Link to="/">
                  <span className="bolding"><i class="fa-solid fa-arrow-left-long"></i><span className="mx-2">Back</span> </span>

        </Link>
      </div>
   
      <div className="main-contain-regist">
        <div className="card-head">My courses</div>
        <div className="card-body">
        <div class="accordion" id="accordionExample">
    <div class="accordion-item">
        <h2 class="accordion-header" id="headingOne">
            <div class="accordion-button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                <label className="mainlabel">Courses - Actives</label>
                <i class="accordion-arrow fas fa-chevron-down"></i> 
            </div>
        </h2>
        <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
            <div class="accordion-body">
                <span>
                    {uncomp.map((course,index) => (
                        <>
                            <div className="progress-bar-container mainlabel">
                                <div>
                                    <Space wrap>
                                        <Progress
                                            type="circle"
                                            percent={parseFloat(course.studentProgress)}
                                            size={80}
                                            strokeColor="#FBB723"  // Change color to #FBB723
                                            strokeWidth={20}       // Increase thickness to 10 (you can adjust this value)
                                            format={() => null}
                                        />
                                    </Space>
                                    <span className="mx-3">{course.courseName} - {course.courselangugae}</span>
                                </div>
                                <Link to={`/Alllessons/${course.enrollindex}`}>
                                    <div className="warning">Open</div>
                                </Link>
                            </div>
                        </>
                    ))}
                </span>
            </div>
        </div>
    </div>
</div>

          <div class="accordion" id="accordionExample">
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingtwo">
                <button
                  class="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapsetwo"
                  aria-expanded="true"
                  aria-controls="collapsetwo"
                >
                  <label className="mainlabel">Quizzes</label>
                  <i class="accordion-arrow fas fa-chevron-down"></i> 

                </button>
              </h2>
              <div
                id="collapsetwo"
                class="accordion-collapse collapse"
                aria-labelledby="headingtwo"
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body">
                  <span>
                    {uncomp.map((course,index) => (
                      <>
                        <div className="progress-bar-container mainlabel">
                <div>     <Space wrap>
  <Progress
    type="circle"
    percent={parseFloat(course.studentProgress)}
    size={80}
    strokeColor="#FBB723"  // Change color to #FBB723
    strokeWidth={20}       // Increase thickness to 10 (you can adjust this value)
    format={() => null}
  />
</Space>
<span className="mx-3">{course.courseName} - {course.courselangugae}</span>  


                          </div>   
                          <Link to={`/quiz/${course.enrollindex}`}>
                          <div className="warning">Open</div></Link>
                        </div>
                      </>
                    ))}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="accordion" id="accordionExample">
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingthree">
                <button
                  class="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapsethree"
                  aria-expanded="true"
                  aria-controls="collapsethree"
                >
                  <label className="mainlabel">Courses - Completed</label>
                  <i class="accordion-arrow fas fa-chevron-down"></i> 

                </button>
              </h2>
              <div
                id="collapsethree"
                class="accordion-collapse collapse"
                aria-labelledby="collapsethree"
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body">
                  <span>
                    {comp.map((course) => (
                      <>
                        <div className="progress-bar-container mainlabel ">
                     <div>  <Space wrap>
  <Progress
    type="circle"
    percent={parseFloat(course.studentProgress)}
    size={80}
    strokeColor="#FBB723"  // Change color to #FBB723
    strokeWidth={20}       // Increase thickness to 10 (you can adjust this value)
    format={() => null}
  />
</Space>
<span className="mx-3">{course.courseName} - {course.courselangugae}</span>  
   

                          </div> 
                          <Link to={`/quiz/${course.courseNameid}`}>
                          <div className="warning">Certificate</div></Link>
                        </div>
                      </>
                    ))}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Coursedetail;
