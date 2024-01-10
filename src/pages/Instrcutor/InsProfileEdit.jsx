import React from "react";
import PageBanner from "../../components/global/PageBanner";

export default function InsProfileEdit() {
  return (
    <>
      <PageBanner
        pageTitle="Edit Profile"
        homePageUrl="/instructor/dashboard"
        homePageText="Home"
        activePageText="Edit Profile"
      />
    </>
  );
}
