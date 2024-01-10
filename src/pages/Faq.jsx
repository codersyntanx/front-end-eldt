import React from "react";
import PageBanner from "../components/global/PageBanner";
import NewsLetter from "../components/workWithUs/NewLetter";
import OpenCloseItem from "../components/Faq/openCloseItem";
import { Translator, Translate } from "react-auto-translate";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Faq() {
  const languageState = useSelector((state) => state.language);

  return (
    <>
      <PageBanner
        pageTitle="Frequently Asked Questions"
        homePageUrl="/"
        homePageText="Home"
        activePageText="FAQ's"
      />

      <Translator
        from="en"
        to={languageState.language.value || "en"}
        googleApiKey={import.meta.env.VITE_GOOGLE_TRANSLATE_KEY}
      >
        <div className="faq-area">
          <div className="container">
            <div className="faq-accordion">
              <ul className=" open-close-info block-open-close">
                <OpenCloseItem
                  title={
                    <Translate>How can I contact a school directly?</Translate>
                  }
                  text={
                    <Translate>
                      You can contact a school by filling out a{" "}
                      <Link to="https://unitedeldt.com/contact-us">
                        {" "}
                        <Translate>“Contact Us”</Translate>{" "}
                      </Link>{" "}
                      form. This form can be found to the right of both the
                      institute and education program profiles and also at the
                      bottom of these profiles.
                    </Translate>
                  }
                />
                <OpenCloseItem
                  title={<Translate>Where should I study abroad?</Translate>}
                  text={
                    <Translate>
                      You can contact a school by filling out a{" "}
                      <Link to="https://unitedeldt.com/contact-us">
                        {" "}
                        <Translate>“Contact Us”</Translate>{" "}
                      </Link>{" "}
                      form. This form can be found to the right of both the
                      institute and education program profiles and also at the
                      bottom of these profiles.
                    </Translate>
                  }
                />
                <OpenCloseItem
                  title={
                    <Translate>
                      How do I find a study abroad program on UNITED ELDT.com?
                    </Translate>
                  }
                  text={
                    <Translate>
                      You can contact a school by filling out a{" "}
                      <Link to="https://unitedeldt.com/contact-us">
                        {" "}
                        <Translate>“Contact Us”</Translate>{" "}
                      </Link>
                      form. This form can be found to the right of both the
                      institute and education program profiles and also at the
                      bottom of these profiles.
                    </Translate>
                  }
                />
                <OpenCloseItem
                  title={
                    <Translate>
                      How do I find a school where I want to study?
                    </Translate>
                  }
                  text={
                    <Translate>
                      You can contact a school by filling out a{" "}
                      <Link to="https://unitedeldt.com/contact-us">
                        <Translate>“Contact Us”</Translate>
                      </Link>
                      form. This form can be found to the right of both the
                      institute and education program profiles and also at the
                      bottom of these profiles.
                    </Translate>
                  }
                />
                <OpenCloseItem
                  active="active"
                  title={<Translate>Am I eligible for admission?</Translate>}
                  text={
                    <Translate>
                      You can contact a school by filling out a{" "}
                      <Link to="https://unitedeldt.com/contact-us">
                        {" "}
                        <Translate>“Contact Us”</Translate>{" "}
                      </Link>
                      form. This form can be found to the right of both the
                      institute and education program profiles and also at the
                      bottom of these profiles.
                    </Translate>
                  }
                />
              </ul>
            </div>
          </div>
        </div>
      </Translator>

      <NewsLetter language={languageState.language.value} />
    </>
  );
}
