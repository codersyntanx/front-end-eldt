import React, { useEffect, useState } from "react";
import PageBanner from "../../../components/global/PageBanner";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { getMyCourses } from "../../../services/Instructor";
import { Translator, Translate } from "react-auto-translate";

import Swal from "sweetalert2";
import ShortingDropdown from "../../../components/Courses/ShortingDropdown";
import { USER_TYPE } from "../../../routes/PrivateRoutes";
import CourseSkeletonLoader from "../../../components/Courses/CourseSkeletonLoader";
import CourseItem from "../../../components/Courses/CourseItem";
import { LogoutUser } from "../../../store/UserActions";
const MyCreatedCourses = ({ hide }) => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [cookies] = useCookies([]);
  const languageState = useSelector((state) => state.language);
  const [loading, setLoading] = useState(true);
  const [coursesCount, setCoursesCount] = useState(0);
  const [courses, setCourses] = useState([]);
  const fetchCourses = async () => {
    setLoading(true);
    const result = await getMyCourses(userState.user.id, cookies.user);
    if (result.success) {
      setCourses(result.course);
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

      Swal.fire("Error In  fetching courses", result.message);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchCourses();
  }, []);
  return (
    <Translator
      from="en"
      to={languageState?.language?.value || "en"}
      googleApiKey={import.meta.env.VITE_GOOGLE_TRANSLATE_KEY}
    >
      <div className="courses-area courses-section">
        <div className="container">
          {/* <div className="line-filters">
            <span>
              <Translate>Filters:</Translate>
            </span>
            <div className="item-filter">
              <ShortingDropdown />
            </div>
            {userState?.user?.type === USER_TYPE.INSTRUCTOR && (
              <button
                className="default-btn px-2 mx-3"
                onClick={() => {
                  navigate("/instructor/course/create");
                }}
              >
                Create new Course
              </button>
            )}
          </div> */}

          <div
            className="courses-area-list"
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              gap: "3rem",
              flexWrap: "wrap",
            }}
          >
            {loading ? (
              <CourseSkeletonLoader />
            ) : (
              <>
                {courses &&
                  courses.map((course, index) => (
                    <React.Fragment key={index}>
                      <CourseItem
                        hide={hide}
                        userType={userState?.user?.type}
                        userId={userState.user.id}
                        index={index}
                        key={course.id}
                        {...course}
                      />
                    </React.Fragment>
                  ))}
                {coursesCount > 9 && (
                  <div className="pagination-area text-center">
                    <Pagination sizes={[1]} total={pages} />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </Translator>
  );
};
export default function CoursesCreated() {
  return (
    <>
      <PageBanner
        pageTitle="CoursesCreated"
        homePageUrl="/"
        homePageText="Home"
        secondLevelText="Courses"
        secondLinks={"/courses/"}
        activePageText="Created"
      />
      <MyCreatedCourses hide={true} />
    </>
  );
}
