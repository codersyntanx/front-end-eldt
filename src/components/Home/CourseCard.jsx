import React from "react";
import { formatMoneyWithDecimals } from "../../utils/helper";
import { useState } from "react";
import { Translator, Translate } from "react-auto-translate";

export default function CourseCard(
  {
    language,
    localLang,

    courseId = "abc",
    _id,
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
  },
  ...props
) {
  const [coupon, setCoupon] = useState();
  const handleCoupon = () => {};

  return (
    <>
      <Translator
        from="en"
        to={localLang || language || "en"}
        googleApiKey={import.meta.env.VITE_GOOGLE_TRANSLATE_KEY}
      >
        <div className="courses-main tw-my-2">
          <div className="single-courses-box">
            <div className="courses-block">
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

              <div className="left-block">
                <div className="prices mobile">
                  {price > 0 && <h5>{formatMoneyWithDecimals(price)}</h5>}
                  <h1>{formatMoneyWithDecimals(price)}</h1>
                </div>
                <a className="title-block" href={`/course/${_id}`}>
                  <>
                    {name}
                    {/* <Flag language={language} /> */}
                  </>
                </a>

                <p className="info">
                  <Translate>
                    Immerse yourself in our comprehensive course designed to
                    help you master the skills and knowledge needed to obtain
                    your CLASS A and B license.
                  </Translate>
                </p>

                <div className="line-more-info">
                  <div className="item">
                    <span>
                      <Translate>Category</Translate>
                    </span>
                    <strong>CDL</strong>
                  </div>

                  <div className="item">
                    <span>
                      <Translate>Enrolled Students</Translate>
                    </span>
                    <strong className="tw-flex tw-justify-center">
                      {enrolledStudents?.length || 0}
                    </strong>
                  </div>

                  <div className="item">
                    <span>
                      <Translate>Last Update</Translate>
                    </span>
                    <strong>07/07/2023</strong>
                  </div>
                </div>
              </div>

              <div className="include-course">
                <h3 className="title-block">
                  <Translate>Included in the course</Translate>
                </h3>
                <ul>
                  <li>
                    <div className="icon">
                      <svg
                        width="25"
                        height="24"
                        viewBox="0 0 25 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16.625 9.75L11.1219 15L8.375 12.375"
                          stroke="#FBB723"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12.5 21C17.4706 21 21.5 16.9706 21.5 12C21.5 7.02944 17.4706 3 12.5 3C7.52944 3 3.5 7.02944 3.5 12C3.5 16.9706 7.52944 21 12.5 21Z"
                          stroke="#FBB723"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span>
                      <Translate>Duration: 40 hours</Translate>
                    </span>
                  </li>
                  <li>
                    <div className="icon">
                      <svg
                        width="25"
                        height="24"
                        viewBox="0 0 25 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16.625 9.75L11.1219 15L8.375 12.375"
                          stroke="#FBB723"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12.5 21C17.4706 21 21.5 16.9706 21.5 12C21.5 7.02944 17.4706 3 12.5 3C7.52944 3 3.5 7.02944 3.5 12C3.5 16.9706 7.52944 21 12.5 21Z"
                          stroke="#FBB723"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span>
                      <Translate>Lesson: {10} activities</Translate>
                    </span>
                  </li>
                  <li>
                    <div className="icon">
                      <svg
                        width="25"
                        height="24"
                        viewBox="0 0 25 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16.625 9.75L11.1219 15L8.375 12.375"
                          stroke="#FBB723"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12.5 21C17.4706 21 21.5 16.9706 21.5 12C21.5 7.02944 17.4706 3 12.5 3C7.52944 3 3.5 7.02944 3.5 12C3.5 16.9706 7.52944 21 12.5 21Z"
                          stroke="#FBB723"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span>
                      <Translate>Language: English - EN</Translate>
                    </span>
                  </li>
                  <li>
                    <div className="icon">
                      <svg
                        width="25"
                        height="24"
                        viewBox="0 0 25 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16.625 9.75L11.1219 15L8.375 12.375"
                          stroke="#FBB723"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12.5 21C17.4706 21 21.5 16.9706 21.5 12C21.5 7.02944 17.4706 3 12.5 3C7.52944 3 3.5 7.02944 3.5 12C3.5 16.9706 7.52944 21 12.5 21Z"
                          stroke="#FBB723"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span>
                      <Translate>Access: Unlimited</Translate>
                    </span>
                  </li>
                  <li>
                    <div className="icon">
                      <svg
                        width="25"
                        height="24"
                        viewBox="0 0 25 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16.625 9.75L11.1219 15L8.375 12.375"
                          stroke="#FBB723"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12.5 21C17.4706 21 21.5 16.9706 21.5 12C21.5 7.02944 17.4706 3 12.5 3C7.52944 3 3.5 7.02944 3.5 12C3.5 16.9706 7.52944 21 12.5 21Z"
                          stroke="#FBB723"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span>
                      <Translate>Certificate: Yes</Translate>
                    </span>
                  </li>
                </ul>
              </div>

              <div className="buy-now">
                <div className="prices desktop">
                  {/* {price > 0 && <h5>49</h5>} */}
                  <h1>{formatMoneyWithDecimals(price)}</h1>
                </div>

                <form onSubmit={handleCoupon}>
                  <strong>
                    <Translate>*Promo code</Translate>
                  </strong>
                  <div className="promo-block flex f-direction-row">
                    <input
                      type="text"
                      className="input-search"
                      placeholder="ex. 213456879"
                      name="search"
                      value={coupon}
                      onChange={(e) => {
                        setCoupon(e.target.value);
                      }}
                    />
                    <button className="apply-cupom" type="submit">
                      <b>
                        <Translate>Apply</Translate>
                      </b>
                    </button>
                  </div>
                </form>
                <a className="link-buy" href={`/course/${_id}`}>
                  <Translate>Buy now</Translate>
                </a>
                <a className="grade-link" href={`/course/${_id}`}>
                  <Translate>View course schedule</Translate>
                </a>
              </div>
            </div>
          </div>
        </div>
      </Translator>
    </>
  );
}
