import React from "react";
import PageBanner from "../../components/global/PageBanner";

export default function InsProfile() {
  return (
    <>
      <PageBanner
        pageTitle="Instructor Profile"
        homePageUrl="/instructor/dashboard"
        homePageText="Home"
        activePageText="Instructor Profile"
      />
    </>
  );
}
