import React from "react";
import { useParams } from "react-router-dom";

export default function GuestInstructorProfile() {
  const { insId } = useParams();
  return (
    <>
      <PageBanner
        pageTitle="Instructor Profile"
        homePageUrl="/"
        homePageText="Home"
        activePageText="Profile"
      />
    </>
  );
}
