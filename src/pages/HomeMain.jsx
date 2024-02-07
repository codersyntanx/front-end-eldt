import React, { useState } from "react";
import Banner from "../components/Home/Banner";
import { useSelector } from "react-redux";
import Disclaimer from "../components/Home/Disclaimer";
import PopularCourses from "../components/Home/PopularCourses";
import HomeAboutUs from "../components/Home/HomeAboutUs";
import FeedbackSliderWithFunFacts from "../components/Home/FeedbackSliderWithFunFacts";
import GetInstantCourses from "../components/Home/GetInstantCourses";
import Partner from "../components/Home/Partner";
import NewsLetter from "../components/workWithUs/NewLetter";
import {
Elements
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';


const stripePromise = loadStripe('pk_test_51O5F9gFZtgAr5eHPPYRptE8ZBDBXAtaLj7XGBnSp106qIqacE80PBnqGyndDPhtDYDpBWNvpJ8YmObgxijiNX22o00C8ueO5lb'); // Replace with your actual public key

export default function HomeMain() {
  const languageState = useSelector((state) => state.language);
  const [large, setLarge]=useState(4)

  const [medium, setMedium]=useState(3)
  return (
    <>
      <Banner language={languageState.language.value} />
      <Elements stripe={stripePromise}><PopularCourses id="targetSection" language={languageState.language.value}large={large} medium={medium} showCancelButton={true} /></Elements> 
      <Disclaimer language={languageState.language.value} />
      <HomeAboutUs language={languageState.language.value} />
      <FeedbackSliderWithFunFacts language={languageState.language.value} />
      <NewsLetter language={languageState.language.value} />
    </>
  );
}
