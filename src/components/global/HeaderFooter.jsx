import React from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";

export default function HeaderFooter(props) {
  return (
    <>
      <Navbar />
      {props.children}
      <Footer />
    </>
  );
}
