import React from "react";
import PageBanner from "../components/global/PageBanner";
import ContactInfo from "../components/ContactUs/Info";
import ContactForm from "../components/workWithUs/ContactForm";
import ContactContent from "../components/ContactUs/Content";
import { useSelector } from "react-redux";

export default function ContactUs() {
  const languageState = useSelector((state) => state.language);

  return (
    <>
      <PageBanner
        pageTitle="Contact Us"
        homePageUrl="/"
        homePageText="Home"
        activePageText="Contact Us"
      />

      <div className="contact-area">
        <div className="container-wider">
          <div className="contact-area-content">
            {/* <div className="left-side">
              <ContactInfo language={languageState?.language?.value} />
            </div> */}
            <div className="right-side">
              <ContactForm language={languageState?.language?.value} />
            </div>
          </div>
          <div
            className="contact-content"
            language={languageState?.language?.value}
          >
            <ContactConte-nt />
          </div>
        </div>
      </div>
    </>
  );
}
