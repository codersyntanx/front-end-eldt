import React from "react";
import { Translator, Translate } from "react-auto-translate";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function NotFound() {
  const languageState = useSelector((state) => state.language);

  return (
    <>
      <Translator
        from="en"
        to={languageState?.language?.value || "en"}
        googleApiKey={import.meta.env.VITE_GOOGLE_TRANSLATE_KEY}
      >
        <div className="error-area">
          <div className="d-table">
            <div className="d-table-cell">
              <div className="container">
                <div className="error-content">
                  <div
                    className=""
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <img src="/images/error.png" alt="image" />
                  </div>
                  <h3>
                    <Translate>Page Not Found</Translate>
                  </h3>
                  <div className="btn-box">
                    <Link to="/">
                      <a className="default-btn">
                        <span>
                          <Translate>Go Back to Home</Translate>
                        </span>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Translator>
    </>
  );
}
