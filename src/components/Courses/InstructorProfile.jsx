import React, { useEffect, useState } from "react";
import { getTeacherInfoForGuest } from "../../services/Guest";
import { Translator, Translate } from "react-auto-translate";

export default function InstructorProfile({ instructor, language }) {
  const [insInfo, setInfo] = useState();
  const fetchInstructorData = async () => {
    const result = await getTeacherInfoForGuest(instructor);
    setInfo(result.user);
  };
  const default_photo = "/images/default_photo.png";

  useEffect(() => {
    fetchInstructorData();
  }, []);
  return (
    <>
      <Translator
        from="en"
        to={language || "en"}
        googleApiKey={import.meta.env.VITE_GOOGLE_TRANSLATE_KEY}
      >
        <h3 className="details-title" onClick={() => handleOpenClose(event)}>
          <Translate>Meet Your Instructors</Translate>
          <div className="open-close">
            <svg
              width="45"
              height="46"
              viewBox="0 0 45 46"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Plus">
                <path
                  id="Vector"
                  d="M14.7803 14.8497L30.2414 30.4061"
                  stroke="#2C292A"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  id="Vector_2"
                  d="M30.2412 14.8497L14.7801 30.4061"
                  stroke="#2C292A"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </svg>
          </div>
        </h3>
        <div className="courses-author">
          <div className="author-profile">
            <div className="author-profile-title">
              <div className="img">
                <img
                  src={default_photo}
                  className="shadow-sm rounded-circle"
                  alt={"first_name"}
                />
              </div>
            </div>
            <div className="author-right">
              <div className="author-profile-title-details">
                <div className="author-profile-details">
                  <h4 className="author-name">
                    {insInfo?.first_name || insInfo?.userName}{" "}
                    {insInfo?.last_name}
                  </h4>
                  <span className="d-block">
                    <Translate>Teacher</Translate>
                  </span>
                </div>
              </div>
              <div className="author-bio">
                {insInfo?.bio ||
                  `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem cumque praesentium perspiciatis modi rerum error obcaecati non possimus blanditiis explicabo, nemo asperiores sequi commodi ex inventore labore ullam! Iste, ullam?`}
              </div>
            </div>
          </div>
        </div>
      </Translator>
    </>
  );
}
