import React from "react";
import { Translator, Translate } from "react-auto-translate";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LogoutUser,
  resetPurchasedCourses,
  resetWishList,
} from "../../store/UserActions";
import { USER_TYPE } from "../../routes/PrivateRoutes";

export default function ProfileDropdown({
  language = "en",
  setOpenUser,
  openUser,
  user,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const clickOpenUser = () => {
    if (window.innerWidth < 991) {
      setOpenUser(!openUser);
      setOpenLang(false);
    }

    document.addEventListener("resize", () => {
      if (window.innerWidth < 991) {
        setOpenUser(!openUser);
      }
    });
  };
  const currentPath = useLocation();
  return (
    <>
      <Translator
        from="en"
        to={language || "en"}
        googleApiKey={import.meta.env.VITE_GOOGLE_TRANSLATE_KEY}
      >
        <div className="dropdown profile-dropdown">
          <div className="img ptb-15 line-user-desktop">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16 20C18.7614 20 21 17.7614 21 15C21 12.2386 18.7614 10 16 10C13.2386 10 11 12.2386 11 15C11 17.7614 13.2386 20 16 20Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.975 24.925C8.72739 23.4431 9.87545 22.1984 11.2919 21.3289C12.7084 20.4595 14.338 19.9993 16 19.9993C17.662 19.9993 19.2916 20.4595 20.7081 21.3289C22.1245 22.1984 23.2726 23.4431 24.025 24.925"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="line-user-mobile" onClick={() => clickOpenUser()}>
            <div className="dropdown-item author-dropdown-item">
              <div className="user-block d-flex align-items-center">
                <div className="img">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16 20C18.7614 20 21 17.7614 21 15C21 12.2386 18.7614 10 16 10C13.2386 10 11 12.2386 11 15C11 17.7614 13.2386 20 16 20Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7.975 24.925C8.72739 23.4431 9.87545 22.1984 11.2919 21.3289C12.7084 20.4595 14.338 19.9993 16 19.9993C17.662 19.9993 19.2916 20.4595 20.7081 21.3289C22.1245 22.1984 23.2726 23.4431 24.025 24.925"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="ps-3">
                  <span className="fw-semibold fs-16 mb-1 d-block">
                    {user.userName}
                  </span>
                </span>
              </div>
            </div>
          </div>

          <ul className={`dropdown-menu ${openUser ? "active" : ""}`}>
            <li>
              <Link
                to={
                  "#"

                  //   user?.type === USER_TYPE.STUDENT
                  //     ? "/student/profile"
                  //     : user?.type === USER_TYPE.INSTRUCTOR
                  //     ? "/instructor/profile"
                  //     : user?.type === USER_TYPE.SUPER_ADMIN && "/admin/profile"
                }
              >
                <a className="dropdown-item author-dropdown-item">
                  <div className="d-flex align-items-center">
                    <div className="img">
                      {user?.userName ? (
                        <img
                          src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.userName}`}
                          alt={"first_name"}
                        />
                      ) : (
                        <img src="/images/avatar.jpg" alt={"first_name"} />
                      )}
                    </div>

                    <span className="ps-3">
                      <span className="fw-semibold fs-16 mb-1 d-block">
                        {user.userName}
                      </span>
                      <span className="d-block fs-13 mt-minus-2">
                        {user.email}
                      </span>
                      <span className="d-block fs-13 mt-minus-2 tw-my-2">
                        {user.type}
                      </span>
                    </span>
                  </div>
                </a>
              </Link>
            </li>

            <li
              className="close-user-mobile"
              onClick={() => setOpenUser(false)}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M25 7L7 25"
                  stroke="#2C292A"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M25 25L7 7"
                  stroke="#2C292A"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </li>

            <li>
              <hr className="dropdown-divider" />
            </li>

            {user?.type === USER_TYPE.INSTRUCTOR && (
              <>
                <li>
                  <Link to="/instructor/my-courses">
                    <a
                      className={`dropdown-item ${
                        currentPath == "/instructor/my-courses" && "active"
                      }`}
                    >
                      <Translate>My Courses</Translate>
                    </a>
                  </Link>
                </li>

                <li>
                  <Link to="/instructor/course/create/">
                    <a
                      className={`dropdown-item ${
                        currentPath == "/instructor/course/create/" && "active"
                      }`}
                    >
                      <i className="bx bx-folder-plus"></i>
                      <Translate>Create New Course</Translate>
                    </a>
                  </Link>
                </li>
                {/* <li>
                  <Link to="/instructor/profile/">
                    <a
                      className={`dropdown-item ${
                        currentPath == "/instructor/profile/" && "active"
                      }`}
                    >
                      <i className="bx bxs-user-account"></i>
                      <Translate> Account settings</Translate>
                    </a>
                  </Link>
                </li> */}
              </>
            )}

            {user.type === USER_TYPE.SUPER_ADMIN && (
              // isAdmin
              <>
                <li>
                  <Link to="/admin/dashboard">
                    <a
                      className={`dropdown-item ${
                        currentPath == "/admin/dashboard" && "active"
                      }`}
                    >
                      <i className="bx bxs-dashboard"></i>
                      <Translate>My Dashboard</Translate>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link to="/admin/students">
                    <a
                      className={`dropdown-item ${
                        currentPath == "/admin/students" && "active"
                      }`}
                    >
                      <i className="bx bxs-hat"></i>
                      <Translate>Students</Translate>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link to="/admin/instructors">
                    <a
                      className={`dropdown-item ${
                        currentPath == "/admin/instructors" && "active"
                      }`}
                    >
                      <i className="bx bxs-hat"></i>
                      <Translate>Instructors</Translate>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link to="/admin/courses">
                    <a
                      className={`dropdown-item ${
                        currentPath == "/admin/courses" && "active"
                      }`}
                    >
                      <i className="bx bxs-hat"></i>
                      <Translate>Courses</Translate>
                    </a>
                  </Link>
                </li>
              </>
            )}

            {user?.type === USER_TYPE.STUDENT && (
              <>
                <li>
                  <Link to="/student/my-courses/">
                    <a
                      className={`dropdown-item ${
                        currentPath == "/student/my-courses/" && "active"
                      }`}
                    >
                      <i className="bx bx-book"></i>
                      <Translate>My Learning</Translate>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link to="/student/my-progress">
                    <a
                      className={`dropdown-item ${
                        currentPath == "/student/my-progress" && "active"
                      }`}
                    >
                      <i className="bx bx-chart"></i>
                      <Translate>My Progress</Translate>
                    </a>
                  </Link>
                </li>

                <li>
                  <Link to="/student/wish-list">
                    <a
                      className={`dropdown-item ${
                        currentPath == "/student/wish-list" && "active"
                      }`}
                    >
                      <i className="bx bxs-heart"></i>
                      <Translate>My Wishlist</Translate>
                    </a>
                  </Link>
                </li>
                {/* <li>
                  <Link to="/student/profile/">
                    <a
                      className={`dropdown-item ${
                        currentPath == "/student/profile/" && "active"
                      }`}
                    >
                      <i className="bx bxs-user-account"></i>
                      <Translate> Account settings</Translate>
                    </a>
                  </Link>
                </li> */}
              </>
            )}

            <li>
              <hr className="dropdown-divider" />
            </li>

            <li>
              <button
                type="submit"
                onClick={() => {
                  dispatch(LogoutUser());
                  if (user.type === USER_TYPE.STUDENT) {
                    dispatch(resetPurchasedCourses());
                    dispatch(resetWishList());

                    navigate("/authentication/student");
                  } else if (user.type === USER_TYPE.INSTRUCTOR) {
                    navigate("/authentication/student");
                  } else if (user.type === USER_TYPE.SUPER_ADMIN) {
                    navigate("/authentication/admin");
                  }
                }}
                className="dropdown-item"
              >
                <i className="bx bx-log-out"></i>
                <Translate>Log out</Translate>
              </button>
            </li>
          </ul>
        </div>
      </Translator>
    </>
  );
}
