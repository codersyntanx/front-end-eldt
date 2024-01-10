import React, { useEffect, useState } from "react";
import { getCourses, updateCourseStatsByAdmin } from "../../../services/Admin";
import { useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import PageBanner from "../../../components/global/PageBanner";
import GeneralLoader from "../../../utils/generalLoader";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { formatDate } from "../../../utils/helper";

export default function AllCourses() {
  const languageState = useSelector((state) => state.language);
  const [loading, setLoading] = useState(true);
  const [cookies] = useCookies([]);

  const userState = useSelector((state) => state.user);
  const [courses, setCourses] = useState([]);
  const fetchCourses = async () => {
    setLoading(true);
    const result = await getCourses(cookies.user);
    setCourses(result.courses);
    setLoading(false);
  };
  useEffect(() => {
    fetchCourses();
  }, []);
  return (
    <>
      <PageBanner
        pageTitle="Courses"
        homePageUrl="/"
        homePageText="Home"
        activePageText="Courses"
      />

      <div className="faq-area">
        <div className="container">{loading && <GeneralLoader />}</div>
        <div className="tw-relative tw-overflow-x-auto">
          <table className="tw-w-full tw-text-left tw-text-gray-500 ">
            <thead className="tw-text-xs tw-text-gray-700 tw-uppercase tw-bg-gray-50 ">
              <tr>
                <th scope="tw-col" className="tw-px-6 tw-py-3">
                  Name
                </th>
                <th scope="tw-col" className="tw-px-6 tw-py-3">
                  Type
                </th>
                <th scope="tw-col" className="tw-px-6 tw-py-3">
                  Status
                </th>
                <th scope="tw-col" className="tw-px-6 tw-py-3">
                  Instructor
                </th>
                <th scope="tw-col" className="tw-px-6 tw-py-3">
                  Completed
                </th>
                <th scope="tw-col" className="tw-px-6 tw-py-3">
                  Enrolled
                </th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course, index) => (
                <tr key={index}>
                  <th scope="tw-col" className="tw-px-6 tw-py-3 tw-underline">
                    <Link to={`/course/${course._id}`}>{course?.name}</Link>
                  </th>
                  <th scope="tw-col" className="tw-px-6 tw-py-3">
                    {course?.learningType}
                  </th>
                  {
                    <th
                      scope="tw-col"
                      className={`tw-px-6 tw-py-3 tw-cursor-pointer ${
                        course?.status == "DRAFT"
                          ? "hover:tw-text-green-500"
                          : "hover:tw-text-yellow-500"
                      }`}
                      onClick={async () => {
                        if (
                          course?.status === "DRAFT" ||
                          course?.status == "APPROVAL_REQUIRED"
                        ) {
                          Swal.fire({
                            title: "Accept or Reject?",
                            text: "Do you want to accept or reject this request?",
                            icon: "question",
                            showCancelButton: true, // Display the "Cancel" button
                            confirmButtonText: "Accept", // Text for the "Accept" button
                            // cancelButtonText: "Reject", // Text for the "Reject" button
                            allowOutsideClick: true,
                            denyButtonText: "Reject",
                            showDenyButton: true,
                          }).then(async (result) => {
                            let apiResult;
                            if (result.isConfirmed) {
                              apiResult = await updateCourseStatsByAdmin(
                                course._id,
                                "ACTIVE",
                                cookies.user
                              );

                              if (apiResult.success) {
                                Swal.fire(
                                  "Approved!",
                                  "Course has been Approved.",
                                  "success"
                                );
                                fetchCourses();
                              } else {
                                Swal.fire(
                                  "Error!",
                                  "Course not approved.",
                                  "error"
                                );
                              }
                            } else if (result.isDenied) {
                              apiResult = await updateCourseStatsByAdmin(
                                course._id,
                                "REJECTED",
                                cookies.user
                              );
                              if (apiResult.success) {
                                Swal.fire(
                                  "Rejected",
                                  "Course has been rejected",
                                  "success"
                                );
                                fetchCourses();
                              } else {
                                Swal.fire(
                                  "Error",
                                  "Course was not rejected",
                                  "error"
                                );
                              }
                            }
                          });
                        }
                      }}
                    >
                      {course?.status}
                    </th>
                  }
                  <th scope="tw-col" className="tw-px-6 tw-py-3">
                    {course?.creatorName}
                  </th>
                  <th scope="tw-col" className="tw-px-6 tw-py-3">
                    {course?.completedBy.length}
                  </th>
                  <th scope="tw-col" className="tw-px-6 tw-py-3">
                    {course?.enrolledStudents.length}
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
