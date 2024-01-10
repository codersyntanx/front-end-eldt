import React from "react";
import PageBanner from "../components/global/PageBanner";
import LoginForm from "../components/authentication/LoginForm";
import RegisterForm from "../components/authentication/RegisterForm";
import AdminLoginForm from "../components/authentication/AdminLoginForm";

export default function AuthenticationAdmin() {
  return (
    <>
      <PageBanner
        pageTitle="Admin Authentication"
        homePageUrl="/"
        homePageText="Home"
        activePageText="Admin Authentication"
      />

      <div className="profile-authentication-area">
        <div className="container">
          <div className="profile-block">
            <div className="login-register-block">
              <AdminLoginForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
