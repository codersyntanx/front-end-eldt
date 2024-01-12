import { motion } from "framer-motion";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Translator, Translate } from "react-auto-translate";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  getCompletedListCourses,
  getPurchasedCourses,
  getWishListCourses,
  getWishListOnly,
  loginStudent,
} from "../../services/Student";
import GeneralLoader from "../../utils/generalLoader";
import { USER_TYPE } from "../../routes/PrivateRoutes";
import Swal from "sweetalert2";
import {
  LoginUser,
  setCompletedCourses,
  setPurchasedCourses,
  setWishList,
} from "../../store/UserActions";
import { useCookies } from "react-cookie";
import logomain from "./Logo (2).svg"
import axios from "axios";
export default function LoginForm() {
  const [cookies, setCookie] = useCookies();
 const[forget, setForget]=useState(true)
  const languageState = useSelector((state) => state.language);
  const [email, setEmail]=useState("")
 const [password, setPassword]=useState("")
  const navigate = useNavigate()

 const handleLogin = (e) => {
  e.preventDefault();
  try {
    axios.post("http://localhost:3003/api/login", {
      Email: email,
      password,
    })
    .then(res => {
      if (res.data.status === "true") {
        localStorage.setItem("userId", res.data.token);
        navigate("/studentdash")
      }
    });
  } catch (error) {
    // Handle the error here
    console.error("Error during login:", error);
  }
};

 

  useEffect(() => {}, []);
  

  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const router = useNavigate();
  const dispatch = useDispatch();
 const handleforget =()=>{
  setForget(false)
 }
 
  return (
    <>
      <Translator
        from="en"
        to={languageState?.language?.value || "en"}
        googleApiKey={import.meta.env.VITE_GOOGLE_TRANSLATE_KEY}
      >
        <div className="mainlog">
          <img src={logomain} alt="web-logo"/>
        </div>
        {
          forget ?(
            <>
             <div className="login-form-container">
          <span className="welcome">
            <Translate>Welcome back</Translate>
          </span>
          <h2>
            <Translate>Connect your account</Translate>
          </h2>

          <form>
            <div className="form-group email">
              <label>
                <Translate>Email</Translate>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Ex. myemail@email.com"
                name="email"
                value={email}
                onChange={(e)=>{setEmail(e.target.value)}}
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
                value={password}
                onChange={(e)=>{setPassword(e.target.value)}}
              />
            </div>



            <motion.button type="submit" onClick={handleLogin}>
              <Translate>Log In</Translate>
            </motion.button>
            <div className="tw-my-3">{loading ? <GeneralLoader /> : ""}</div>

            <div className="row align-items-center">
              <div className="login-forgot-password">
                <span>Forgot your password?</span>
                <Link onClick={handleforget}>
                  <a className="login-lost-password">
                    <Translate>I forgot my password</Translate>
                  </a>
                </Link>
              </div>
            </div>
          </form>
        </div>
            </>
          ):(
            <>    
            <h2>
            <Translate>I forgot my password</Translate>
          </h2>
            <form>
            <div className="form-group email">
              <label>
                <Translate>Email</Translate>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Ex. myemail@email.com"
              />
            </div>
            <button type="submit" whileTap={{ scale: 0.9 }}>
              <Translate>Password Recovery</Translate>
            </button>
            </form>
            </>
          )
        }
       
      </Translator>
    </>
  );
}
