import React from "react";
import { Translator, Translate } from "react-auto-translate";
import OpenCloseItem from "../Faq/openCloseItem";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function GetInstantCourses({ language }) {
  const languageState = useSelector((state) => state.language);

  const user = null;
  return (
    <>
      <Translator
        from="en"
        to={languageState?.language?.value || "en"}
        googleApiKey={import.meta.env.VITE_GOOGLE_TRANSLATE_KEY}
      >
        <div className="get-instant tw-my-5">
          <div className="container p-5">
            <div className="section-title">
              <span className="sub-title">
                <Translate>Get Instant Access to The Free</Translate>
              </span>
              <h2 className="title">
                <Translate>Self Development Course</Translate>
              </h2>
              <p className="sub">
                <Translate>
                  Welcome to United ELDTs Online Self-Development Course for
                  Entry Level Driving Training!
                </Translate>
              </p>
            </div>
            <div className="get-instant-block flex f-direction-row">
              <div className="get-instant-courses-content">
                {/* <p>
										Are you ready to embark on a
										transformative journey towards
										becoming a skilled and confident
										professional driver? Our
										comprehensive self-development
										course is designed to equip you with
										the essential knowledge and skills
										needed to excel in the dynamic world
										of driving.
									</p> */}
                <p className="ref-open-title">
                  <Translate>Why Choose Our Self-Development Course?</Translate>
                </p>
                <ul className="block-open-close">
                  <OpenCloseItem
                    title={<Translate> Comprehensive Curriculum</Translate>}
                    text={
                      <Translate>
                        Our course covers a wide range of essential topics,
                        including defensive driving techniques, road safety
                        protocols, vehicle maintenance, and customer service
                        skills. You will gain a comprehensive understanding of
                        the industrys best practices and develop the necessary
                        expertise to excel in your driving career.
                      </Translate>
                    }
                  />

                  <OpenCloseItem
                    title={<Translate>Flexibility and Convenience</Translate>}
                    text={
                      <Translate>
                        With our online platform, you have the freedom to learn
                        at your own pace and schedule. Whether you are a busy
                        professional or juggling multiple responsibilities, our
                        course adapts to your lifestyle, ensuring that you can
                        access the material whenever and wherever it suits you
                        best.
                      </Translate>
                    }
                  />

                  <OpenCloseItem
                    title={
                      <Translate>Engaging and Interactive Content</Translate>
                    }
                    text={
                      <Translate>
                        Learning should be enjoyable and interactive. Our
                        self-development course incorporates multimedia
                        elements, such as videos, quizzes, and simulations, to
                        make the learning process engaging and immersive. You
                        will have the opportunity to practice real-life
                        scenarios and receive immediate feedback, ensuring a
                        hands-on and effective learning experience.
                      </Translate>
                    }
                  />

                  <OpenCloseItem
                    title={<Translate> Expert Instructors</Translate>}
                    text={
                      <Translate>
                        Our team of seasoned instructors brings a wealth of
                        industry knowledge and experience to the table. They are
                        dedicated to your success and will guide you every step
                        of the way, providing valuable insights and personalized
                        support to help you overcome challenges and reach your
                        goals.
                      </Translate>
                    }
                  />

                  <OpenCloseItem
                    title={
                      <Translate>Career Advancement Opportunities</Translate>
                    }
                    text={
                      <Translate>
                        Completing our self-development course not only enhances
                        your driving skills but also opens up doors to various
                        career advancement opportunities. United ELDT has a vast
                        network of industry connections, and our reputation for
                        producing top-notch drivers can give you a competitive
                        edge in the job market.
                      </Translate>
                    }
                    active="active"
                  />
                </ul>
                {/* <p>
										<Translate>
											Dont let your driving ambitions
											be limited by lack of knowledge
											or skills. Take control of your
											future today with United ELDTs
											Online Self-Development Course
											for Entry Level Driving
											Training. Enroll now and embark
											on a fulfilling journey towards
											becoming a confident and
											competent professional driver.
										</Translate>
									</p> */}

                {user ? (
                  <Link to="/learning/my-courses/">
                    <a className="default-btn">
                      <span>
                        <Translate>My Courses</Translate>
                      </span>
                    </a>
                  </Link>
                ) : (
                  <Link to="/authentication">
                    <a className="default-btn">
                      <span>
                        <Translate>
                          Access self-development course now
                        </Translate>
                      </span>
                    </a>
                  </Link>
                )}
              </div>
              <div className="get-instant-courses-image">
                <img src="images/desenvolvimento.png" alt="image" />
              </div>
            </div>
          </div>
        </div>
      </Translator>
    </>
  );
}
