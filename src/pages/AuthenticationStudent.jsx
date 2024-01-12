import React from "react";
import PageBanner from "../components/global/PageBanner";
import LoginForm from "../components/authentication/LoginForm";
import RegisterForm from "../components/authentication/RegisterForm";

export default function AuthenticationStudent() {
  return (
    <>
     
      <div className="profile-authentication-area">
          <div className="profile-block">
            <div className="login-form login-register-block">
              <LoginForm />
            </div>

            <div className="register-form">
              <RegisterForm />
            </div>
          </div>
        </div>
    </>
  );
}
