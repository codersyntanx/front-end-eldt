import React from "react";
import { Translator, Translate } from "react-auto-translate";

export default function AboutFeaturesList({ language }) {
  return (
    <>
      <Translator
        from="en"
        to={language || "en"}
        googleApiKey={import.meta.env.VITE_GOOGLE_TRANSLATE_KEY}
      >
        <ul className="features-list flex f-direction-row justify-between align-items-center">
          <li>
            <h3 className="title-bottom">
              <Translate>Join United ELDT Today!</Translate>
            </h3>
          </li>
          <li>
            <span className="flex align-items-center">
              <div className="icon">
                <svg
                  width="32"
                  height="33"
                  viewBox="0 0 32 33"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="Student">
                    <path
                      id="Vector"
                      d="M4 8.5V18.5"
                      stroke="#2C292A"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      id="Vector_2"
                      d="M6.7749 27.4999C7.77548 25.9653 9.14312 24.7045 10.7539 23.8317C12.3648 22.959 14.1679 22.502 15.9999 22.502C17.8319 22.502 19.635 22.959 21.2459 23.8317C22.8567 24.7045 24.2243 25.9653 25.2249 27.4999"
                      stroke="#2C292A"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      id="Vector_3"
                      d="M28 8.5L16 12.5L4 8.5L16 4.5L28 8.5Z"
                      stroke="#2C292A"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      id="Vector_4"
                      d="M21.1625 10.7749C22.0798 11.7766 22.6859 13.0236 22.9068 14.3638C23.1277 15.704 22.954 17.0795 22.4067 18.3226C21.8595 19.5658 20.9624 20.6229 19.8248 21.365C18.6872 22.1072 17.3583 22.5023 16 22.5023C14.6417 22.5023 13.3128 22.1072 12.1752 21.365C11.0376 20.6229 10.1405 19.5658 9.59329 18.3226C9.04604 17.0795 8.87229 15.704 9.09322 14.3638C9.31414 13.0236 9.9202 11.7766 10.8375 10.7749"
                      stroke="#2C292A"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                </svg>
              </div>
              <Translate>Expert Trainers</Translate>
            </span>
          </li>
          <li>
            <span className=" flex align-items-center">
              <div className="icon">
                <svg
                  width="32"
                  height="33"
                  viewBox="0 0 32 33"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="CalendarCheck">
                    <path
                      id="Vector"
                      d="M26 5.5H6C5.44772 5.5 5 5.94772 5 6.5V26.5C5 27.0523 5.44772 27.5 6 27.5H26C26.5523 27.5 27 27.0523 27 26.5V6.5C27 5.94772 26.5523 5.5 26 5.5Z"
                      stroke="#2C292A"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      id="Vector_2"
                      d="M22 3.5V7.5"
                      stroke="#2C292A"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      id="Vector_3"
                      d="M10 3.5V7.5"
                      stroke="#2C292A"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      id="Vector_4"
                      d="M5 11.5H27"
                      stroke="#2C292A"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      id="Vector_5"
                      d="M20.5 16.5L14.6625 22L11.5 19"
                      stroke="#2C292A"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                </svg>
              </div>
              <Translate>Lifetime Access</Translate>
            </span>
          </li>
          <li>
            <span className="flex align-items-center">
              <div className="icon">
                <svg
                  width="32"
                  height="33"
                  viewBox="0 0 32 33"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="Airplay">
                    <path
                      id="Vector"
                      d="M16 20.5L22 27.5H10L16 20.5Z"
                      stroke="#2C292A"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      id="Vector_2"
                      d="M8 24.5H6C5.46957 24.5 4.96086 24.2893 4.58579 23.9142C4.21071 23.5391 4 23.0304 4 22.5V8.5C4 7.96957 4.21071 7.46086 4.58579 7.08579C4.96086 6.71071 5.46957 6.5 6 6.5H26C26.5304 6.5 27.0391 6.71071 27.4142 7.08579C27.7893 7.46086 28 7.96957 28 8.5V22.5C28 23.0304 27.7893 23.5391 27.4142 23.9142C27.0391 24.2893 26.5304 24.5 26 24.5H24"
                      stroke="#2C292A"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                </svg>
              </div>
              <Translate>Remote Learning</Translate>
            </span>
          </li>
          <li>
            <span className="flex align-items-center">
              <div className="icon">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="UserSwitch">
                    <path
                      id="Vector"
                      d="M16 20C18.7614 20 21 17.7614 21 15C21 12.2386 18.7614 10 16 10C13.2386 10 11 12.2386 11 15C11 17.7614 13.2386 20 16 20Z"
                      stroke="#2C292A"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      id="Vector_2"
                      d="M7.9751 24.925C8.72749 23.4431 9.87555 22.1984 11.292 21.3289C12.7085 20.4595 14.3381 19.9993 16.0001 19.9993C17.6621 19.9993 19.2917 20.4595 20.7082 21.3289C22.1246 22.1984 23.2727 23.4431 24.0251 24.925"
                      stroke="#2C292A"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      id="Vector_3"
                      d="M25 16L28 19L31 16"
                      stroke="#2C292A"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      id="Vector_4"
                      d="M1 16L4 13L7 16"
                      stroke="#2C292A"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      id="Vector_5"
                      d="M28.0001 18.9999V15.9999C28.0029 13.4073 27.166 10.8834 25.6146 8.80614C24.0631 6.72888 21.8807 5.20996 19.3939 4.47672C16.907 3.74348 14.2496 3.83537 11.8194 4.73863C9.38916 5.6419 7.31683 7.30796 5.9126 9.48742"
                      stroke="#2C292A"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      id="Vector_6"
                      d="M4.00001 13V16C3.99718 18.5927 4.83411 21.1165 6.38554 23.1938C7.93696 25.271 10.1194 26.79 12.6062 27.5232C15.0931 28.2564 17.7505 28.1646 20.1807 27.2613C22.6109 26.358 24.6833 24.692 26.0875 22.5125"
                      stroke="#2C292A"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                </svg>
              </div>
              <Translate>Self Development</Translate>
            </span>
          </li>
        </ul>
      </Translator>
    </>
  );
}
