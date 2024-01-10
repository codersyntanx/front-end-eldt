import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageBanner from "../../../components/global/PageBanner";
import { getApprovedCourseById } from "../../../services/Guest";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { getLessonsByCourseId } from "../../../services/Student";
import LearnComponent from "./LearnComponent";

export default function LearnCourse() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [cookies] = useCookies([]);
  const dispatch = useDispatch();
  const [course, setCourse] = useState();
  const [lessons, setLessons] = useState([]);
  const [mcq, setMcq] = useState([]);

  const fetchCourseAndLessons = async () => {
    const apiResult = await getApprovedCourseById(courseId);
    if (apiResult?.success) {
      setCourse(apiResult.course);
    }
    const lessonApiResult = await getLessonsByCourseId(courseId, cookies.user);
    if (lessonApiResult?.success) {
      setLessons(apiResult.lessons);
    }
  };
  useEffect(() => {
    fetchCourseAndLessons();
  }, []);
  return (
    <>
      <PageBanner
        pageTitle="Learning"
        homePageUrl="/"
        homePageText="Home"
        secondLevelText="Course"
        secondLinks={"/course/" + courseId}
        activePageText="Learning"
      />
      <LearnComponent />
      {/* {JSON.stringify(courseId)} */}
    </>
  );
}
