import PopularCourses from "../components/Home/PopularCourses"
import "./first.css"
import {
    Elements
    } from '@stripe/react-stripe-js';
    import { loadStripe } from '@stripe/stripe-js';
import { useState } from "react";
    const stripePromise = loadStripe('pk_test_51O5F9gFZtgAr5eHPPYRptE8ZBDBXAtaLj7XGBnSp106qIqacE80PBnqGyndDPhtDYDpBWNvpJ8YmObgxijiNX22o00C8ueO5lb'); // Replace with your actual public key
    import { useSelector } from "react-redux";

function Buyanother({handleNavigationClick}){
    const languageState = useSelector((state) => state.language);
  const [large, setLarge]=useState(3)

  const [medium, setMedium]=useState(2)
  return(
        <>
        <div className="container maincontainerforstudent">
                          <Elements stripe={stripePromise}><PopularCourses id="targetSection" language={languageState.language.value} handleNavigationClick={handleNavigationClick} large={large} medium={medium} showCancelButton={false}/></Elements> 

        </div>

        </>
    )
}
export default Buyanother