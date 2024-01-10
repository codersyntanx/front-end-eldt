import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Translator, Translate } from "react-auto-translate";
import Flag from "./Flag";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { formatDate } from "../../utils/helper";
import Swal from "sweetalert2";
import { USER_TYPE } from "../../routes/PrivateRoutes";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

import {
  addPurchasedCourses,
  addToWishList,
  removeFromWishList,
  resetCart,
} from "../../store/UserActions";
import {
  addToWish,
  enrollInCourse,
  removeFromWish,
} from "../../services/Student";
import GeneralLoader from "../../utils/generalLoader.jsx";
import { URL } from "../../constants";
export default function CourseItem({
  hide,
  purchased,
  dispatch,
  wishList,
  userType,

  _id,
  courseId = "abc",
  userId,
  name = "Introduction to Programming",
  image = { url: "https://example.com/intro-programming.jpg" },
  description = "Learn the basics of programming with this introductory course.",
  createdBy = "123456789012", // Replace with a valid Teacher ID
  creatorName = "John Doe",
  enrolledStudentsByDetails = [],
  enrolledStudents = [],
  learningType = "COURSE",
  category = "Programming",
  completedBy = [],
  completedByDetails = [],
  lessons = 10,
  status = "ACTIVE",
  price = 49.99,
  whatYouWillLearn = ["Basic coding concepts", "Programming languages"],
  requirements = ["No prior experience required"],
  courseIsFor = ["Beginners"],
  assets = ["Sample code files", "Video lectures"],
  createAt = "1/2/2020",
  updatedAt = "1/2/2020",
  index = 0,
  token,
}) {
  const languageState = useSelector((state) => state.language);
  const navigate = useNavigate();
  const userState = useSelector((state) => state?.user);
  const [loading, setLoading] = useState(false);
  const cartState = useSelector((state) => state.cart);
  const handleCheckout = async () => {
    const payload = {
      cartItems,
      userId: "user.id",
      buyer_name: "user.first_name",
      buyer_email: "user.email",
      buyer_avatar: "user.profile_photo",
    };
    const response = await axios.post(`${URL}/student/payForCourse`, payload);
    Swal.fire(JSON.stringify(response));
  };

  const onToken =
    (amount, description, _id, userId, lang, newToken) => async (token) => {
      const payload = {
        description,
        source: token.id,
        currency: "USD",
        amount: amount,
      };
      const response = await axios.post(`${URL}/student/payForCourse`, payload);
      if (response.status === 200) {
        const apiResult = await enrollInCourse(_id, userId, lang, newToken);
        if (apiResult.success) {
          Swal.fire(`Course: ${name} is purchased`);
          dispatch(addPurchasedCourses(_id));
        } else {
          Swal.fire(
            `Error while purchasing Course : ${name}`,
            apiResult?.message,
            "error"
          );
        }
      } else Swal.fire("Transaction Failed");
    };

  return (
    <>
      <Translator
        from="en"
        to={languageState?.language?.value || "en"}
        googleApiKey={import.meta.env.VITE_GOOGLE_TRANSLATE_KEY}
      >
        <div className="courses-item">
          <div className="single-courses-box">
            <div className="courses-block">
              <div className="image-content">
                <div className="img">
                  <img
                    src="/images/item-course-title.png"
                    alt="item-course-title"
                  />
                </div>
                <div className="truck">
                  <svg
                    width="31"
                    height="32"
                    viewBox="0 0 31 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.9412 10H25.9529C26.1404 9.99872 26.3239 10.0577 26.4793 10.1693C26.6347 10.2808 26.7547 10.4397 26.8235 10.625L28.4706 15"
                      stroke="#2C292A"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2.11768 18H20.9412"
                      stroke="#2C292A"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M22.3531 27C23.9125 27 25.1766 25.6569 25.1766 24C25.1766 22.3431 23.9125 21 22.3531 21C20.7937 21 19.5295 22.3431 19.5295 24C19.5295 25.6569 20.7937 27 22.3531 27Z"
                      stroke="#2C292A"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                    />
                    <path
                      d="M8.23539 27C9.79479 27 11.0589 25.6569 11.0589 24C11.0589 22.3431 9.79479 21 8.23539 21C6.676 21 5.41187 22.3431 5.41187 24C5.41187 25.6569 6.676 27 8.23539 27Z"
                      stroke="#2C292A"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                    />
                    <path
                      d="M19.5294 24H11.0588"
                      stroke="#2C292A"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5.41179 24H3.05885C2.80924 24 2.56984 23.8946 2.39334 23.7071C2.21684 23.5196 2.11768 23.2652 2.11768 23V9C2.11768 8.73478 2.21684 8.48043 2.39334 8.29289C2.56984 8.10536 2.80924 8 3.05885 8H20.9412V21.4"
                      stroke="#2C292A"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M20.9412 15H28.4706V23C28.4706 23.2652 28.3714 23.5196 28.1949 23.7071C28.0184 23.8946 27.779 24 27.5294 24H25.1765"
                      stroke="#2C292A"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              <div className="item-course-block">
                <Link className="title-block" to={`/course/${_id || courseId}`}>
                  <>
                    {name}
                    &nbsp;
                    <span className="tw-font-thin tw-text-sm tw-lowercase">
                      {userId &&
                        status === "DRAFT" &&
                        userType === USER_TYPE.INSTRUCTOR &&
                        userId == createdBy &&
                        `(${status})`}
                      {userId &&
                        status === "DRAFT" &&
                        userType === USER_TYPE.SUPER_ADMIN &&
                        `(${status})`}
                    </span>
                    <Flag language={"all"} />
                  </>
                </Link>

                <p className="info">
                  <Translate>{description}</Translate>
                </p>

                <div className="line-more-info">
                  <div className="item">
                    <span>
                      <Translate>Category</Translate>
                    </span>
                    <strong>{learningType}</strong>
                  </div>

                  <div className="item">
                    <span>
                      <Translate>Enrolled Students</Translate>
                    </span>
                    <strong>{enrolledStudents.length}</strong>
                  </div>

                  <div className="item">
                    <span>
                      <Translate>Last Update</Translate>
                    </span>
                    <strong>{formatDate(updatedAt)}</strong>
                  </div>
                  <motion.button
                    disabled={
                      userType === USER_TYPE.SUPER_ADMIN ||
                      userType === USER_TYPE.INSTRUCTOR
                    }
                    whileHover={{ scale: 1.3 }}
                    style={{
                      display: "flex",
                      justifyItems: "center",
                      alignItems: "center",
                      width: "100%",
                    }}
                    className="tw-flex tw-justify-center tw-max-w-[50px]"
                  >
                    {
                      userType === USER_TYPE.STUDENT && (
                        <>
                          {wishList.includes(_id) ? (
                            <i
                              className="bx bxs-heart tw-text-3xl"
                              onClick={async () => {
                                const apiResult = await removeFromWish(
                                  _id,
                                  userId,
                                  token
                                );

                                dispatch(removeFromWishList(_id));
                                if (apiResult.success) {
                                  // Swal.fire("Course added to wishlist");
                                } else {
                                  dispatch(addToWishList(_id));
                                  Swal.fire(
                                    "Error",
                                    JSON.stringify(apiResult),
                                    "error"
                                  );
                                }

                                // dispatch(removeFromWishList(_id));
                                // Swal.fire("Courses removed from  wishlist");
                              }}
                            ></i>
                          ) : (
                            <i
                              className="bx bx-heart tw-text-3xl"
                              onClick={async () => {
                                if (userType === undefined) {
                                  Swal.fire({
                                    title: "Not Logged In yet",
                                    text: "Click Below to Login or Create Account and Proceed",
                                    icon: "info",
                                    showCancelButton: true, // Display the "Cancel" button
                                    confirmButtonText: "Login First", // Text for the "Accept" button
                                    allowOutsideClick: true,
                                    denyButtonText: "Register First",
                                    showDenyButton: true,
                                  }).then(async (result) => {
                                    if (result.isConfirmed) {
                                      navigate("/authentication/student");
                                    } else if (result.isDenied) {
                                      navigate("/authentication/student");
                                    }
                                  });
                                } else {
                                  dispatch(addToWishList(_id));

                                  const apiResult = await addToWish(
                                    _id,
                                    userId,
                                    token
                                  );
                                  if (apiResult.success) {
                                    // Swal.fire("Course added to wishlist");
                                  } else {
                                    dispatch(removeFromWishList(_id));

                                    Swal.fire(
                                      "Error",
                                      apiResult.message,
                                      "error"
                                    );
                                  }
                                }

                                // dispatch(removeFromWishList(_id));
                                // Swal.fire("Courses removed from  wishlist");

                                // Swal.fire("Courses added in wishlist");
                              }}
                            ></i>
                          )}
                        </>
                      )
                      // wishList.
                    }
                  </motion.button>
                </div>

                <div className="buy-now">
                  {userId &&
                  userType === USER_TYPE.INSTRUCTOR &&
                  userId == createdBy ? (
                    <Link
                      className="link-buy"
                      to={`/instructor/courses/edit/${_id || courseId}`}
                    >
                      <Translate> Edit Course</Translate>
                    </Link>
                  ) : purchased?.includes(_id) ? (
                    <Link
                      className="link-buy"
                      to={`/student/learn/course/${_id || courseId}`}
                    >
                      <Translate>Continue Learning</Translate>
                    </Link>
                  ) : (
                    <>
                      {userId === undefined ? (
                        <>
                          <button
                            type="submit"
                            className="default-btn d-block w-100 mt-3"
                            onClick={() => {
                              navigate("/authentication/student");
                            }}
                          >
                            <span>
                              <Translate>Buy Now</Translate>{" "}
                            </span>{" "}
                          </button>
                        </>
                      ) : (
                        <StripeCheckout
                          name="UNITED ELDT"
                          amount={price * 100}
                          currency="USD"
                          stripeKey={
                            import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
                          }
                          token={onToken(
                            price * 100,
                            "Course purchased",
                            _id,
                            userState.user.id,
                            languageState?.language?.value,
                            token
                          )}
                          triggerEvent="onClick"
                        >
                          <button
                            type="submit"
                            className="default-btn d-block w-100 mt-3"
                            // disabled={total == 0 || loading}
                          >
                            <span>
                              <Translate>Buy Now</Translate>{" "}
                            </span>{" "}
                            {loading && <GeneralLoader />}
                          </button>
                        </StripeCheckout>
                      )}
                    </>
                  )}

                  {/* {userId &&
                  userType === USER_TYPE.INSTRUCTOR &&
                  userId == createdBy ? (
                    <Link
                      className="grade-link"
                      to={`/course/${_id || courseId}`}
                    >
                      <Translate>View course </Translate>
                    </Link>
                  ) : (
                    <></>
                  )} */}
                  <Link
                    className="grade-link"
                    to={`/course/${_id || courseId}`}
                  >
                    <Translate>View course </Translate>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Translator>
    </>
  );
}
