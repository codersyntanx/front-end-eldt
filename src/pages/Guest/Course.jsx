import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageBanner from "../../components/global/PageBanner";
import { useDispatch, useSelector } from "react-redux";
import { Translator, Translate } from "react-auto-translate";
import { formatDate, handleOpenClose } from "../../utils/helper";
import CoursesDetailsSidebar from "../../components/Courses/CoursesDetailsSidebar";
import WYSWYGData from "../../components/Courses/WYSWYGData";
import { Link } from "react-router-dom";
import OpenCloseItem from "../../components/Faq/openCloseItem";
import CourseVideo from "../../components/Courses/CourseVideo";
import {
  getCourseByIdForIns,
  getCourseLessons,
} from "../../services/Instructor";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";
import { USER_TYPE } from "../../routes/PrivateRoutes";
import InstructorProfile from "../../components/Courses/InstructorProfile";
import { getCourseByIdForAdmin } from "../../services/Admin";
import {
  getApprovedCourseById,
  getLessonsOfCourse,
} from "../../services/Guest";
import { LogoutUser } from "../../store/UserActions";
import TailwindLoader from "../../utils/tailwindLoader";

export default function Course() {
  const purchased = useSelector((state) => state.purchased);
  const navigate = useNavigate();

  const [lessons, setLessons] = useState([]);
  const [course, setCourse] = useState();
  const userState = useSelector((state) => state.user);
  const [cookies] = useCookies([]);
  const [loading, setLoading] = useState();
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const fetchCourseById = async () => {
    setLoading(true);
    if (userState?.user !== undefined) {
      const token = cookies.user;
      if (userState?.user?.type === USER_TYPE.INSTRUCTOR) {
        const lessonResult = await getCourseLessons(courseId, token);
        setLessons(lessonResult.lessons);
        const result = await getCourseByIdForIns(courseId, token);
        if (result.success) {
          JSON.stringify(result);
          setCourse(result.course);
        } else {
          if (result.message === "Token is not valid for User") {
            Swal.fire({
              title: "Session Expired",
              text: "User Session has been expired please login again",
            });
            dispatch(LogoutUser());
            navigate("/");

            return;
          }
          Swal.fire({ title: "Error in fetching Data", text: result.message });
        }
      } else if (userState.user.type === USER_TYPE.SUPER_ADMIN) {
        const result = await getCourseByIdForAdmin(courseId, token);
        if (result.success) {
          setCourse(result.course);
        } else {
          if (result.message === "Token is not valid for User") {
            Swal.fire({
              title: "Session Expired",
              text: "User Session has been expired please login again",
            });
            dispatch(LogoutUser());
            navigate("/");
            return;
          }
          Swal.fire({ title: "Error in fetching Data", text: result.message });
        }
      } else if (userState.user.type === USER_TYPE.STUDENT) {
        const result = await getApprovedCourseById(courseId);
        if (result.success) {
          setCourse(result.course);
        }
      }
    } else {
      const result = await getApprovedCourseById(courseId);
      if (result.success) {
        setCourse(result.course);
        const lessonResults = await getLessonsOfCourse();
        setLessons(lessonResults.lessons);
      } else {
        if (result.message === "Token is not valid for User") {
          Swal.fire({
            title: "Session Expired",
            text: "User Session has been expired please login again",
          });
          dispatch(LogoutUser());
          navigate("/");
          return;
        }
        Swal.fire({ title: "Error in fetching Data", text: result.message });
      }
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchCourseById();
  }, []);
  // const course = courses.find((course) => course.courseId === courseId);

  return (
    <>
      <PageBanner
        pageTitle={course?.name}
        homePageUrl="/"
        homePageText="Home"
        secondLevelText="Courses"
        secondLinks={"/courses/"}
        activePageText="Course"
      />
      {loading && (
        <div className="tw-flex tw-justify-center tw-p-10">
          <TailwindLoader />
        </div>
      )}
      {course && (
        <CourseDetails
          purchased={purchased}
          dispatch={dispatch}
          course={course}
          user={userState?.user}
          fetchCourseById={fetchCourseById}
          lessons={lessons || []}
        />
      )}
    </>
  );
}
const CourseDetails = ({
  is_class = false,
  course,
  user,
  fetchCourseById,
  activeClass = false,
  lessons,
  dispatch,
  purchased,
}) => {
  const languageState = useSelector((state) => state.language);
  const navigate = useNavigate();
  return (
    <>
      <Translator
        from="en"
        to={languageState?.language?.value || "en"}
        googleApiKey={import.meta.env.VITE_GOOGLE_TRANSLATE_KEY}
      >
        <div className="courses-details-area">
          <div className="container">
            <div className="courses-details-content">
              <div className="left-side">
                <div className="courses-details-image-style-two text-center">
                  <img src={"/images/item-course-title.png"} alt="image" />
                </div>

                <div className="courses-details-desc-style-two">
                  <div className="courses-title">
                    <h3 className="title">
                      {course.name}
                      {/* <Flag language={course.language} /> */}
                    </h3>
                    <p className="sub">
                      <Translate>{course.description}</Translate>
                    </p>
                  </div>
                  <div className="courses-meta">
                    <ul className="line-more-info">
                      <li className="item">
                        <span>
                          <Translate> Category</Translate>
                        </span>
                        {course?.learningType && (
                          <>
                            <Link
                              to={`/courses/category/${course.learningType}`}
                            >
                              <a>{course.learningType}</a>
                            </Link>
                          </>
                        )}
                      </li>
                      <li className="item">
                        <span>
                          <Translate> Students Enrolled </Translate>{" "}
                        </span>
                        <Link to="#">
                          <a>
                            {course?.enrolledStudents &&
                              course?.enrolledStudents.length}{" "}
                          </a>
                        </Link>
                      </li>
                      <li className="item">
                        <span>
                          <Translate>Last Updated</Translate>
                        </span>
                        <Link to="#">
                          <a>
                            {/* <Translate>{(course.updatedAt)}</Translate> */}
                            <Translate>
                              {formatDate(course.updatedAt)}
                            </Translate>
                          </a>
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div className="sidebar-details mobile">
                    <CoursesDetailsSidebar
                      purchasedCourses={purchased}
                      dispatch={dispatch}
                      fetchAgain={fetchCourseById}
                      // current_user={current_user}
                      course={course}
                    />
                  </div>

                  {/* <CourseOverview overview={overview} /> */}

                  <div className="courses-details-desc-style-two">
                    <h3
                      className="details-title"
                      onClick={(event) => handleOpenClose(event)}
                    >
                      <Translate>About this course</Translate>
                    </h3>
                    <div className="content-infos">
                      <ul
                        className=" open-close-info block-open-close"
                        style={{ border: "none" }}
                      >
                        <OpenCloseItem
                          title={<Translate>What you will learn?</Translate>}
                          text={
                            <Translate>
                              <div
                                className="details-content"
                                dangerouslySetInnerHTML={{
                                  __html: course.whatYouWillLearn,
                                }}
                              ></div>
                            </Translate>
                          }
                        />
                        <OpenCloseItem
                          title={<Translate>Requirements</Translate>}
                          text={
                            <Translate>
                              <div
                                className="details-content"
                                dangerouslySetInnerHTML={{
                                  __html: course.requirements,
                                }}
                              ></div>
                            </Translate>
                          }
                        />
                        <OpenCloseItem
                          title={<Translate>Who is this course for</Translate>}
                          text={
                            <Translate>
                              <div
                                className="details-content"
                                dangerouslySetInnerHTML={{
                                  __html: course.courseIsFor,
                                }}
                              ></div>
                            </Translate>
                          }
                        />
                      </ul>

                      {user &&
                        user?.type === USER_TYPE.INSTRUCTOR &&
                        user.id === course.createdBy && (
                          <>
                            <div className="tw-flex tw-justify-center tw-items-center tw-my-10">
                              <button
                                className="default-btn"
                                onClick={() => {
                                  navigate(
                                    `/instructor/course/${course?._id}/lesson/create`
                                  );
                                }}
                              >
                                Create A lesson
                              </button>
                            </div>
                          </>
                        )}
                      <div className="courses-details-desc-style-two">
                        <div className="course-video-list courses-curriculum">
                          <ul>
                            {lessons.map((lesson, index) => (
                              <li
                                key={lesson._id}
                                data-id={lesson._id}
                                className={
                                  activeClass === lesson._id
                                    ? "tw-cursor-pointer active"
                                    : "tw-cursor-pointer"
                                }
                                onClick={() => {
                                  if (
                                    user &&
                                    user?.type === USER_TYPE.INSTRUCTOR
                                  ) {
                                    navigate(
                                      `/instructor/course/lesson/edit/${lesson._id}`
                                    );
                                  }
                                }}
                              >
                                <div className="course-line">
                                  <div className="icon">
                                    <svg
                                      width="24"
                                      height="25"
                                      viewBox="0 0 24 25"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <g id="Frame 6749">
                                        <path
                                          id="Vector"
                                          d="M21.3844 11.4898L7.89375 3.23985C7.78018 3.16979 7.64998 3.13131 7.51658 3.12836C7.38318 3.12541 7.25141 3.1581 7.13486 3.22306C7.0183 3.28803 6.92119 3.38291 6.85354 3.49792C6.78589 3.61293 6.75015 3.74391 6.75 3.87735V20.3773C6.75015 20.5108 6.78589 20.6418 6.85354 20.7568C6.92119 20.8718 7.0183 20.9667 7.13486 21.0316C7.25141 21.0966 7.38318 21.1293 7.51658 21.1263C7.64998 21.1234 7.78018 21.0849 7.89375 21.0148L21.3844 12.7648C21.4952 12.6993 21.5869 12.6061 21.6507 12.4943C21.7145 12.3825 21.748 12.256 21.748 12.1273C21.748 11.9987 21.7145 11.8722 21.6507 11.7604C21.5869 11.6486 21.4952 11.5554 21.3844 11.4898V11.4898Z"
                                          stroke="currentColor"
                                          strokeWidth="2"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </g>
                                    </svg>
                                  </div>
                                  <span className="courses-name">
                                    <Translate>{lesson?.lessonName}</Translate>
                                  </span>
                                  <div className="courses-meta">
                                    <span className="duration">
                                      <Translate>{lesson?.time}</Translate>
                                    </span>
                                  </div>
                                  <div className="courses-right">
                                    {"".includes("selectedVideo") ||
                                    "short_id" in [0, 1] ? (
                                      <span className="status">
                                        <svg
                                          width="32"
                                          height="32"
                                          viewBox="0 0 32 32"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <g id="Frame 6753">
                                            <path
                                              id="Vector"
                                              d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z"
                                              stroke="#FBB723"
                                              strokeWidth="2"
                                              strokeMiterlimit="10"
                                            />
                                            <path
                                              id="Vector_2"
                                              d="M20 16L14 12V20L20 16Z"
                                              stroke="#FBB723"
                                              strokeWidth="2"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                            />
                                          </g>
                                        </svg>
                                      </span>
                                    ) : (
                                      <span
                                        className="status locked"
                                        title="Premium"
                                      >
                                        <svg
                                          width="32"
                                          height="33"
                                          viewBox="0 0 32 33"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <g id="Frame 6748">
                                            <path
                                              id="Vector"
                                              d="M26 11.6273H6C5.44772 11.6273 5 12.075 5 12.6273V26.6273C5 27.1796 5.44772 27.6273 6 27.6273H26C26.5523 27.6273 27 27.1796 27 26.6273V12.6273C27 12.075 26.5523 11.6273 26 11.6273Z"
                                              stroke="currentColor"
                                              strokeWidth="2"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                            />
                                            <path
                                              id="Vector_2"
                                              d="M11.5 11.6273V7.12732C11.5 5.93385 11.9741 4.78925 12.818 3.94534C13.6619 3.10143 14.8065 2.62732 16 2.62732C17.1935 2.62732 18.3381 3.10143 19.182 3.94534C20.0259 4.78925 20.5 5.93385 20.5 7.12732V11.6273"
                                              stroke="currentColor"
                                              strokeWidth="2"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                            />
                                            <path
                                              id="Vector_3"
                                              d="M16 21.1273C16.8284 21.1273 17.5 20.4557 17.5 19.6273C17.5 18.7989 16.8284 18.1273 16 18.1273C15.1716 18.1273 14.5 18.7989 14.5 19.6273C14.5 20.4557 15.1716 21.1273 16 21.1273Z"
                                              fill="currentColor"
                                            />
                                          </g>
                                        </svg>
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  {is_class && (
                    <div className="content-videos">
                      <h3
                        className="details-title"
                        onClick={(event) => handleOpenClose(event)}
                      >
                        <Translate>Courses Video</Translate>
                        <div className="open-close">
                          <svg
                            width="45"
                            height="46"
                            viewBox="0 0 45 46"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g id="Plus">
                              <path
                                id="Vector"
                                d="M14.7803 14.8497L30.2414 30.4061"
                                stroke="#2C292A"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                id="Vector_2"
                                d="M30.2412 14.8497L14.7801 30.4061"
                                stroke="#2C292A"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </g>
                          </svg>
                        </div>
                      </h3>
                      {slug && (
                        <CourseVideo
                          current_user={current_user}
                          course={course}
                        />
                      )}
                    </div>
                  )}

                  {/* {course?.createdBy && (
                    <div>
                      <InstructorProfile
                        instructor={course?.createdBy}
                        language={languageState?.language?.value}
                      />
                    </div>
                  )} */}
                </div>
              </div>

              <div className="right-side desktop">
                <CoursesDetailsSidebar
                  purchasedCourses={purchased}
                  dispatch={dispatch}
                  latest_price={course.price}
                  // current_user={current_user}
                  course={course}
                />
              </div>
            </div>
          </div>
        </div>
      </Translator>
    </>
  );
};
