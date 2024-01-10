import React, { useEffect, useState } from "react";
import PageBanner from "../../../components/global/PageBanner";
import InstructorAccountHeader from "../../../components/common/InstructorAccountHeader";
import CourseCreateForm from "../../../components/Courses/CourseCreateForm";
import { useNavigate, useParams } from "react-router-dom";
import { getCourseByIdForIns } from "../../../services/Instructor";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";
import CourseEditForm from "../../../components/Courses/CourseEditForm";

export default function EditCourses() {
  const navigate = useNavigate();
  const [cookies] = useCookies([]);
  const [loading, setLoading] = useState();

  return (
    <>
      <PageBanner
        pageTitle="Edit a Course"
        homePageUrl="/"
        homePageText="Home"
        activePageText="Course"
      />
      <div className="create-course">
        <div className="container">
          <InstructorAccountHeader url="/instructor/course/edit/" />

          <div className="create-course-form">
            <CourseEditForm />
          </div>
        </div>
      </div>
    </>
  );
}
