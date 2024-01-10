import React, { useEffect, useState } from "react";
import PageBanner from "../../components/global/PageBanner";
import { formatDate } from "../../utils/helper";
import { Link } from "react-router-dom";
import { Translator, Translate } from "react-auto-translate";
import { useSelector } from "react-redux";
import { getMyResults } from "../../services/Student";
import { useCookies } from "react-cookie";

export default function MyCourseProgress() {
  const languageState = useSelector((state) => state.language);
  const userState = useSelector((state) => state.user);
  const [cookies] = useCookies([]);

  const fakeData = [
    {
      courseId: "6544913f0501d5c6ecc4b81c",
      courseName: "dummy",
      language: "en",
      joinedAt: "2023-11-03T15:50:33.981Z",
      percentage: 0,
      completed: 0,
      _id: "654516c984688f40eb858d6e",
    },
    {
      courseId: "652a3ce50a17cb16e43793e0",
      courseName: "ok",
      joinedAt: "2023-11-03T16:36:34.745Z",
      percentage: 75,
      completed: 25,
      _id: "65452192084e23d84e571dbb",
    },
  ];

  const [lessonResult, setLessonResult] = useState([]);
  const findLessonResult = async () => {
    const result = await getMyResults(userState.user.id, cookies.user);
    setLessonResult(result.courses);
  };
  useEffect(() => {
    findLessonResult();
  }, []);

  return (
    <>
      <PageBanner
        pageTitle="My Progress"
        homePageUrl="/"
        secondLevelText="Courses"
        secondLinks={"/courses/"}
        homePageText="Home"
        activePageText="Progress"
      />
      <Translator
        from="en"
        to={languageState?.language?.value}
        googleApiKey={import.meta.env.VITE_GOOGLE_TRANSLATE_KEY}
      >
        <div className="faq-area">
          <div className="container">
            <table className="tw-w-full  tw-text-left tw-text-gray-500 ">
              <thead className="tw-text-xs tw-text-gray-700 tw-uppercase tw-bg-gray-50 ">
                <tr>
                  <th scope="tw-col" className="tw-px-6 tw-py-3 tw-text-center">
                    <Translate>Course Name</Translate>
                  </th>
                  <th scope="tw-col" className="tw-px-6 tw-py-3 tw-text-center">
                    <Translate>Performance</Translate>
                  </th>
                  <th scope="tw-col" className="tw-px-6 tw-py-3 tw-text-center">
                    <Translate>Bar</Translate>
                  </th>

                  <th scope="tw-col" className="tw-px-6 tw-py-3 tw-text-center">
                    <Translate>Completed</Translate>
                  </th>
                  <th scope="tw-col" className="tw-px-6 tw-py-3 tw-text-center">
                    <Translate>Joined</Translate>
                  </th>
                  <th scope="tw-col" className="tw-px-6 tw-py-3 tw-text-center">
                    <Translate>Completed At</Translate>
                  </th>
                </tr>
              </thead>

              <tbody>
                {lessonResult.map((item) => (
                  <tr className="">
                    <td
                      scope="tw-col"
                      className="tw-px-6 tw-py-3 tw-text-center tw-underline"
                    >
                      <Link to={`/couse/${item?.courseName}`}>
                        <Translate>{item?.courseName}</Translate>
                      </Link>
                    </td>
                    <td
                      scope="tw-col"
                      className="tw-px-6 tw-py-3 tw-text-center"
                    >
                      {item?.percentage} %
                    </td>

                    <td scope="tw-col" className="tw-text-center  ">
                      <div className="tw-bg-gray-200 tw-rounded-full tw-h-2.5 ">
                        <div
                          className="tw-bg-yellow-600 tw-h-2.5 tw-rounded-full"
                          style={{
                            width: item?.completed,
                          }}
                        ></div>
                      </div>
                    </td>
                    <td
                      scope="tw-col"
                      className="tw-px-6 tw-py-3 tw-text-center"
                    >
                      {/* {item.completed} */}
                      {item?.completed}
                    </td>

                    <td
                      scope="tw-col"
                      className="tw-px-6 tw-py-3 tw-text-center"
                    >
                      {/* {item.completed} */}
                      {formatDate(item?.joinedAt)}
                    </td>

                    <td
                      scope="tw-col"
                      className="tw-px-6 tw-py-3 tw-text-center"
                    >
                      {item?.complete || "Not Completed"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Translator>
    </>
  );
}
