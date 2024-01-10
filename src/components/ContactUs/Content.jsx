import React from "react";
import { Translator, Translate } from "react-auto-translate";

const ContactContent = ({ language }) => {
  return (
    <>
      <Translator
        from="en"
        to={language || "en"}
        googleApiKey={import.meta.env.VITE_GOOGLE_TRANSLATE_KEY}
      >
        <h2>
          <Translate>Why Choose United ELDT?</Translate>
        </h2>
        <p>
          <Translate>
            When you choose United ELDT for your Entry Level Driving Training,
            you're choosing excellence. Here are some reasons why aspiring
            drivers like you prefer our online training programs:
          </Translate>
        </p>
        <ul>
          <li>
            <strong>
              <Translate>Quality Education:</Translate>
            </strong>
            <Translate>
              {" "}
              Our courses are carefully crafted to deliver the highest standard
              of education, ensuring you receive a comprehensive understanding
              of the industry's best practices and regulations.
            </Translate>
          </li>
          <li>
            <strong>
              <Translate>Convenience:</Translate>
            </strong>
            <Translate>
              {" "}
              With our online platform, you can access the training materials
              from anywhere, at any time. Study at your own pace and fit your
              learning around your busy schedule.
            </Translate>
          </li>
          <li>
            <strong>
              <Translate>Experienced Instructors:</Translate>
            </strong>
            <Translate>
              {" "}
              Our instructors bring years of industry experience to the virtual
              classroom, offering practical insights and real-world examples to
              enhance your learning.
            </Translate>
          </li>
          <li>
            <strong>
              <Translate>Job Placement Assistance:</Translate>
            </strong>
            <Translate>
              {" "}
              United ELDT has established partnerships with reputable
              transportation companies. As a student, you'll have access to our
              extensive network and receive job placement assistance upon
              graduation.
            </Translate>
          </li>
        </ul>
        <h2>
          <Translate>Begin Your Journey with United ELDT Today!</Translate>
        </h2>
        <p>
          <Translate>
            Don't wait to kickstart your career in the transportation industry.
            Contact United ELDT now to get all the information you need and take
            the first step towards a fulfilling and rewarding future.
          </Translate>
        </p>
        <p className="last">
          <Translate>
            We can't wait to hear from you and help you achieve your
            professional driving goals. Join United ELDT and experience the
            difference today!
          </Translate>
        </p>
      </Translator>
    </>
  );
};

export default ContactContent;
