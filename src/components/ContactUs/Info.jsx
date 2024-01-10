import React from "react";
import { Translate, Translator } from "react-auto-translate/lib/commonjs";

const ContactInfo = ({ language }) => {
  return (
    <>
      <Translator
        from="en"
        to={language || "en"}
        googleApiKey={import.meta.env.VITE_GOOGLE_TRANSLATE_KEY}
      >
        <div className="contact-info">
          <span className="sub-title">
            <Translate>Contact Details</Translate>
          </span>
          <h2>
            <Translate>
              Welcome to United ELDT - Your Gateway to Online Entry Level
              Driving Training!
            </Translate>
          </h2>
          <p>
            <Translate>
              If you're ready to embark on an exciting career as a professional
              driver, look no further. At United ELDT, we offer comprehensive
              Entry Level Driving Training courses online, designed to equip you
              with the skills and knowledge you need to succeed in the
              transportation industry.
            </Translate>
          </p>
          <h3>
            <Translate>Contact Us for Expert Guidance and Support</Translate>
          </h3>
          <p>
            <Translate>
              We understand that starting a new journey can raise questions and
              require guidance. That's why our dedicated team of industry
              experts is here to assist you every step of the way. Whether you
              have inquiries about our online training programs, need assistance
              with the enrollment process, or seek additional information on our
              course curriculum, we are here to help.
            </Translate>
            <br />
            <Translate>
              Feel free to reach out to us via the contact information provided
              below. Our friendly and knowledgeable staff will promptly respond
              to your queries, ensuring that you receive the information you
              need to make informed decisions about your training.
            </Translate>
          </p>

          <ul className="line-icons-contact">
            <li>
              <div className="icon">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="EnvelopeSimple">
                    <path
                      id="Vector"
                      d="M4 7H28V24C28 24.2652 27.8946 24.5196 27.7071 24.7071C27.5196 24.8946 27.2652 25 27 25H5C4.73478 25 4.48043 24.8946 4.29289 24.7071C4.10536 24.5196 4 24.2652 4 24V7Z"
                      stroke="#FBB723"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      id="Vector_2"
                      d="M28 7L16 18L4 7"
                      stroke="#FBB723"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                </svg>
              </div>
              <div className="right-item">
                <span>
                  <Translate>Contact</Translate>
                </span>
                <p>
                  <a href="mailto:hello@unitedeldt.com">
                    contact@unitedeldt.com
                  </a>
                </p>
              </div>
            </li>
            <li>
              <div className="icon">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="MapPinLine">
                    <path
                      id="Vector"
                      d="M7 29H25"
                      stroke="#FBB723"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      id="Vector_2"
                      d="M16 17C18.2091 17 20 15.2091 20 13C20 10.7909 18.2091 9 16 9C13.7909 9 12 10.7909 12 13C12 15.2091 13.7909 17 16 17Z"
                      stroke="#FBB723"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      id="Vector_3"
                      d="M26 13C26 22 16 29 16 29C16 29 6 22 6 13C6 10.3478 7.05357 7.8043 8.92893 5.92893C10.8043 4.05357 13.3478 3 16 3C18.6522 3 21.1957 4.05357 23.0711 5.92893C24.9464 7.8043 26 10.3478 26 13V13Z"
                      stroke="#FBB723"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                </svg>
              </div>
              <div className="right-item">
                <span>
                  <Translate>Our Address</Translate>
                </span>
                <p>
                  <Translate>
                    66 Waverley Dr Suite 630, Frederick MD 21702, Maryland, EUA
                  </Translate>
                </p>
              </div>
            </li>

            <li>
              <div className="icon">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="Clock">
                    <path
                      id="Vector"
                      d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z"
                      stroke="#FBB723"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                    />
                    <path
                      id="Vector_2"
                      d="M16 9V16H23"
                      stroke="#FBB723"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                </svg>
              </div>

              <div className="right-item">
                <span>
                  <Translate>Hours of Operation</Translate>
                </span>
                <p>
                  <Translate>Monday - Friday: 09:00 - 20:00</Translate>
                </p>
                <p>
                  <Translate>Sunday & Saturday: 10:30 - 22:00</Translate>
                </p>
              </div>
            </li>
          </ul>
        </div>
      </Translator>
    </>
  );
};

export default ContactInfo;
