import React, { useEffect, useState } from "react";
import PageBanner from "../../../components/global/PageBanner";
import { getStudents, markVerifiedStudent } from "../../../services/Admin";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";
import GeneralLoader from "../../../utils/generalLoader";
import { formatDate } from "../../../utils/helper";
import { useSelector } from "react-redux";

export default function AllStudents() {
  const [loading, setLoading] = useState(true);
  const [cookies] = useCookies([]);
  const languageState = useSelector((state) => state.language);
  const userState = useSelector((state) => state.user);

  const [students, setStudents] = useState([]);
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
  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <>
      <PageBanner
        pageTitle="Students"
        homePageUrl="/"
        homePageText="Home"
        activePageText="Students"
      />
      <div className="faq-area">
        <div className="container">
          {loading && <GeneralLoader />}

          <div className="tw-relative tw-overflow-x-auto">
            <table className="tw-w-full tw-text-left tw-text-gray-500 ">
              <thead className="tw-text-xs tw-text-gray-700 tw-uppercase tw-bg-gray-50 ">
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
