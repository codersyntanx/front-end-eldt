import React from "react";
import { Translator, Translate } from "react-auto-translate";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useState } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
export default function PasswordResetProcess() {
  const languageState = useSelector((state) => state.language);

  const navigate = useNavigate();
  const [process, setProcess] = useState("Send email" || "Verify" || "Reset");
  const INITIAL_USER = {
    email: "",
    setType: "student",
  };
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };
  const [showPassword, setShowPassword] = useState(true);
  const [user, setUser] = useState(INITIAL_USER);

  return (
    <Translator
      from="en"
      to={languageState?.language?.value || "en"}
      googleApiKey={import.meta.env.VITE_GOOGLE_TRANSLATE_KEY}
    >
      <div className="login-form-container">
        <span className="welcome">
          <Translate>Welcome back</Translate>
        </span>
        <h2>
          <Translate>Log in to your account</Translate>
        </h2>

        <form onSubmit={() => {}}>
          <div className="form-group email">
            <label>
              <Translate>Email</Translate>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Ex. myemail@email.com"
              name="email"
              value={user.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group role">
            <div className="flex items-center mb-4">
              <input
                disabled={process !== "Send email"}
                id="default-radio-1"
                type="radio"
                value="student"
                name="role"
                className="tw-w-4 tw-h-4 tw-text-yellow-600 tw-bg-yellow-100 border-gray-300 focus:tw-ring-blue-500  focus:ring-2 "
              />
              <label
                for="default-radio-1"
                className="tw-ml-2 tw-text-sm tw-font-medium tw-text-gray-900 dark:text-gray-300"
              >
                Student
              </label>
            </div>
            <div className="flex items-center">
              <input
                disabled={process !== "Send email"}
                checked
                id="default-radio-2"
                type="radio"
                value="instructor"
                name="role"
                className="tw-w-4 tw-h-4 tw-text-yellow-600 tw-bg-yellow-100 border-gray-300 focus:tw-ring-blue-500  focus:ring-2 "
              />
              <label
                for="default-radio-2"
                className="tw-ml-2 tw-text-sm tw-font-medium text-gray-900 dark:text-gray-300"
              >
                Instructor
              </label>
            </div>
          </div>

          {process === "Reset" && (
            <>
              <div className="form-group">
                <label>
                  <Translate>Password</Translate>
                </label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Ex. United2023@"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>
                  <Translate>Confirm Password</Translate>
                </label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Ex. United2023@"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                />
              </div>
            </>
          )}
          <div className="flex tw-justify-center">
            <motion.button
              className="default-btn"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                if (process === "Send email") setProcess("Verify");
                else if (process === "Verify") {
                  setProcess("Reset");
                } else if (process === "Verify") {
                  navigate("/");
                }
              }}
              whileTap={{ scale: 0.9 }}
            >
              <Translate>{process}</Translate>
              {loading ? <LoadingSpinner /> : ""}
            </motion.button>
          </div>

          <div className="row align-items-center">
            <div className="login-forgot-password">
              <span>already have Account?</span>
              <Link to="/authentication/student">
                <a className="login-lost-password">
                  <Translate>Login</Translate>
                </a>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </Translator>
  );
}
