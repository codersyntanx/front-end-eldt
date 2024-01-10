import React from "react";
import PageBanner from "../components/global/PageBanner";
import WorkInfo from "../components/workWithUs/WorkInfo";
import ContactForm from "../components/workWithUs/ContactForm";
import NewsLetter from "../components/workWithUs/NewLetter";
import { useSelector } from "react-redux";

export default function WorkWithUs() {
  const languageState = useSelector((state) => state.language);

  return (
    <>
      <PageBanner
        pageTitle="Work with us"
        homePageUrl="/"
        homePageText="Home"
        activePageText="Work with us"
      />

      <div className="work-with-us-area">
        <div className="container-wider">
          <div className="work-content">
            <div className="left-side">
              <WorkInfo language={languageState.language.value} />
            </div>
            <div className="right-side">
              <ContactForm language={languageState.language.value} />
            </div>
          </div>
        </div>
      </div>
      <NewsLetter language={languageState.language.value} />
    </>
  );
}
