import React from "react";
import { Translator, Translate } from "react-auto-translate";

import { useSelector } from "react-redux";
import PageBanner from "../components/global/PageBanner";
import PasswordResetProcess from "../components/authentication/forgotPassword/PasswordResetProcess";
import SendEmail from "../components/authentication/SendEmail";
export default function SendConfirmationEmail() {
  const languageState = useSelector((state) => state.language);

  return (
    <>
      <PageBanner
        pageTitle="Send Confirmation Email"
        homePageUrl="/"
        homePageText="Home"
        activePageText="Send Confirmation Email"
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
                <SendEmail />
              </div>
            </div>
          </div>
        </div>
      </Translator>{" "}
    </>
  );
}
