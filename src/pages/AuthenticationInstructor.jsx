import React from "react";
import PageBanner from "../components/global/PageBanner";
import InsLoginForm from "../components/authentication/InsLoginForm";
import InsRegisterForm from "../components/authentication/InsRegisterForm";

export default function AuthenticationInstructor() {
  return (
    <>
      <PageBanner
        pageTitle="Instructor Authentication "
        homePageUrl="/"
        homePageText="Home"
        activePageText="Instructor Authentication"
      />
      <div className="profile-authentication-area">
        <div className="container">
          <div className="profile-block">
            <div className="login-form login-register-block">
              <InsLoginForm />
            </div>

            <div className="register-form login-register-block">
              <InsRegisterForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
