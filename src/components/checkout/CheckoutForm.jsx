import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Translator, Translate } from "react-auto-translate";
import PlaceOrderButton from "./PlaceOrderButton";
import CheckoutList from "./CheckoutList";
import { removeFromCart, resetCart } from "../../store/UserActions";

export default function CheckoutForm() {
  const dispatch = useDispatch();
  const languageState = useSelector((state) => state.language);
  const cart = useSelector((state) => state.cart);
  const clearCart = () => {
    dispatch(resetCart());
  };
  return (
    <>
      <Translator
        from="en"
        to={languageState?.language?.value || "en"}
        googleApiKey={import.meta.env.VITE_GOOGLE_TRANSLATE_KEY}
      >
        <div className="checkout-area">
          <div className="container">
            <div className="checkout-area-content">
              {cart.cartItems.length > 0 ? (
                <div className="cart-side-left">
                  <div className="shopping-cart">
                    {/* <span className="title">{cartItems.length} Course in Cart</span> */}
                    <div className="cart-line-header">
                      <span className="course-title">
                        <Translate>Courses</Translate>
                      </span>
                      <span className="price-title">
                        <Translate>Price</Translate>{" "}
                      </span>
                    </div>

                    <div className="shopping-cart-list">
                      {/* <div className="list"> */}
                      {cart.cartItems.map((cartItem, index) => (
                        <div className="list tw-my-3" key={index}>
                          <CheckoutList
                            language={languageState.language.value}
                            key={index}
                            {...cartItem}
                            onRemove={() => {
                              dispatch(removeFromCart(cartItem));
                            }}
                          />
                        </div>
                      ))}
                      {/* </div> */}
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="empty-full text-center">
                    <div className="icon tw-flex tw-justify-center">
                      <svg
                        width="49"
                        height="48"
                        viewBox="0 0 49 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="ShoppingCart">
                          <path
                            id="Vector"
                            d="M35 34.5H13.5875L8.35625 5.7375C8.29504 5.39305 8.11536 5.08083 7.8483 4.85485C7.58123 4.62887 7.24358 4.50335 6.89375 4.5H3.5"
                            stroke="#2C292A"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            id="Vector_2"
                            d="M15.5 42C17.5711 42 19.25 40.3211 19.25 38.25C19.25 36.1789 17.5711 34.5 15.5 34.5C13.4289 34.5 11.75 36.1789 11.75 38.25C11.75 40.3211 13.4289 42 15.5 42Z"
                            stroke="#2C292A"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            id="Vector_3"
                            d="M35 42C37.0711 42 38.75 40.3211 38.75 38.25C38.75 36.1789 37.0711 34.5 35 34.5C32.9289 34.5 31.25 36.1789 31.25 38.25C31.25 40.3211 32.9289 42 35 42Z"
                            stroke="#2C292A"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            id="Vector_4"
                            d="M12.2188 27H35.7688C36.4699 27.0021 37.1494 26.7571 37.6878 26.3078C38.2262 25.8586 38.589 25.234 38.7125 24.5437L41 12H9.5"
                            stroke="#2C292A"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </g>
                      </svg>
                    </div>
                    <h3>
                      <Translate>Your shopping cart is empty</Translate>
                    </h3>
                    <p>
                      <Translate>
                        Go to the home page or browse the site for courses that
                        will make you happy. When you find them, click the add
                        to cart button
                      </Translate>
                    </p>
                  </div>
                </>
              )}

              {cart.cartItems.length > 0 && (
                <div className="cart-side-right">
                  <div className="line-cart">
                    <span className="title">
                      <Translate>Subtotal:</Translate>
                    </span>
                    <h2 className="amount value">
                      ${cart?.total || 0}
                      {/* {cartAmoutMinus > 0 && (
                        <del className="amount-cart">${cartAmoutMinus}</del>
                      )} */}
                    </h2>
                  </div>
                  <div className="line-cart">
                    <span className="title">
                      <Translate>Discount</Translate>
                    </span>
                    <span className="discount value">$0</span>
                  </div>
                  <div className="line-cart final">
                    <span className="title">
                      <Translate>Grand Total:</Translate>
                    </span>
                    <h1 className="amount value">
                      ${cart?.total || 0}
                      {/* {cartAmoutMinus > 0 && (
                        <del className="amount-cart">${cartAmoutMinus}</del>
                      )} */}
                    </h1>
                  </div>
                  <PlaceOrderButton
                    language={languageState?.language?.value}
                    total={cart?.total || 0}
                  />
                  <div className="text-center my-3">Or</div>
                  <div
                    className="tw-flex tw-items-center tw-cursor-pointer hover:tw-bg-[#292929] hover:tw-text-red-500 tw-justify-center tw-w-100 tw-bg-red-500 tw-rounded-md  tw-font-[600] tw-h-12  tw-text-lg tw-text-center tw-transition-all"
                    onClick={() => {
                      clearCart();
                    }}
                  >
                    Clear Cart
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Translator>
    </>
  );
}
