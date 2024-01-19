import { useEffect, useState } from "react";
import "./first.css";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { Link } from "react-router-dom";
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
      .get(`http://localhost:3003/api/student/${userId}/courses`)
      .then((res) => {
        setComp(res.data.completedCourses);
        setUncomp(res.data.uncompletedCourses);
      })
      .catch((error) => {
        console.error("Error fetching user info:", error);
      });
  };
  const chartData = {
    datasets: [
      {
        data: uncomp.map(course => course.completedChapters),
        backgroundColor: ['yellow', 'lightgrey', 'lightgrey', 'lightgrey', 'lightgrey'], // Add more colors as needed
      },
    ],
    labels: uncomp.map(course => course.courseName),
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
          .accordion{
            border-radius: 20px;
            border:none;
            margin-top:35px
          }
          .progress-bar-container {
            display: flex;
            align-items: center;
            overflow: hidden;
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
      <div className="main-contain-regist">
        <div className="card-head">My courses</div>
        <div className="card-body">
          <div class="accordion" id="accordionExample">
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingOne">
                <button
                  class="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  <label className="mainlabel">Courses - Actives</label>
                </button>
              </h2>
              <div
                id="collapseOne"
                class="accordion-collapse collapse"
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body">
                  <span>
                    {uncomp.map((course) => (
                      <>
                        <div className="progress-bar-container mainlabel d-flex align-items-center">
                         {course.studentProgress}
                          {course.courseName}
                          <Link to={`/StudentLesson/${course.courseNameid}`}>
                          <button className="btn btn-warning">Open</button></Link>

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
                  <label className="mainlabel">Courses - Actives</label>
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
                    {uncomp.map((course) => (
                      <>
                        <div className="progress-bar-container mainlabel d-flex align-items-center">
                         {course.studentProgress}
                          {course.courseName}
                          <Link to={`/quiz/${course.courseNameid}`}>
                          <button className="btn btn-warning">Open</button></Link>

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
