import React from "react";
import { Translator, Translate } from "react-auto-translate";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { createInstructor } from "../../services/Instructor";
import Swal from "sweetalert2";
import GeneralLoader from "../../utils/generalLoader";

export default function InsRegisterForm() {
  const languageState = useSelector((state) => state.language);
  const INITIAL_USER = {
    username: "",
    email: "",
    password: "",
  };

  const [user, setUser] = useState(INITIAL_USER);
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const router = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

  useEffect(() => {}, []);

  return (
    <>
      <Translator
        from="en"
        to={languageState?.language?.value || "en"}
        googleApiKey={import.meta.env.VITE_GOOGLE_TRANSLATE_KEY}
      >
        <div className="register-form-container">
          <span className="welcome">
            <Translate>First time here? Welcome</Translate>
          </span>
          <h2>
            <Translate>Create your account with us</Translate>
          </h2>

          <form
            onSubmit={async (e) => {
              setLoading(true);

              e.preventDefault();
              const result = await createInstructor(
                user.username,
                user.email,
                user.password
              );
              if (result.success) {
                Swal.fire({
                  title: "Account created successfully",
                  text: "Please check your email inbox and verify your account",
                });
              } else {
                Swal.fire({
                  title: "Error while creating account",
                  text: result.message,
                });
              }
              setLoading(false);
            }}
          >
            <div className="form-group">
              <label>
                <Translate>Full Name</Translate>
              </label>
              <input
                required
                type="text"
                className="form-control"
                placeholder="Placeholder"
                name="username"
                value={user.username}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>
                <Translate>Email</Translate>
              </label>
              <input
                required
                type="email"
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
                required
                type="password"
                className="form-control"
                placeholder="Ex. United2023@"
                name="password"
                value={user.password}
                onChange={handleChange}
              />
            </div>

            <p className="description">
              <Translate>
                The password must be at least eight characters long. To make it
                stronger, use uppercase and lowercase letters, numbers and
                symbols like ? $%^& /{")"}
              </Translate>
            </p>

            <motion.button type="submit" whileTap={{ scale: 0.9 }}>
              <Translate>Register</Translate>
            </motion.button>
            <div className="tw-my-3">{loading ? <GeneralLoader /> : ""}</div>
          </form>
        </div>
      </Translator>
    </>
  );
}
