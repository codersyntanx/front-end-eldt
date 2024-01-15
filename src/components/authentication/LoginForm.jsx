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
import successmsg from "./Group 6674.png"
import errormsg from "./Group 6674 (2).png"

export default function LoginForm() {
  const [cookies, setCookie] = useCookies();
 const[forget, setForget]=useState(true)
  const languageState = useSelector((state) => state.language);
  const [email, setEmail]=useState("")
  const [emailrecover, setEmailrecover]=useState("")
 const [result, setResult]=useState(false)
 const [password, setPassword]=useState("")
 const [success, setSuccess] = useState(false);
 const [error, setError] = useState(false);
const [process, setProcess]=useState(true)

  const navigate = useNavigate()

 const handleLogin = (e) => {
  e.preventDefault();
  try {
    axios.post("https://server-of-united-eldt.vercel.app/api/login", {
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
const recoverEmail = async (e) => {
  e.preventDefault();
  setProcess(false);
  setError(false);
  setSuccess(false);

  try {
    const res = await axios.get(`https://server-of-united-eldt.vercel.app/api/studentbyemail/${emailrecover}`);

    if (res.data.status === false) {
      setError(true);
    } else {
      setSuccess(true);
    }
  } catch (error) {
    alert("An error occurred during email recovery");
    // Handle other errors if needed
  } finally {
    setProcess(true);
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
          ): success ?(
            <>
            <div className="mainbody">
  <div className="imgalign">
 
  <img src={successmsg} alt="success"/>
  </div>
  <span className="message" style={{marginTop:"24px"}}>Your password has been successfully sent to your email.</span><br></br>
  <span className="exp" >Please enter your email inbox and access the password reset email we sent you. With this, you will be able to change your password.</span>
</div>
            </>
          ):error?(
            <>
              <div className="mainbody">
  <div className="imgalign">
 
  <img src={errormsg} alt="success"/>
  </div>
  <span className="message" style={{marginTop:"24px"}}>This Email is not been registered</span><br></br>
  <span className="exp" >Please enter the valid email to recover your account</span>
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
                value={emailrecover}
                onChange={(e)=>{setEmailrecover(e.target.value)}}
              />
            </div>
            <button type="submit" onClick={recoverEmail} whileTap={{ scale: 0.9 }}>
              {
                process ?(<>
                              <Translate>Password Recovery</Translate>

                </>):(
                  <>
                                                <Translate>Verifying....</Translate>

                  </>
                )
              }
            </button>
            </form>
            </>
          )
        }
       
      </Translator>
    

    </>
  );
}
