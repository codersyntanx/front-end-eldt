import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PageBanner from "../../../components/global/PageBanner";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import CourseSkeletonLoader from "../../../components/Courses/CourseSkeletonLoader";
import CourseItem from "../../../components/Courses/CourseItem";
import { motion } from "framer-motion";
import { getWishListCourses } from "../../../services/Student";

export default function WishList() {
  const [cookies] = useCookies([]);
  const languageState = useSelector((state) => state.language);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const wishListState = useSelector((state) => state.wishList);
  const purchasedState = useSelector((state) => state.purchased);
  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const fetchWishList = async () => {
    setLoading(true);
    const result = await getWishListCourses(userState.user.id, cookies?.user);
    setCourses(result.courses);
    setLoading(false);
  };
  useEffect(() => {
    fetchWishList();
  }, []);
  return (
    <>
      <PageBanner
        pageTitle="Wish List"
        homePageUrl="/"
        homePageText="Home"
        secondLevelText="Courses"
        secondLinks={"/courses/"}
        activePageText="Wish List"
      />
      <div className="courses-area courses-section">
        <div className="container">
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
                    Wishlist is empty
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
        </div>
      </div>
    </>
  );
}
