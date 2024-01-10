import React from "react";
import { Translator, Translate } from "react-auto-translate";
import { useSelector } from "react-redux";

const WorkInfo = ({ language }) => {
  return (
    <>
      <Translator
        from="en"
        to={language || "en"}
        googleApiKey={import.meta.env.VITE_GOOGLE_TRANSLATE_KEY}
      >
        <div className="work-info">
          <span className="sub-title">
            <Translate>Join the team</Translate>
          </span>
          <h2 className="title">
            <Translate>Job description</Translate>
          </h2>
          <p>
            <Translate>
              We are looking for a driving instructor to teach our students how
              to drive safely and confidently. The Driving Instructor's
              responsibilities include preparing lessons covering traffic rules
              and assessing student performance, among other duties. To succeed
              as a driving instructor, you must be able to provide clear
              instruction and constructive criticism to students. Ultimately, a
              top-notch driving instructor must be able to help students develop
              safe driving habits and pass their driving tests.
            </Translate>
          </p>

          <p>
            <Translate>
              Introducing our expert driving instructor, with years of
              experience and a passion for teaching. Join our online entry-level
              driving training course for comprehensive guidance and become a
              confident driver in no time.
            </Translate>
          </p>

          <ul className="line-work">
            <li>
              <strong>1.926</strong>
              <span>
                <Translate>Closed Sessions</Translate>
              </span>
            </li>
            <li>
              <strong>3.279</strong>
              <span>
                <Translate>Enrolled Students</Translate>
              </span>
            </li>
            <li>
              <strong>250</strong>
              <span>
                <Translate>Online Instructors</Translate>
              </span>
            </li>
            <li>
              <strong>100%</strong>
              <span>
                <Translate>Satisfaction Rate</Translate>
              </span>
            </li>
          </ul>
        </div>
      </Translator>
    </>
  );
};

export default WorkInfo;
