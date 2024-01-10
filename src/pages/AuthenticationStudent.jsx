import React from "react";
import PageBanner from "../components/global/PageBanner";
import LoginForm from "../components/authentication/LoginForm";
import RegisterForm from "../components/authentication/RegisterForm";

export default function AuthenticationStudent() {
  return (
    <>
      <PageBanner
        pageTitle="Student Authentication"
        homePageUrl="/"
        homePageText="Home"
        activePageText="Student Authentication"
      />
      <div className="profile-authentication-area">
        <div className="container">
          <div className="profile-block">
            <div className="login-form login-register-block">
              <LoginForm />
            </div>

            <div className="register-form login-register-block">
              <RegisterForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
