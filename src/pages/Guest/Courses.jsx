import React from "react";
import PageBanner from "../../components/global/PageBanner";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Translator, Translate } from "react-auto-translate";
import ShortingDropdown from "../../components/Courses/ShortingDropdown";
import CourseSkeletonLoader from "../../components/Courses/CourseSkeletonLoader";
import CourseItem from "../../components/Courses/CourseItem";
import { USER_TYPE } from "../../routes/PrivateRoutes";
import { useNavigate } from "react-router-dom";
import { getApprovedCourses } from "../../services/Guest";
import { LogoutUser } from "../../store/UserActions";
import { useCookies } from "react-cookie";

const CoursesDash = () => {
  const dispatch = useDispatch();
  const [cookies] = useCookies([]);

  const userState = useSelector((state) => state.user);

  const wishListState = useSelector((state) => state.wishList);
  // const wishListState = useSelector((state) => state.puc);
  const purchased = useSelector((state) => state.purchased);

  const navigate = useNavigate();

  const languageState = useSelector((state) => state.language);
  const [courses, setCourses] = useState([]);

  const [loading, setLoading] = useState(true);
  const [coursesCount, setCoursesCount] = useState(0);
  const fetchApprovedCourses = async () => {
    const data = await getApprovedCourses();
    if (data.success) {
      setCourses(data.courses);
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
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchApprovedCourses();
  });

  return (
    <>
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
              className="courses-area-list "
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
                          purchased={purchased}
                          token={cookies.user}
                          wishList={wishListState}
                          userType={userState?.user?.type}
                          userId={userState?.user?.id}
                          index={index}
                          dispatch={dispatch}
                          key={course.id}
                          {...course}
                        />
                      </React.Fragment>
                    ))}

                  {/* {coursesCount > 9 && (
                    <div className="pagination-area text-center">
                      <Pagination sizes={[1]} total={pages} />
                    </div>
                  )} */}
                </>
              )}
            </div>
          </div>
        </div>
      </Translator>
    </>
  );
};
export default function Courses() {
  return (
    <>
      <PageBanner
        pageTitle="Courses"
        homePageUrl="/"
        homePageText="Home"
        activePageText="Courses"
      />

      <CoursesDash />
    </>
  );
}
