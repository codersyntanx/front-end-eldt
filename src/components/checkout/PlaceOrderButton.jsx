import React from "react";
import { Translator, Translate } from "react-auto-translate";
import StripeCheckout from "react-stripe-checkout";
import GeneralLoader from "../../utils/generalLoader";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { enrollInCourse } from "../../services/Student";
import { useCookies } from "react-cookie";
import { addPurchasedCourses, resetCart } from "../../store/UserActions";

export default function PlaceOrderButton({ language, total }) {
  const [cookies] = useCookies([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userState = useSelector((state) => state?.user);
  const handleCheckout = async () => {};
  const [loading, setLoading] = useState(false);
  const cartState = useSelector((state) => state.cart);
  return (
    <>
      <Translator
        from="en"
        to={language || "en"}
        googleApiKey={import.meta.env.VITE_GOOGLE_TRANSLATE_KEY}
      >
        {userState?.user === undefined ? (
          <button
            onClick={() => {
              Swal.fire({
                title: "Not Logged In yet",
                text: "Click Below to Login or Create Account and Proceed",
                icon: "info",
                showCancelButton: true, // Display the "Cancel" button
                confirmButtonText: "Login First", // Text for the "Accept" button
                allowOutsideClick: true,
                denyButtonText: "Register First",
                showDenyButton: true,
              }).then(async (result) => {
                if (result.isConfirmed) {
                  navigate("/authentication/student");
                } else if (result.isDenied) {
                  navigate("/authentication/student");
                }
              });
            }}
            type="submit"
            className="default-btn d-block w-100 mt-3"
            disabled={total == 0 || loading}
          >
            <span>
              <Translate>Continue to Payment</Translate>{" "}
            </span>{" "}
            {loading && <GeneralLoader />}
          </button>
        ) : (
          // stripe payment
          <button
            onClick={async () => {
              for (
                let index = 0;
                index < cartState?.cartItems?.length;
                index++
              ) {
                const apiResult = await enrollInCourse(
                  cartState?.cartItems[index].courseId,
                  userState.user.id,
                  language,
                  cookies.user
                );
                if (apiResult.success) {
                  Swal.fire(
                    `Course: ${cartState?.cartItems[index].name} is purchased`
                  );
                  dispatch(
                    addPurchasedCourses(cartState?.cartItems[index].courseId)
                  );
                } else {
                  Swal.fire(
                    `Error while purchasing Course : ${cartState?.cartItems[index].name}`,
                    apiResult?.message,
                    "error"
                  );
                }
                dispatch(resetCart());
              }
              // cartState.cartItems.map((courseItem,index)=> courseItem)
              // alert(JSON.stringify()); // enrollInCourse()
            }}
            type="submit"
            className="default-btn d-block w-100 mt-3"
            disabled={total == 0 || loading}
          >
            <span>
              <Translate>Continue to Payment</Translate>{" "}
            </span>{" "}
            {loading && <GeneralLoader />}
          </button>
        )}
      </Translator>
    </>
  );
}

{
  //  <StripeCheckout
  //           name="UNITED ELDT"
  //           amount={total * 100}
  //           currency="USD"
  //           stripeKey={import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY}
  //           token={handleCheckout}
  //           triggerEvent="onClick"
  //         >
  //           <button
  //             type="submit"
  //             className="default-btn d-block w-100 mt-3"
  //             disabled={total == 0 || loading}
  //           >
  //             <span>
  //               <Translate>Continue to Payment</Translate>{" "}
  //             </span>{" "}
  //             {loading && <GeneralLoader />}
  //           </button>
  //         </StripeCheckout>
          
           
}
