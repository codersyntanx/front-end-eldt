import React, { useEffect, useState } from "react";
import PageBanner from "../../../components/global/PageBanner";
import {
  getInstructors,
  makeTeacherActive,
  markVerifiedTeacher,
} from "../../../services/Admin";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";
import GeneralLoader from "../../../utils/generalLoader";
import { formatDate } from "../../../utils/helper";
import { useSelector } from "react-redux";

export default function AllInstructors() {
  const languageState = useSelector((state) => state.language);

  const userState = useSelector((state) => state.user);
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cookies] = useCookies([]);
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
    fetchInstructors();
  }, []);
  return (
    <>
      <PageBanner
        pageTitle="Instructors"
        homePageUrl="/"
        homePageText="Home"
        activePageText="Instructors"
      />

      <div className="faq-area">
        <div className="container">
          {loading && <GeneralLoader />}

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
      </div>
    </>
  );
}
