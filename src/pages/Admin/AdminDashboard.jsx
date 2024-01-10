import React, { useEffect, useState } from "react";
import PageBanner from "../../components/global/PageBanner";
import { Translator, Translate } from "react-auto-translate";
import { useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import {
  getCourses,
  updateCourseStatsByAdmin,
  getStudents,
  getInstructors,
} from "../../services/Admin.js";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import GeneralLoader from "../../utils/generalLoader.jsx";
import { formatDate } from "../../utils/helper.jsx";

const Dashboard = () => {
  const languageState = useSelector((state) => state.language);

  return (
    <>
      <Translator
        from="en"
        to={languageState?.language?.value || "en"}
        googleApiKey={import.meta.env.VITE_GOOGLE_TRANSLATE_KEY}
      ></Translator>
    </>
  );
};

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [cookies] = useCookies([]);
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const fetchCourses = async () => {
    setLoading(true);
    const result = await getCourses(cookies.user);
    setCourses(result.courses);
    setLoading(false);
  };

  const fetchStudents = async () => {
    const cookie = cookies.user;
    const data = await getStudents(cookie);
    if (data.success) {
      setStudents(data.students);
    } else {
      Swal.fire({ title: "Error", text: data?.message });
    }
    setLoading(false);
  };

  const fetchInstructors = async () => {
    setLoading(true);
    const cookie = cookies.user;
    const data = await getInstructors(cookie);
    if (data.success) {
      setInstructors(data.teachers);
    } else {
      Swal.fire({ title: "Error", text: data?.message });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCourses();
    fetchStudents();
    fetchInstructors();
  }, []);

  return (
    <>
      <PageBanner
        pageTitle="Dashboard"
        homePageUrl="/"
        homePageText="Home"
        activePageText="Dashboard"
      />

      <div className="container p-5">
        <div className="stat-courses py-4">
          <div className="lg:tw-flex tw-flex-wrap">
            <div className="tw-rounded-lg tw-border-2 tw-p-4 tw-h-40 lg:tw-w-1/3 tw-w-full mb-4 lg:mb-0">
              <div className="tw-text-2xl tw-text-center tw-font-bold mb-2">
                Total Students
              </div>
              <div className="tw-text-4xl tw-text-center tw-font-bold">
                {students.length}
              </div>
            </div>
            <div className="tw-rounded-lg tw-border-2 tw-p-4 tw-h-40 lg:tw-w-1/3 tw-w-full mb-4 lg:mb-0">
              <div className="tw-text-2xl tw-text-center tw-font-bold mb-2">
                Total Courses
              </div>
              <div className="tw-text-4xl tw-text-center tw-font-bold">
                {courses.length}
              </div>
            </div>
            <div className="tw-rounded-lg tw-border-2 tw-p-4 tw-h-40 lg:tw-w-1/3 tw-w-full">
              <div className="tw-text-2xl tw-text-center tw-font-bold mb-2">
                Total Teachers
              </div>
              <div className="tw-text-4xl tw-text-center tw-font-bold">
                {teachers.length}
              </div>
            </div>
          </div>

          <h1 className="py-3"> Stats of Courses</h1>
          <div className="tw-relative tw-overflow-x-auto">
            <table className="tw-w-full tw-text-left tw-text-gray-500 ">
              <thead className="tw-text-xs tw-text-gray-50 tw-uppercase tw-bg-[#292929]  ">
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

        <div className="stat-instructors py-4">
          <h1 className="py-3"> Stats of Instructors</h1>

          <div className="tw-relative tw-overflow-x-auto">
            <table className="tw-w-full tw-text-left tw-text-gray-500 ">
              <thead className="tw-text-xs tw-text-gray-50 tw-uppercase tw-bg-[#292929]  ">
                <tr>
                  <th scope="tw-col" className="tw-px-6 tw-py-3 ">
                    userName
                  </th>
                  <th scope="tw-col" className="tw-px-6 tw-py-3">
                    email
                  </th>
                  <th scope="tw-col" className="tw-px-6 tw-py-3">
                    active
                  </th>
                  <th scope="tw-col" className="tw-px-6 tw-py-3">
                    blocked
                  </th>
                  <th scope="tw-col" className="tw-px-6 tw-py-3">
                    verified
                  </th>
                  <th scope="tw-col" className="tw-px-6 tw-py-3">
                    Joined At
                  </th>
                  <th scope="tw-col" className="tw-px-6 tw-py-3 ">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {instructors.map((ins, index) => (
                  <tr key={index}>
                    <th scope="tw-col" className="tw-px-6 tw-py-3">
                      {ins?.userName}
                    </th>
                    <th scope="tw-col" className="tw-px-6 tw-py-3">
                      {ins?.email}
                    </th>
                    <th
                      scope="tw-col"
                      className="tw-px-6 tw-py-3 tw-cursor-pointer"
                      onClick={() => {
                        if (!ins?.active) {
                          Swal.fire({
                            title: `Are you really want to approve ${ins.userName} as Active Instructor?`,
                            showCancelButton: true,
                            confirmButtonText: "Save",
                            showLoaderOnConfirm: true,
                            allowOutsideClick: () => !Swal.isLoading(),
                          }).then(async (result) => {
                            if (result.isConfirmed) {
                              const cookie = cookies.user;
                              const data = await makeTeacherActive(
                                cookie,
                                ins._id,
                                userState.user.id
                              );
                              if (data.success) {
                                fetchInstructors();

                                Swal.fire("Activation Successful");
                              } else {
                                Swal.fire("Activation Failed");
                              }
                            }
                          });
                        }
                      }}
                    >
                      {ins?.active ? "🟢" : "🔴"}
                    </th>
                    <th scope="tw-col" className="tw-px-6 tw-py-3">
                      {ins?.blocked ? "🔴" : "🟢"}
                    </th>
                    <th
                      scope="tw-col"
                      className="tw-px-6 tw-py-3 tw-cursor-pointer"
                      onClick={() => {
                        if (!ins?.verified) {
                          Swal.fire({
                            title: `Are you really want to approve ${ins.userName} as Verified Instructor?`,
                            showCancelButton: true,
                            confirmButtonText: "Save",
                            showLoaderOnConfirm: true,
                            allowOutsideClick: () => !Swal.isLoading(),
                          }).then(async (result) => {
                            if (result.isConfirmed) {
                              const cookie = cookies.user;
                              const data = await markVerifiedTeacher(
                                cookie,
                                ins._id,
                                userState.user.id
                              );
                              if (data.success) {
                                fetchInstructors();

                                Swal.fire("Activation Successful");
                              } else {
                                Swal.fire("Activation Failed");
                              }
                            }
                          });
                        }
                      }}
                    >
                      {ins?.verified ? "✅" : "❌"}
                    </th>
                    <th scope="tw-col" className="tw-px-6 tw-py-3">
                      {formatDate(ins?.createAt)}
                    </th>
                    <th scope="tw-col" className="tw-px-6 tw-py-3">
                      Actions
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="stat-students py-4">
          <h1 className="py-3"> Stats of Students</h1>

          <div className="tw-relative tw-overflow-x-auto">
            <table className="tw-w-full tw-text-left tw-text-gray-500 ">
              <thead className="tw-text-xs tw-text-gray-50 tw-uppercase tw-bg-[#292929]  ">
                <tr>
                  <th scope="tw-col" className="tw-px-6 tw-py-3">
                    userName
                  </th>
                  <th scope="tw-col" className="tw-px-6 tw-py-3">
                    email
                  </th>

                  <th scope="tw-col" className="tw-px-6 tw-py-3">
                    blocked
                  </th>
                  <th scope="tw-col" className="tw-px-6 tw-py-3">
                    verified
                  </th>
                  <th scope="tw-col" className="tw-px-6 tw-py-3">
                    Courses Purchased
                  </th>

                  <th scope="tw-col" className="tw-px-6 tw-py-3">
                    Joined At
                  </th>
                  <th scope="tw-col" className="tw-px-6 tw-py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {students?.map((student, index) => (
                  <tr key={index}>
                    <th scope="tw-col" className="tw-px-6 tw-py-3">
                      {student?.userName}
                    </th>
                    <th scope="tw-col" className="tw-px-6 tw-py-3">
                      {student?.email}
                    </th>

                    <th scope="tw-col" className="tw-px-6 tw-py-3">
                      {student?.blocked ? "🔴" : "🟢"}
                    </th>
                    <th
                      scope="tw-col"
                      className="tw-px-6 tw-py-3 tw-cursor-pointer"
                      onClick={() => {
                        if (!student?.verified) {
                          Swal.fire({
                            title: `Are you really want to approve ${student.userName} as verified user ?`,
                            showCancelButton: true,
                            confirmButtonText: "Save",
                            showLoaderOnConfirm: true,
                            allowOutsideClick: () => !Swal.isLoading(),
                          }).then(async (result) => {
                            if (result.isConfirmed) {
                              const apiResult = await markVerifiedStudent(
                                cookies.user,
                                student._id,
                                userState.user.id
                              );
                              if (apiResult.success) {
                                Swal.fire(
                                  "Student Verification has been updated"
                                );
                                fetchStudents();
                              } else {
                                Swal.fire(
                                  "Student Verification",
                                  "Verification Failed",
                                  "success"
                                );
                              }
                            }
                          });
                        }
                      }}
                    >
                      {student?.verified ? "✅" : "❌"}
                    </th>
                    <th scope="tw-col" className="tw-px-6 tw-py-3">
                      {student?.enrolledCourses?.length}
                    </th>

                    <th scope="tw-col" className="tw-px-6 tw-py-3">
                      {formatDate(student?.createAt)}
                    </th>
                    <th scope="tw-col" className="tw-px-6 tw-py-3"></th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
