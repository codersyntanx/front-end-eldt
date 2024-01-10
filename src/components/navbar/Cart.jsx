import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Translator, Translate } from "react-auto-translate";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CartItems from "./CartItems";

export default function Cart({ language, setMenu }) {
  const cartAmount = 0;
  const cartAmountMinus = 0;
  const cartItemsRedux = useSelector((state) => state.cart.cartItems);
  const cart = useSelector((state) => state.cart);

  const [openCart, setOpenCart] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {}, []);
  return (
    <>
      <Translator
        from="en"
        to={language || "en"}
        googleApiKey={import.meta.env.VITE_GOOGLE_TRANSLATE_KEY}
      >
        <div className="option-item">
          <div className="cart-btn">
            <div className={`dropdown ${openCart ? "show-cart" : ""}`}>
              <div
                onClick={() => {
                  setMenu(false);
                  navigate("/checkout");
                }}
              >
                <a className="cart-link ptb-15">
                  {/* <ShoppingCart /> */}
                  <svg
                    width="33"
                    height="32"
                    viewBox="0 0 33 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="ShoppingCart">
                      <path
                        id="Vector"
                        d="M23.4561 23H9.18106L5.69355 3.825C5.65275 3.59537 5.53296 3.38722 5.35492 3.23657C5.17688 3.08592 4.95177 3.00223 4.71855 3H2.45605"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        id="Vector_2"
                        d="M10.4561 28C11.8368 28 12.9561 26.8807 12.9561 25.5C12.9561 24.1193 11.8368 23 10.4561 23C9.07534 23 7.95605 24.1193 7.95605 25.5C7.95605 26.8807 9.07534 28 10.4561 28Z"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        id="Vector_3"
                        d="M23.4561 28C24.8368 28 25.9561 26.8807 25.9561 25.5C25.9561 24.1193 24.8368 23 23.4561 23C22.0753 23 20.9561 24.1193 20.9561 25.5C20.9561 26.8807 22.0753 28 23.4561 28Z"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        id="Vector_4"
                        d="M8.26855 18H23.9686C24.436 18.0014 24.889 17.838 25.2479 17.5386C25.6069 17.2391 25.8487 16.8227 25.9311 16.3625L27.4561 8H6.45605"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                  </svg>

                  <span>{cartItemsRedux.length}</span>
                </a>
              </div>

              <ul className="dropdown-menu">
                <li className="close-mobile" onClick={() => setOpenCart(false)}>
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M25 7L7 25"
                      stroke="#2C292A"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M25 25L7 7"
                      stroke="#2C292A"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </li>
                {cart.cartItems.length > 0 ? (
                  cart.cartItems.map((cartItem, index) => (
                    <CartItems key={index} {...cartItem} />
                  ))
                ) : (
                  <li className="empty">
                    <Translate>Empty</Translate>
                  </li>
                )}

                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li className="px-4 pb-2">
                  <h5 className="pt-2 fw-bold">
                    Total: ${cart.total}{" "}
                    <del className="fs-14 ms-1 text-muted">
                      ${Math.round((cart.total * 110) / 100)}
                    </del>
                  </h5>
                  <Link to="/checkout">
                    <a className="default-btn d-block">
                      <Translate>Go to Checkout </Translate>
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Translator>
    </>
  );
}
