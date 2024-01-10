import React from "react";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CartItems = ({ name, courseId, price, image, creatorName }) => {
  const languageState = useSelector((state) => state.language);

  return (
    <li>
      <Link to={`/course/${courseId}`}>
        <a className="dropdown-item">
          <div className="d-flex align-items-center">
            <div>
              <img
                src="/images/item-course-title.png"
                alt={name}
                style={{
                  width: "150px",
                }}
              />
            </div>
            <div className="ps-3">
              <h6 className="fw-bold fs-14 mb-1">{name.slice(0, 30)}...</h6>
              {/* <p className="fs-13 mb-2">
                <Translate>By: {creatorName}</Translate>
              </p>
               */}
              <div className="price fs-13">
                <strong>${price}</strong>{" "}
                <del className="fs-12 text-muted ms-1">
                  ${Math.round((price * 110) / 100)}
                </del>
              </div>
            </div>
          </div>
        </a>
      </Link>
    </li>
  );
};

export default CartItems;
