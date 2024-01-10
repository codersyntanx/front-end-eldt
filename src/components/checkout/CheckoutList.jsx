import React from "react";
import { Translator, Translate } from "react-auto-translate";
import { Link } from "react-router-dom";

export default function CheckoutList({
  language = "en",
  courseId,
  name,
  image,
  creatorName,
  price,
  onRemove,
}) {
  return (
    <>
      <Translator
        from="en"
        to={language || "en"}
        googleApiKey={import.meta.env.VITE_GOOGLE_TRANSLATE_KEY}
      >
        <div className="item">
          <Link href={`/course/${courseId}`}>
            <a className="image">
              <img src={"/images/item-course-title.png"} alt={name} />
            </a>
          </Link>
        </div>
        <div className="item">
          <div className="content">
            <div className="title-block">
              <h3>
                <Link href={`/course/${courseId}`}>
                  <a>
                    <Translate>{name}</Translate>
                  </a>
                </Link>
              </h3>
              <div className="price text-end mobile">
                <span> ${price} </span>
                {price > 0 && (
                  <span>
                    <del className="">${Math.round(price * 1.2)}</del>
                  </span>
                )}
              </div>
            </div>

            <div className="info desktop">
              <ul className="list">
                <li>
                  <span>
                    <Translate>Course By </Translate>
                  </span>
                  <strong>
                    <Translate>{creatorName}</Translate>
                  </strong>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="item content">
          <div className="info mobile">
            <ul className="list">
              <li>
                <span>
                  <Translate>Course By </Translate>
                </span>
                <strong>
                  <Translate>{creatorName}</Translate>
                </strong>
              </li>
            </ul>
          </div>
        </div>
        <div className="item">
          <div className="action-button">
            <button
              onClick={() => {
                onRemove();
              }}
              className="remove"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Trash">
                  <path
                    id="Vector"
                    d="M27 7H5"
                    stroke="#262526"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_2"
                    d="M13 13V21"
                    stroke="#262526"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_3"
                    d="M19 13V21"
                    stroke="#262526"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_4"
                    d="M25 7V26C25 26.2652 24.8946 26.5196 24.7071 26.7071C24.5196 26.8946 24.2652 27 24 27H8C7.73478 27 7.48043 26.8946 7.29289 26.7071C7.10536 26.5196 7 26.2652 7 26V7"
                    stroke="#262526"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_5"
                    d="M21 7V5C21 4.46957 20.7893 3.96086 20.4142 3.58579C20.0391 3.21071 19.5304 3 19 3H13C12.4696 3 11.9609 3.21071 11.5858 3.58579C11.2107 3.96086 11 4.46957 11 5V7"
                    stroke="#262526"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </svg>
            </button>
            <span className="text mobile">
              <Translate>Delete</Translate>
            </span>
          </div>
        </div>
        <div className="item">
          <div className="price text-end desktop">
            <span> ${price} </span>
            {price > 0 && (
              <span>
                <del className="">${Math.round(price * 1.2)}</del>
              </span>
            )}
          </div>
        </div>
      </Translator>
    </>
  );
}
