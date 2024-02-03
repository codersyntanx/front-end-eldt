import React from "react";
import { useRef } from "react";
import { useEffect, useState } from "react";
import { Translator, Translate } from "react-auto-translate";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { styled } from "@mui/material/styles";
// import Cart from "./navbar/Cart";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "../store/UserActions";
import ProfileDropdown from "./navbar/ProfileDropdown";
import { USER_TYPE } from "../routes/PrivateRoutes";
import { Link as ScrollLink } from 'react-scroll';
import weblogo from "./Logo.svg"
import { jwtDecode } from "jwt-decode";

export default function Navbar({ className = "is-home" }, ...props) {
  const ref = useRef();
  const toggleNavbar = () => {
    setMenu(!menu);
  };
  const handleClick = () => {
    console.log("pushed");
    window.scrollTo({
        top: 1000,
        behavior: "smooth",
    });
};
const [userId, setUserId]=useState(null)

useEffect(() => {
  const personId = localStorage.getItem("userId");
  if (personId) {
    const decoded = jwtDecode(personId);
    setUserId(decoded);
  }
}, []);
  const [openUser, setOpenUser] = useState(false);

  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const lang = "en";
  const BtnLang = styled("div")({});

  const languageState = useSelector((state) => state.language);
  const [flg, setFlg] = useState(
    languageState?.language?.className || "flag-icon-us"
  );
  const [nameLang, setNameLang] = useState(
    languageState?.language?.name || "English"
  );

  const [openLang, setOpenLang] = useState(false);
  const [menu, setMenu] = useState(false);

  const availableLanguages = [
    { name: "English", value: "en", className: "flag-icon-us" },
    { name: "Spanish", value: "es", className: "flag-icon-es" },
    { name: "Arabic", value: "ar", className: "flag-icon-arab" },
    { name: "Russian", value: "ru", className: "flag-icon-ru" },
    { name: "Hindi", value: "hi", className: "flag-icon-hindi" },
    { name: "French", value: "fr", className: "flag-icon-fr" },
    { name: "Urdu", value: "ur", className: "flag-icon-ur" },
    { name: "Portuguese", value: "pt", className: "flag-icon-pt" },
  ];

  useEffect(() => {
    let elementId = document.getElementById("navbar");
    document.addEventListener("scroll", () => {
     
        elementId.classList.add("is-sticky");
     
    });
  });
  const SelectLanguage = (availableLanguages, i18n, lang) => {
    return (
      <>
        <BtnLang className="block-lang" onClick={() => clickOpenLang()}>
          <span
            className={"flag-icon " + flg}
            style={{ width: 32, height: 32 }}
          ></span>{" "}
          <span className="name-lang" style={{ display: "flex" }}>
            <Translate>{nameLang}</Translate>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="tw-w-6 tw-h-6 tw-text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </span>
        </BtnLang>
        <div className={"dropdown-menu m-auto"} id="language-menu">
          <ul className="list-striped">
            {availableLanguages.map((language, index) => {
              return (
                <li
                  className={
                    "button flag-button " + language.className + " " + lang ==
                    language.name
                      ? "active"
                      : ""
                  }
                  style={{
                    margin: "auto",
                    padding: "5px",
                    display: "flex",
                    justifyContent: "flex-start",
                  }}
                  onClick={() => {
                    dispatch(
                      setLanguage({
                        name: language.name,
                        value: language.value,
                        className: language.className,
                      })
                    );
                    setFlg(language.className);
                    setNameLang(language.name);

                    //   changeLanguage(
                    // language.name,
                    // language.value,
                    // language.className
                    // )
                  }}
                  name={language.name}
                  value={language.value}
                  key={index}
                >
                  <span
                    className={"flag-icon " + language.className}
                    style={{ width: 20, height: 20 }}
                  ></span>
                  {language.name}
                </li>
              );
            })}
          </ul>
        </div>
      </>
    );
  };
  const classOne = menu ? "collapse ms-auto show" : "collapse ms-auto show";

  return (
    <Translator
      from="en"
      to={languageState.language.value}
      googleApiKey={import.meta.env.VITE_GOOGLE_TRANSLATE_KEY}
    >
      <div className="no-tailwindcss">
        <div id="navbar" className={`navbar-area ${className}`} ref={ref}>
          <div className="edemy-nav">
            <div className="container-full">
              <div className="navbar navbar-expand navbar-light">
                <Link to="/">
                  <a onClick={toggleNavbar} className="navbar-brand">
                    <img
                      src={weblogo}
                      alt="logo"
                      className="logo-nav"
                    />
                  </a>
                </Link>

                <button
                  className={`button-open-menu mb-3 ${menu ? "is-open" : ""}`}
                  onClick={toggleNavbar}
                  type="button"
                >
                  <span className="icon-bar top-bar"></span>
                  <span className="icon-bar middle-bar"></span>
                  <span className="icon-bar bottom-bar"></span>
                </button>
                <div
                  className={`block-right-topo ${menu ? "open-mobile" : ""}`}
                >
                  <div className={classOne} id="navbarSupportedContent">
                    <div className="navbar-nav flex">
                      <motion.li
                        className={`nav-item ${openLang ? "show-menu" : ""}`}
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Link active className="active">
                          <a className="nav-link">
                            {SelectLanguage(availableLanguages, "en", lang)}
                          </a>
                        </Link>
                      </motion.li>
                      <motion.li className="nav-item">
                        <Link
                          onClick={() => {
                            setMenu(false);
                          }}
                          to="/"
                          active
                          className="active"
                        >
                          <a className="nav-link">
                            <Translate>Home</Translate>
                          </a>
                        </Link>
                      </motion.li>

                      <motion.li className="nav-item" whileTap={{ scale: 0.9 }}>
                        <Link
                          onClick={() => {
                            setMenu(false);
                          }}
                      
                          active
                          className="active"
                        >
                          
                           <ScrollLink onClick={handleClick} to="targetSection" smooth={true} duration={500}  className="nav-link">
                           <Link to="/"> <Translate>Courses</Translate></Link>
                          </ScrollLink>
                        </Link>
                      </motion.li>

                     
                     
                     
                    

                      <motion.li className="nav-item">
                        <div className="others-option d-flex align-items-center"></div>
                      </motion.li>
                    </div>
                  </div>

                  <div className="others-option d-flex align-items-center">
                    {/* <Cart
                      language={languageState?.language?.value}
                      setMenu={setMenu}
                    /> */}
{
  userId === null ?(<>
    <div className="option-item">
                    
                    <Link
                      onClick={() => {
                        setMenu(false);
                      }}
                      to="/login"
                    >
                      <a className="default-btn">
                        <Translate>Login</Translate>
                      </a>
                    </Link>
                
                </div>
  </>):(
    <>
      <div className="option-item">
                    
                    <Link
                      onClick={() => {
                        setMenu(false);
                      }}
                      to="/studentdash"
                    >
                      <a className="default-btn">
                        <Translate>Dashboard</Translate>
                      </a>
                    </Link>
                
                </div>

    </>
  )
}
                  
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Translator>
  );
}
