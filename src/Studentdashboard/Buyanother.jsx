import PopularCourses from "../components/Home/PopularCourses"
import {
    Elements
    } from '@stripe/react-stripe-js';
    import { loadStripe } from '@stripe/stripe-js';
    const stripePromise = loadStripe('pk_test_51O5F9gFZtgAr5eHPPYRptE8ZBDBXAtaLj7XGBnSp106qIqacE80PBnqGyndDPhtDYDpBWNvpJ8YmObgxijiNX22o00C8ueO5lb'); // Replace with your actual public key
    import { useSelector } from "react-redux";

function Buyanother(){
    const languageState = useSelector((state) => state.language);

    return(
        <>
        <div className="container maincontainerforstudent">
                          <Elements stripe={stripePromise}><PopularCourses id="targetSection" language={languageState.language.value} showCancelButton={false}/></Elements> 

        </div>

        </>
    )
}
export default Buyanother