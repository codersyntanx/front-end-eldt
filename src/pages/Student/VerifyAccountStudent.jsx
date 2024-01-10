import React, { useEffect, useState } from "react";
import PageBanner from "../../components/global/PageBanner";
import { useSearchParams } from "react-router-dom";
import { verifyStudentAccount } from "../../services/Student";
import Swal from "sweetalert2";
import GeneralLoader from "../../utils/generalLoader";

export default function VerifyAccountStudent() {
  const [loading, setLoading] = useState(true);
  let [searchParams, setSearchParams] = useSearchParams();
  const verifyStudent = async (name, email, token) => {
    const data = await verifyStudentAccount(name, email, token);
    if (data?.sucess) {
      Swal.fire({
        title: "Your account has been approved",
        text: "Go to Login page and Login your account",
      });
    } else {
      Swal.fire({ title: "Account Verification Failed", text: data?.message });
    }
    setLoading(false);
  };
  useEffect(() => {
    const token = searchParams.get("token");
    const email = searchParams.get("email");
    const name = searchParams.get("name");
    verifyStudent(name, email, token);
  }, []);
  return (
    <>
      <PageBanner
        pageTitle="Student Account Verification"
        homePageUrl="/student/authentication"
        homePageText="Authentication"
        activePageText="Student Account Verification"
      />
      <div className="login-form-container tw-my-10">
        {loading && <GeneralLoader />}
      </div>
    </>
  );
}
