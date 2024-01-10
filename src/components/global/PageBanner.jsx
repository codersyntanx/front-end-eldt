import React from "react";
import { Translator, Translate } from "react-auto-translate";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PageBanner(
  {
    pageTitle,
    homePageUrl,
    homePageText,
    activePageText,
    secondLinks,
    secondLevelText,
  },
  ...props
) {
  const variants = {
    hidden: {
      scale: 0.8,
      opacity: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        delay: 0.2,
      },
    },
  };
  const pVariants = {
    hidden: {
      scale: 0.8,
      opacity: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        delay: 0.4,
      },
    },
  };
  const languageState = useSelector((state) => state.language);

  return (
    <>
      <Translator
        from="en"
        to={languageState?.language?.value || "en"}
        googleApiKey={import.meta.env.VITE_GOOGLE_TRANSLATE_KEY}
      >
        <div className="page-title-area">
          <div className="container-full">
            <div className=" page-title-content lg:tw-pt-1 md:tw-pt-1 tw-pt-10 ">
              <motion.ul variants={pVariants}>
                <li>
                  <Link to={homePageUrl}>
                    <a>
                      <Translate>{homePageText}</Translate>
                    </a>
                  </Link>
                </li>
                {secondLinks && (
                  <li className="active">
                    <Link to={secondLinks}>
                      <Translate>{secondLevelText}</Translate>
                    </Link>
                  </li>
                )}

                <li className="active">
                  <Translate>{activePageText}</Translate>
                </li>
              </motion.ul>
              <motion.h2 variants={variants}>
                <Translate>{pageTitle}</Translate>
              </motion.h2>
            </div>
          </div>
        </div>
      </Translator>
    </>
  );
}
