import React from "react";
import PageBanner from "../../components/global/PageBanner";
import { Translator, Translate } from "react-auto-translate";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const languageState = useSelector((state) => state.language);

  return (
    <>
      <Translator
        from="en"
        to={languageState?.language?.value || "en"}
        googleApiKey={import.meta.env.VITE_GOOGLE_TRANSLATE_KEY}
      ></Translator>
    </>
  );
};

export default function StudentDashboard() {
  return (
    <>
      <PageBanner
        pageTitle="Dashboard"
        homePageUrl="/"
        homePageText="Home"
        activePageText="Dashboard"
      />
    </>
  );
}
