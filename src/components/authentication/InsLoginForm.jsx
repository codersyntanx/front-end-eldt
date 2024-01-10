import { motion } from "framer-motion";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Translator, Translate } from "react-auto-translate";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { loginInstructor } from "../../services/Instructor";
import Swal from "sweetalert2";
import GeneralLoader from "../../utils/generalLoader";
import { LoginUser } from "../../store/UserActions";
import { USER_TYPE } from "../../routes/PrivateRoutes";
import { useCookies } from "react-cookie";

export default function InsLoginForm() {
  const [cookies, setCookie] = useCookies();

  const dispatch = useDispatch();
  const languageState = useSelector((state) => state.language);
  const INITIAL_USER = {
    email: "",
    password: "",
  };

  const [user, setUser] = useState(INITIAL_USER);
  useEffect(() => {}, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = React.useState(false);
  const router = useNavigate();

  return (
    <>
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

          <form
            onSubmit={async (e) => {
              setLoading(true);
              e.preventDefault();
              const result = await loginInstructor(user.email, user.password);
              if (result.success) {
                const expirationDate = new Date();
                expirationDate.setDate(expirationDate.getDate() + 7); // Expires in 1 week

                Swal.fire("Login Successfully");
                const {
                  _id,
                  userName,
                  email,
                  typeOfUser = USER_TYPE.INSTRUCTOR,
                } = result.user;
                const token = result.token;
                setCookie("user", token, { expires: expirationDate });

                dispatch(LoginUser(_id, email, userName, typeOfUser));
                router("/instructor/my-courses");
              } else {
                Swal.fire({
                  title: "Error while Login",
                  text: result.message,
                });
              }
              setLoading(false);
            }}
          >
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

            <div className="">
              <div className="login-receive-email">
                <span>Didn't receive a confirmation email?</span>
                <Link to="/send-confirmation-email">
                  <a className="login-lost-password">
                    <Translate>Resend email</Translate>
                  </a>
                </Link>
              </div>
            </div>

            <motion.button type="submit" whileTap={{ scale: 0.9 }}>
              <Translate>Log In</Translate>
            </motion.button>
            <div className="tw-my-3">{loading ? <GeneralLoader /> : ""}</div>

            <div className="row align-items-center">
              <div className="login-forgot-password">
                <span>Forgot your password?</span>
                <Link to="/forgot-password">
                  <a className="login-lost-password">
                    <Translate>I forgot my password</Translate>
                  </a>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </Translator>
    </>
  );
}
