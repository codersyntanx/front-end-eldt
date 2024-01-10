import React from "react";
import PageBanner from "../../../components/global/PageBanner";
import CourseCreateForm from "../../../components/Courses/CourseCreateForm";
import InstructorAccountHeader from "../../../components/common/InstructorAccountHeader";

export default function CreateCourses() {
  return (
    <>
      <PageBanner
        pageTitle="Create a Course"
        homePageUrl="/"
        homePageText="Home"
        secondLevelText="Courses"
        secondLinks={"/courses/"}
        activePageText="Create a Course"
      />

      <div className="create-course">
        <div className="container">
          <InstructorAccountHeader url="/instructor/course/create/" />

          <div className="create-course-form">
            <CourseCreateForm />
          </div>
        </div>
      </div>
    </>
  );
}
