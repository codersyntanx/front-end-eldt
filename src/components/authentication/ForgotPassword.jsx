import React from "react";
import { Translator, Translate } from "react-auto-translate";
import PageBanner from "../global/PageBanner";
import PasswordResetProcess from "./forgotPassword/PasswordResetProcess";
import { useSelector } from "react-redux";
export default function ForgotPassword() {
  const languageState = useSelector((state) => state.language);

  return (
    <>
      <PageBanner
        pageTitle="Password Recovery"
        homePageUrl="/"
        homePageText="Home"
        activePageText="Password Recovery"
      />
      <Translator
        from="en"
        to={languageState?.language?.value || "en"}
        googleApiKey={import.meta.env.VITE_GOOGLE_TRANSLATE_KEY}
      >
        <div className="profile-authentication-area">
          <div className="container">
            <div className="profile-block">
              <div className="login-register-block">
                <PasswordResetProcess />
              </div>
            </div>
          </div>
        </div>
      </Translator>{" "}
    </>
  );
}
