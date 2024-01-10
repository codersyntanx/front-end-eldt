import React from "react";
import { useSelector } from "react-redux";
import PageBanner from "../components/global/PageBanner";
import CheckoutForm from "../components/checkout/CheckoutForm";

export default function Checkout() {
  const languageState = useSelector((state) => state.language);

  return (
    <>
      <PageBanner
        pageTitle="Checkout"
        homePageUrl="/"
        homePageText="Home"
        activePageText="Checkout"
      />
      <CheckoutForm key={0} />
    </>
  );
}
