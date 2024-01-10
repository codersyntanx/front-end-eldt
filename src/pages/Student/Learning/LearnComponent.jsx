import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { Translator, Translate } from "react-auto-translate";

import axios from "axios";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";

import PageBanner from "../../../components/global/PageBanner";
import { formatDate, handleOpenClose } from "../../../utils/helper";
import WYSWYGData from "../../../components/Courses/WYSWYGData";
import OpenCloseItem from "../../../components/Faq/openCloseItem";
import CourseVideo from "../../../components/Courses/CourseVideo";
import {
  getCourseByIdForIns,
  getCourseLessons,
} from "../../../services/Instructor";
import { USER_TYPE } from "../../../routes/PrivateRoutes";
import InstructorProfile from "../../../components/Courses/InstructorProfile";
import { LogoutUser } from "../../../store/UserActions";
import { getApprovedCourseById } from "../../../services/Guest";
import { getCourseByIdForAdmin } from "../../../services/Admin";
import {
  attemptQuizMcq,
  getLessonQuiz,
  getLessonResults,
} from "../../../services/Student";

export default function LearnComponent() {
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
          const lessonApiResult = await getCourseLessons(courseId, token);
          setLessons(lessonApiResult.lessons);
          console.log("lessonApiResult", lessonApiResult.lessons);

          const resultOfLesson = await getLessonResults(
            courseId,
            userState.user.id,
            cookies.user
          );
          console.log("resultOfLesson", resultOfLesson.lessons);
          const lessonDataMap = resultOfLesson.lessons.reduce((acc, item) => {
            acc[item.lessonId] = item;
            return acc;
          }, {});
          const merged = lessonApiResult.lessons.map((item) => {
            const lessonId = item._id;
            if (lessonDataMap[lessonId]) {
              return {
                ...item,
                mcqsAttempted: lessonDataMap[lessonId].mcqsAttempted,
                percentage: lessonDataMap[lessonId].percentage,
                status: lessonDataMap[lessonId].status,
              };
            }
            return item;
          });
          console.log("merged", merged);
          setLessons(merged);
          // console.log(
          //   JSON.stringify(lessonResult.lessons[0].document[0].documentLink)
          // );

          // alert(console.log(lessonResult));
        }
      }
    } else {
      const result = await getApprovedCourseById(courseId);
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
    }
    setLoading(true);
  };

  useEffect(() => {
    fetchCourseById();
  }, []);

  return (
    <>
      {course && (
        <CourseDetails
          token={cookies?.user}
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
  token,
}) => {
  const [showAns, setShowAns] = useState(false);
  const [attempted, setAttempted] = useState(false);

  const [mcqs, setMcqs] = useState([]);
  const [answers, setAnswers] = useState([]);

  const handleOptionClick = (questionIndex, selectedOptionKey) => {
    const updatedMcqs = [...mcqs];
    updatedMcqs[questionIndex].ans = selectedOptionKey;
    setMcqs(updatedMcqs);
  };
  const [document, setDocument] = useState("");
  const [lessonId, setLessonId] = useState("");
  const [status, setStatus] = useState("");

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
                  {!document && <img src={"/images/preTrip.png"} alt="image" />}
                </div>
                <div style={{ maxHeight: "400px", overflow: "auto" }}>
                  <div
                    className="details-content"
                    dangerouslySetInnerHTML={{
                      __html: document,
                    }}
                  ></div>
                </div>

                <div className="courses-details-desc-style-two">
                  {/*  */}

                  {/* <CourseOverview overview={overview} /> */}
                  <div className="sidebar-details mobile">
                    <div className="courses-details-desc-style-two">
                      <div className="course-video-list courses-curriculum">
                        <ul>
                          {lessons.length == 0 ? (
                            <div>Content Will be uploaded</div>
                          ) : (
                            lessons.map((lesson, index) => (
                              <li
                                key={lesson._id}
                                data-id={lesson._id}
                                className={
                                  "tw-cursor-pointer" + activeClass ===
                                  lesson._id
                                    ? "active"
                                    : ""
                                }
                                onClick={async () => {
                                  if (lesson?.content) {
                                    setDocument(lesson?.content);
                                    setLessonId(lesson._id);
                                    if (
                                      user &&
                                      user?.type === USER_TYPE.STUDENT
                                    ) {
                                      const apiResult = await getLessonQuiz(
                                        lesson._id,
                                        course._id,
                                        user?.id,
                                        token
                                      );
                                      if (apiResult?.success) {
                                        setMcqs(apiResult.mcq);
                                        console.log(apiResult.mcq);
                                      }
                                    }
                                  } else {
                                    Swal.fire(
                                      "Document not uploaded for this Language"
                                    );
                                  }
                                }}
                              >
                                <div className="course-line">
                                  <div className="icon">
                                    <div className="">
                                      <input type="checkbox" name="" id="" />
                                    </div>
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
                                    {/*<Translate>{lesson?.lessonName}</Translate>*/}
                                  </span>
                                  <div className="courses-meta">
                                    <span className="duration">
                                      {/*<Translate>{lesson?.time}</Translate>*/}
                                    </span>
                                  </div>
                                  <div className="courses-right">
                                    {lesson?.status === "PASSED" ? (
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
                            ))
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* <div className="courses-details-desc-style-two">
                    <div
                      className="details-title flex "
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                      onClick={(event) => handleOpenClose(event)}
                    >
                      <div>
                        <Translate>Assets</Translate>
                      </div>
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="tw-w-6 tw-h-6 tw-text-black"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4.5v15m7.5-7.5h-15"
                          />
                        </svg>
                      </div>
                    </div>
                  </div> */}
                  {/* 
                  <div className="courses-details-desc-style-two">
                    <div
                      className="details-title flex "
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                      onClick={(event) => handleOpenClose(event)}
                    >
                      <div>
                        <Translate>Lesson test</Translate>
                      </div>
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="tw-w-6 tw-h-6 tw-text-black"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4.5v15m7.5-7.5h-15"
                          />
                        </svg>
                      </div>
                    </div>
                  </div> */}
                  {/* <div className="courses-details-desc-style-two">
                    <div
                      className="details-title flex "
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                      onClick={(event) => handleOpenClose(event)}
                    >
                      <div>
                        <Translate>Overview</Translate>
                      </div>
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="tw-w-6 tw-h-6 tw-text-black"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4.5v15m7.5-7.5h-15"
                          />
                        </svg>
                      </div>
                    </div>
                  </div> */}

                  {
                    <div className="courses-details-desc-style-two">
                      <div
                        className="details-title flex "
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                        onClick={(event) => handleOpenClose(event)}
                      >
                        <div>
                          <Translate>Questions</Translate>
                        </div>
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="tw-w-6 tw-h-6 tw-text-black"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 4.5v15m7.5-7.5h-15"
                            />
                          </svg>
                        </div>
                      </div>

                      <Translator
                        from="en"
                        to={languageState?.language?.value || "en"}
                        googleApiKey={import.meta.env.VITE_GOOGLE_TRANSLATE_KEY}
                      >
                        {showAns === false &&
                          mcqs.map((mcqItem, index) => (
                            <div
                              key={index}
                              className="mcq-card"
                              style={{
                                border: "2px solid #E8E8E8",
                                borderRadius: "12px",
                                marginTop: "15px",
                                padding: "20px",
                                marginBottom: "15px",
                              }}
                            >
                              <div className="mcq-question">
                                <span className="question-number ">
                                  {index + 1}:
                                </span>
                                <span className="tw-text-lg mx-3">
                                  <Translate>{mcqItem.question}</Translate>
                                </span>
                              </div>
                              <div className="mcq-options">
                                <div className=" tw-my-3">
                                  {mcqItem.options?.map(
                                    (option, OptionIndex) => (
                                      <div
                                        key={OptionIndex}
                                        onClick={() =>
                                          handleOptionClick(index, option.key)
                                        }
                                        className={`mcq-option tw-my-4 tw-rounded-md  tw-border-[2px] tw-p-2 ${
                                          mcqItem?.ans === option.key
                                            ? "tw-bg-[#FFE7B1]"
                                            : ""
                                        }`}
                                      >
                                        <span className="option-key tw-uppercase tw-font-bold">
                                          {option.key}:
                                        </span>
                                        <span
                                          className={`   tw-p-1 tw-px-4 mx-3  tw-rounded-md   tw-text-xl   `}
                                        >
                                          <Translate>{option.value}</Translate>
                                        </span>
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}

                        {mcqs.length > 0 && attempted === false && (
                          <div
                            className="tw-flex tw-items-center tw-justify-center tw-my-4 "
                            onClick={async () => {
                              const selectedAllAns = mcqs.every(
                                (item) => item.ans
                              );
                              if (selectedAllAns) {
                                // course._id,
                                const apiResult = await attemptQuizMcq(
                                  lessonId,
                                  course._id,
                                  mcqs,
                                  user.id,
                                  token
                                );
                                // const data = JSON.parse(apiResult);
                                // alert(JSON.stringify(apiResult));
                                const { answers } = apiResult.result;
                                // mcqs.map(); // get the selected option from this arrays of mcqs,  and add respectively to the answers array
                                const updatedAns = mcqs.map(
                                  (attemptedItem, index) => ({
                                    ...attemptedItem,
                                    answer: answers[index].answer,
                                  })
                                );
                                setAnswers(updatedAns);
                                setAttempted(true);
                                if (apiResult.result.percentage > 50) {
                                  Swal.fire({
                                    icon: "success",
                                    title: "You are Passed",
                                    text: `Percentage: ${apiResult.result.percentage}`,
                                  });
                                } else {
                                  Swal.fire({
                                    icon: "error",
                                    title: "You are failed",
                                    text: `Percentage: ${apiResult.result.percentage}`,
                                  });
                                }
                              } else
                                Swal.fire("please attempt all the questions");
                            }}
                          >
                            <button className="default-btn">Confirm</button>
                          </div>
                        )}
                        {showAns === true &&
                          answers.map((mcqItem, index) => (
                            <div
                              key={index}
                              className="mcq-card"
                              style={{
                                border: "2px solid #E8E8E8",
                                borderRadius: "12px",
                                marginTop: "15px",
                                padding: "20px",
                                marginBottom: "15px",
                              }}
                            >
                              <div className="mcq-question">
                                <span className="question-number ">
                                  {index + 1}:
                                </span>
                                <span className="tw-text-lg mx-3">
                                  <Translate>{mcqItem.question}</Translate>
                                </span>
                              </div>
                              <div className="mcq-options">
                                <div className=" tw-my-3">
                                  {mcqItem.options?.map(
                                    (option, OptionIndex) => (
                                      <div
                                        key={OptionIndex}
                                        className={`mcq-option tw-my-4 tw-rounded-md  tw-border-[2px] tw-p-2 ${
                                          mcqItem?.ans === option.key
                                            ? mcqItem?.ans == mcqItem?.answer
                                              ? "tw-bg-green-400"
                                              : "tw-bg-red-400"
                                            : ""
                                        }`}
                                      >
                                        <span className="option-key tw-uppercase tw-font-bold">
                                          {option.key}:
                                        </span>
                                        <span
                                          className={`   tw-p-1 tw-px-4 mx-3  tw-rounded-md   tw-text-xl   `}
                                        >
                                          <Translate>{option.value}</Translate>
                                        </span>
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        {attempted === true && (
                          <div
                            className="tw-flex tw-items-center tw-justify-center tw-my-4 "
                            onClick={() => {
                              // fetch answer from db
                            }}
                          >
                            <button
                              className="default-btn"
                              onClick={() => setShowAns(!showAns)}
                            >
                              Show Answers
                            </button>
                          </div>
                        )}
                      </Translator>
                    </div>
                  }

                  {!true && (
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
                            title={
                              <Translate>Who is this course for</Translate>
                            }
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
                      </div>
                    </div>
                  )}
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
                <div className="courses-details-desc-style-two">
                  <div className="course-video-list courses-curriculum">
                    <ul>
                      {lessons.map((lesson, index) => (
                        <li
                          key={lesson._id}
                          data-id={lesson._id}
                          className={
                            "tw-cursor-pointer" + activeClass === lesson._id
                              ? "active"
                              : ""
                          }
                          onClick={async () => {
                            if (lesson?.content) {
                              const mainContent = await axios.get(
                                `${lesson?.content}`
                              );

                              setDocument(mainContent.data);
                              setLessonId(lesson._id);
                              if (user && user?.type === USER_TYPE.STUDENT) {
                                const apiResult = await getLessonQuiz(
                                  lesson._id,
                                  course._id,
                                  user?.id,
                                  token
                                );
                                if (apiResult?.success) {
                                  setMcqs(apiResult.mcq);
                                  console.log(apiResult.mcq);
                                }
                              }
                            } else {
                              Swal.fire(
                                "Document not uploaded for this Language"
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
                              {lesson.status === "PASSED" ? (
                                <span className="status">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="32"
                                    height="32"
                                    fill="currentColor"
                                    className="bi bi-check-lg"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                                  </svg>
                                </span>
                              ) : (
                                <span className="status locked" title="Premium">
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
          </div>
        </div>
      </Translator>
    </>
  );
};
