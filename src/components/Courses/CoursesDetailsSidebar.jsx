import React from "react";
import { useDispatch, useSelector } from "react-redux";
import StickyBox from "react-sticky-box";
import { Translator, Translate } from "react-auto-translate";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import SocialShareButtons from "./SocialShareButtons";
import { useEffect } from "react";
import {
  LogoutUser,
  addPurchasedCourses,
  addToCart,
} from "../../store/UserActions";
import { USER_TYPE } from "../../routes/PrivateRoutes";
import { applyForApproval } from "../../services/Instructor";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";
import StripeCheckout from "react-stripe-checkout";
import GeneralLoader from "../../utils/generalLoader";
import { enrollInCourse } from "../../services/Student";

export default function CoursesDetailsSidebar({
  purchasedCourses,

  course,
  fetchAgain,
}) {
  const navigate = useNavigate();

  const [cookies, setCookie] = useCookies();
  const [courseIsInCart, setIsInCart] = useState(false);
  const [alreadyPurchased, setPurchased] = useState(false);
  const cart = useSelector((state) => state.cart);
  const userState = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const found = cart.cartItems.filter(
      (courseItem) => courseItem.courseId == course._id
    );
    found.length > 0 ? setIsInCart(true) : setIsInCart(false);
  }, []);

  const dispatch = useDispatch();
  const languageState = useSelector((state) => state.language);
  const [apply, setApplyCoupon] = useState(false);
  const [coupon, setCoupon] = useState("");
  const addInCart = (course) => {
    dispatch(addToCart(course));
    setIsInCart(true);
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
        <StickyBox className="sticky-box" offsetTop={100} offsetBottom={20}>
          <div className="courses-sidebar-sticky">
            <div className="courses-sidebar-information">
              <div className="price">
                U$
                {course?.price}
              </div>
              {/* <BuyCourseBtn
							current_user={current_user}
							course={course}
						/> */}
              <ul className="info">
                <li>
                  <div className="item-info">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="Play">
                        <path
                          id="Vector"
                          d="M21.3844 11.3625L7.89375 3.1125C7.78018 3.04244 7.64998 3.00396 7.51658 3.00101C7.38318 2.99806 7.25141 3.03075 7.13486 3.09571C7.0183 3.16068 6.92119 3.25556 6.85354 3.37057C6.78589 3.48558 6.75015 3.61656 6.75 3.75V20.25C6.75015 20.3834 6.78589 20.5144 6.85354 20.6294C6.92119 20.7444 7.0183 20.8393 7.13486 20.9043C7.25141 20.9692 7.38318 21.0019 7.51658 20.999C7.64998 20.996 7.78018 20.9576 7.89375 20.8875L21.3844 12.6375C21.4952 12.572 21.5869 12.4787 21.6507 12.367C21.7145 12.2552 21.748 12.1287 21.748 12C21.748 11.8713 21.7145 11.7448 21.6507 11.633C21.5869 11.5212 21.4952 11.428 21.3844 11.3625V11.3625Z"
                          stroke="#FBB723"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                    </svg>
                    <span>
                      <Translate>Live Class</Translate>
                    </span>
                    <strong>
                      {course?.is_class ? (
                        <div className="live-class-icon"></div>
                      ) : (
                        "No"
                      )}
                    </strong>
                  </div>
                </li>
                <li>
                  <div className="item-info">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="User">
                        <path
                          id="Vector"
                          d="M12 15C15.3137 15 18 12.3137 18 9C18 5.68629 15.3137 3 12 3C8.68629 3 6 5.68629 6 9C6 12.3137 8.68629 15 12 15Z"
                          stroke="#FBB723"
                          strokeWidth="2"
                          strokeMiterlimit="10"
                        />
                        <path
                          id="Vector_2"
                          d="M2.90625 20.25C3.82775 18.6536 5.15328 17.3279 6.74958 16.4061C8.34588 15.4844 10.1567 14.9992 12 14.9992C13.8433 14.9992 15.6541 15.4844 17.2504 16.4061C18.8467 17.3279 20.1722 18.6536 21.0938 20.25"
                          stroke="#FBB723"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                    </svg>
                    <span>
                      <Translate>Instructor</Translate>
                    </span>
                    <strong>
                      {course?.creatorName && course?.creatorName}
                    </strong>
                  </div>
                </li>
                <li>
                  <div className="item-info">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="ClockClockwise">
                        <path
                          id="Vector"
                          d="M12 7.5V12"
                          stroke="#FBB723"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          id="Vector_2"
                          d="M15.9 14.25L12 12"
                          stroke="#FBB723"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          id="Vector_3"
                          d="M17.2695 9.34686H21.0195V5.59686"
                          stroke="#FBB723"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          id="Vector_4"
                          d="M17.8321 17.8313C16.6786 18.9857 15.2086 19.7721 13.6081 20.091C12.0075 20.4099 10.3484 20.2469 8.84051 19.6227C7.33263 18.9984 6.04376 17.941 5.13694 16.5842C4.23012 15.2273 3.74609 13.632 3.74609 12C3.74609 10.368 4.23012 8.7727 5.13694 7.41585C6.04376 6.059 7.33263 5.00158 8.84051 4.37735C10.3484 3.75313 12.0075 3.59014 13.6081 3.90902C15.2086 4.22789 16.6786 5.0143 17.8321 6.16875L21.0196 9.34688"
                          stroke="#FBB723"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                    </svg>
                    <span>
                      <Translate>Duration</Translate>
                    </span>
                    <strong>{course?.duration || 4}</strong>
                  </div>
                </li>
                <li>
                  <div className="item-info">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="BookOpen">
                        <path
                          id="Vector"
                          d="M12 8.25C12 7.45435 12.3161 6.69129 12.8787 6.12868C13.4413 5.56607 14.2044 5.25 15 5.25H21C21.1989 5.25 21.3897 5.32902 21.5303 5.46967C21.671 5.61032 21.75 5.80109 21.75 6V18C21.75 18.1989 21.671 18.3897 21.5303 18.5303C21.3897 18.671 21.1989 18.75 21 18.75H15C14.2044 18.75 13.4413 19.0661 12.8787 19.6287C12.3161 20.1913 12 20.9544 12 21.75"
                          stroke="#FBB723"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          id="Vector_2"
                          d="M2.25 18C2.25 18.1989 2.32902 18.3897 2.46967 18.5303C2.61032 18.671 2.80109 18.75 3 18.75H9C9.79565 18.75 10.5587 19.0661 11.1213 19.6287C11.6839 20.1913 12 20.9544 12 21.75V8.25C12 7.45435 11.6839 6.69129 11.1213 6.12868C10.5587 5.56607 9.79565 5.25 9 5.25H3C2.80109 5.25 2.61032 5.32902 2.46967 5.46967C2.32902 5.61032 2.25 5.80109 2.25 6V18Z"
                          stroke="#FBB723"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                    </svg>
                    <span>
                      <Translate>Lessons</Translate>
                    </span>
                    <strong>{course?.lessons || 10}</strong>
                  </div>
                </li>
                <li>
                  <div className="item-info">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="Student">
                        <path
                          id="Vector"
                          d="M3 6V13.5"
                          stroke="#FBB723"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          id="Vector_2"
                          d="M5.08203 20.25C5.83246 19.099 6.8582 18.1534 8.06631 17.4989C9.27443 16.8443 10.6267 16.5015 12.0008 16.5015C13.3748 16.5015 14.7271 16.8443 15.9353 17.4989C17.1434 18.1534 18.1691 19.099 18.9195 20.25"
                          stroke="#FBB723"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          id="Vector_3"
                          d="M21 6L12 9L3 6L12 3L21 6Z"
                          stroke="#FBB723"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          id="Vector_4"
                          d="M15.8719 7.70625C16.5599 8.45754 17.0144 9.39276 17.1801 10.3979C17.3458 11.403 17.2155 12.4347 16.805 13.367C16.3946 14.2994 15.7218 15.0922 14.8686 15.6488C14.0154 16.2054 13.0187 16.5018 12 16.5018C10.9813 16.5018 9.9846 16.2054 9.13141 15.6488C8.27822 15.0922 7.6054 14.2994 7.19497 13.367C6.78453 12.4347 6.65422 11.403 6.81991 10.3979C6.98561 9.39276 7.44015 8.45754 8.12813 7.70625"
                          stroke="#FBB723"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                    </svg>

                    <span>
                      <Translate>Enrolled</Translate>
                    </span>
                    <strong>
                      {course?.enrolledStudents &&
                        course?.enrolledStudents?.length}{" "}
                      students{" "}
                    </strong>
                  </div>
                </li>
                <li>
                  <div className="item-info">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="GlobeSimple">
                        <path
                          id="Vector"
                          d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                          stroke="#FBB723"
                          strokeWidth="2"
                          strokeMiterlimit="10"
                        />
                        <path
                          id="Vector_2"
                          d="M3 12H21"
                          stroke="#FBB723"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          id="Vector_3"
                          d="M12 20.7563C14.0711 20.7563 15.75 16.8359 15.75 12C15.75 7.16406 14.0711 3.24375 12 3.24375C9.92893 3.24375 8.25 7.16406 8.25 12C8.25 16.8359 9.92893 20.7563 12 20.7563Z"
                          stroke="#FBB723"
                          strokeWidth="2"
                          strokeMiterlimit="10"
                        />
                      </g>
                    </svg>
                    <span>
                      <Translate>Language</Translate>
                    </span>
                    <strong>{"All"}</strong>
                  </div>
                </li>
                <li>
                  <div className="item-info">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="MonitorPlay">
                        <path
                          id="Vector"
                          d="M4.5 18L19.5 18C20.3284 18 21 17.3284 21 16.5V6C21 5.17157 20.3284 4.5 19.5 4.5L4.5 4.5C3.67157 4.5 3 5.17157 3 6V16.5C3 17.3284 3.67157 18 4.5 18Z"
                          stroke="#FBB723"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          id="Vector_2"
                          d="M15 21H9"
                          stroke="#FBB723"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          id="Vector_3"
                          d="M15 11.25L10.5 8.25V14.25L15 11.25Z"
                          stroke="#FBB723"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                    </svg>
                    <span>
                      <Translate>Video Subtitle</Translate>
                    </span>
                    <strong>{course?.subtitle ? "Yes" : "No"}</strong>
                  </div>
                </li>
                <li>
                  <div className="item-info">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="ClockClockwise">
                        <path
                          id="Vector"
                          d="M12 7.5V12"
                          stroke="#FBB723"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          id="Vector_2"
                          d="M15.9 14.25L12 12"
                          stroke="#FBB723"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          id="Vector_3"
                          d="M17.2695 9.34686H21.0195V5.59686"
                          stroke="#FBB723"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          id="Vector_4"
                          d="M17.8321 17.8313C16.6786 18.9857 15.2086 19.7721 13.6081 20.091C12.0075 20.4099 10.3484 20.2469 8.84051 19.6227C7.33263 18.9984 6.04376 17.941 5.13694 16.5842C4.23012 15.2273 3.74609 13.632 3.74609 12C3.74609 10.368 4.23012 8.7727 5.13694 7.41585C6.04376 6.059 7.33263 5.00158 8.84051 4.37735C10.3484 3.75313 12.0075 3.59014 13.6081 3.90902C15.2086 4.22789 16.6786 5.0143 17.8321 6.16875L21.0196 9.34688"
                          stroke="#FBB723"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                    </svg>
                    <span>
                      <Translate>Access Time</Translate>
                    </span>
                    <strong>{course?.access_time} access</strong>
                  </div>
                </li>
                <li>
                  <div className="item-info">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="CheckCircle">
                        <path
                          id="Vector"
                          d="M16.125 9.75L10.6219 15L7.875 12.375"
                          stroke="#FBB723"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          id="Vector_2"
                          d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                          stroke="#FBB723"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                    </svg>
                    <span>
                      <Translate>Certificate</Translate>
                    </span>
                    <strong>Yes</strong>
                  </div>
                </li>
              </ul>
              {userState?.user === undefined && (
                <>
                  <div className="btn-box">
                    {purchasedCourses.includes(course._id) ? (
                      <button
                        onClick={() => {
                          navigate(`/student/learn/course/${course._id}`);
                          // router.push("/learning/my/-courses");
                        }}
                        className="default-btn"
                      >
                        <Translate>View My Course</Translate>
                      </button>
                    ) : (
                      <>
                        {
                          // add
                          false ? (
                            <Link to="/checkout">
                              <a className="default-btn"> View Cart </a>
                            </Link>
                          ) : (
                            <StripeCheckout
                              name="UNITED ELDT"
                              amount={course?.price * 100}
                              currency="USD"
                              stripeKey={
                                import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
                              }
                              token={
                                () => {}
                                //   onToken(
                                //   course?.price * 100,
                                //   "Course purchased",
                                //   course._id,
                                //   userState?.user?.id,
                                //   languageState?.language?.value,
                                //   cookies?.user
                                // )}
                              }
                              triggerEvent="onClick"
                            >
                              <button
                                type="submit"
                                className="default-btn d-block w-100 mt-3"
                                // disabled={total == 0 || loading}
                              >
                                <span>
                                  <Translate>Buy  Now</Translate>{" "}
                                </span>{" "}
                                {loading && <GeneralLoader />}
                              </button>
                            </StripeCheckout>
                          )
                        }
                      </>
                    )}
                  </div>

                  <div className="coupon">
                    <h4
                      onClick={() => {
                        setApplyCoupon(true);
                      }}
                    >
                      Apply Coupon
                    </h4>
                    {apply && (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                        }}
                      >
                        <input
                          type="text"
                          className="input-search"
                          placeholder="Enter Coupon"
                          name="search"
                          value={coupon}
                          onChange={(e) => setCoupon(e.target.value)}
                          style={{ border: "1px solid silver", color: "black" }}
                        />
                        <button type="submit">
                          <button>
                            <Translate>Apply</Translate>
                          </button>
                        </button>
                      </form>
                    )}
                  </div>
                </>
              )}
              {userState?.user?.type === USER_TYPE.STUDENT && (
                <>
                  <div className="btn-box">
                    {alreadyPurchased ? (
                      <button
                        onClick={() => {
                          // router.push("/learning/my-courses")
                        }}
                        className="default-btn"
                      >
                        <Translate>View My Courses</Translate>
                      </button>
                    ) : (
                      <>
                        {
                          // add
                          false ? (
                            <Link to="/checkout">
                              <a className="default-btn"> View Cart </a>
                            </Link>
                          ) : (
                            <button
                              onClick={() => {
                                // addInCart(course);
                                dispatch(addPurchasedCourses(course._id));
                              }}
                              className="default-btn"
                            >
                              <Translate>Buy Course</Translate>
                            </button>
                          )
                        }
                      </>
                    )}
                  </div>

                  <div className="coupon">
                    <h4
                      onClick={() => {
                        setApplyCoupon(true);
                      }}
                    >
                      Apply Coupon
                    </h4>
                    {apply && (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                        }}
                      >
                        <input
                          type="text"
                          className="input-search"
                          placeholder="Enter Coupon"
                          name="search"
                          value={coupon}
                          onChange={(e) => setCoupon(e.target.value)}
                          style={{ border: "1px solid silver", color: "black" }}
                        />
                        <button type="submit">
                          <button>
                            <Translate>Apply</Translate>
                          </button>
                        </button>
                      </form>
                    )}
                  </div>
                </>
              )}

              {userState?.user?.type === USER_TYPE.INSTRUCTOR &&
                userState?.user?.id === course.createdBy &&
                course.status === "DRAFT" && (
                  <>
                    <div className="btn-box">
                      {
                        <button
                          disabled={course.status === "APPROVAL_REQUIRED"}
                          onClick={async () => {
                            // apply for approval
                            const result = await applyForApproval(
                              course._id,
                              cookies.user
                            );
                            if (result.success) {
                              Swal.fire("Applied for Course Approval");
                              fetchAgain();
                            } else {
                              if (
                                result.message === "Token is not valid for User"
                              ) {
                                Swal.fire({
                                  title: "Session Expired",
                                  text: "User Session has been expired please login again",
                                });
                                dispatch(LogoutUser());
                                navigate("/");

                                return;
                              }
                              Swal.fire({
                                title: "Course Application Failed",
                                text: result.message,
                              });
                            }
                          }}
                          className="default-btn"
                        >
                          <Translate>Apply Approval</Translate>
                        </button>
                      }
                    </div>
                  </>
                )}

              <SocialShareButtons slug={course?.id} />
            </div>
          </div>
        </StickyBox>
      </Translator>
    </>
  );
}
