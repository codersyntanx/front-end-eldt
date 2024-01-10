import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PageBanner from "../../../components/global/PageBanner";
import CourseSkeletonLoader from "../../../components/Courses/CourseSkeletonLoader";
import {
  getPurchasedCourses,
  getPurchasedCoursesDetailed,
} from "../../../services/Student";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { LogoutUser } from "../../../store/UserActions";
import CourseItem from "../../../components/Courses/CourseItem";
const PurchasedCoursesComponent = () => {
  const [cookies] = useCookies();
  const navigate = useNavigate();
  const wishListState = useSelector((state) => state.wishList);
  const purchasedState = useSelector((state) => state.purchased);
  const languageState = useSelector((state) => state.language);
  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const fetchCourses = async () => {
    const result = await getPurchasedCoursesDetailed(
      userState.user.id,
      cookies?.user
    );
    if (result.success) {
      setCourses(result.courses);
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
      Swal.fire("Error", result.message, "error");
    }

    setLoading(false);
  };
  useEffect(() => {
    fetchCourses();
  }, []);
  return (
    <>
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
            {courses.length == 0 ? (
              <div className="tw-flex tw-flex-col tw-mx-auto tw-font-semibold tw-text-3xl">
                Please Enroll in Courses to Start Learning
                <div className="tw-mx-auto">
                  <Link
                    className="tw-underline tw-text-blue-500"
                    to={"/courses"}
                  >
                    <motion.div whileHover={{ scale: 1.2 }}>
                      View Courses
                    </motion.div>
                  </Link>
                </div>
              </div>
            ) : (
              courses.map((course, index) => (
                <React.Fragment key={index}>
                  <CourseItem
                    token={cookies.user}
                    wishList={wishListState}
                    userType={userState?.user?.type}
                    userId={userState?.user?.id}
                    index={index}
                    purchased={purchasedState || []}
                    dispatch={dispatch}
                    key={course.id}
                    {...course}
                  />
                </React.Fragment>
              ))
            )}
          </>
        )}
      </div>
    </>
  );
};
export default function PurchasedCourses() {
  return (
    <>
      <PageBanner
        pageTitle="Purchased"
        homePageUrl="/"
        homePageText="Home"
        secondLevelText="Courses"
        secondLinks={"/courses/"}
        activePageText="Purchased"
      />
      <div className="courses-area courses-section">
        <div className="container">
          <PurchasedCoursesComponent />
        </div>
      </div>
    </>
  );
}
