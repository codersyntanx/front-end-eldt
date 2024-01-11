import React from "react";
import { Translator, Translate } from "react-auto-translate";
import Swal from "sweetalert2";
export default function CallToPhone({ language }) {
  return (
    <>
      <Translator
        from="en"
        to={language || "en"}
        googleApiKey={import.meta.env.VITE_GOOGLE_TRANSLATE_KEY}
      >
        
        <div className="callphone-block">
          <div className="left-side">
            <img src={`images/iphone-layout.png`} />
          </div>
          <div className="right-side">
            <div className="right-content">
              <div className="text-block">
                <h3>
                  <Translate>Have access to classes in our app</Translate>
                </h3>
                <p>
                  <Translate>
                    Enjoy high level learning methods with our app, study where
                    you want
                  </Translate>
                </p>
              </div>
              <div className="button-block">
                <button
                  onClick={() => {
                    Swal.fire("Please Stay tuned");
                  }}
                  className="btn  tw-flex tw-justify-center tw-items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                  >
                    <path
                      d="M3 3.71803V28.2805C3.00016 28.3338 3.01606 28.3859 3.04569 28.4302C3.07532 28.4745 3.11737 28.509 3.16656 28.5295C3.21575 28.55 3.2699 28.5555 3.32222 28.5454C3.37453 28.5352 3.42268 28.5098 3.46062 28.4724L16.25 15.9999L3.46062 3.52616C3.42268 3.48874 3.37453 3.46336 3.32222 3.45321C3.2699 3.44305 3.21575 3.44856 3.16656 3.46905C3.11737 3.48954 3.07532 3.5241 3.04569 3.56839C3.01606 3.61269 3.00016 3.66474 3 3.71803Z"
                      fill="#2C292A"
                    />
                    <path
                      d="M21.6126 10.8749L5.57633 2.03994L5.56633 2.03432C5.29008 1.88432 5.02758 2.25807 5.25383 2.47557L17.8245 14.4956L21.6126 10.8749Z"
                      fill="#2C292A"
                    />
                    <path
                      d="M5.25505 29.5244C5.02755 29.7419 5.29005 30.1157 5.56755 29.9657L5.57755 29.9601L21.6126 21.1251L17.8244 17.5032L5.25505 29.5244Z"
                      fill="#2C292A"
                    />
                    <path
                      d="M28.0862 14.4374L23.6081 11.9712L19.3975 15.9999L23.6081 20.0268L28.0862 17.5624C29.3043 16.8893 29.3043 15.1106 28.0862 14.4374Z"
                      fill="#2C292A"
                    />
                  </svg>
                  <Translate>Download Google Play</Translate>
                </button>

                <button
                  className="btn  tw-flex tw-justify-center tw-items-center"
                  onClick={() => {
                    Swal.fire("Please Stay tuned");
                  }}
                >
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="AppleLogo">
                      <path
                        id="Vector"
                        d="M17.2625 4.0625C17.5532 3.30751 18.0661 2.65843 18.7333 2.20094C19.4006 1.74344 20.1909 1.49905 21 1.5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        id="Vector_2"
                        d="M27.3125 20.3625C25.7375 24.2125 22.8875 27 20.5 27H11.5C8 27 3.5 21 3.5 14.5C3.50052 13.0525 3.91995 11.6359 4.70768 10.4215C5.49542 9.20696 6.61779 8.24638 7.93936 7.65564C9.26093 7.0649 10.7252 6.86924 12.1555 7.09227C13.5858 7.3153 14.921 7.94749 16 8.91255V8.91255C16.7637 8.22832 17.6597 7.70797 18.6325 7.38365C19.6052 7.05934 20.6342 6.93795 21.6557 7.02698C22.6773 7.11602 23.6697 7.41358 24.5717 7.9013C25.4737 8.38901 26.2661 9.05651 26.9 9.86255V9.86255C25.9813 10.4173 25.2282 11.2083 24.7192 12.1531C24.2102 13.0979 23.9639 14.162 24.006 15.2343C24.0482 16.3067 24.3772 17.3482 24.9587 18.2501C25.5403 19.1521 26.3531 19.8816 27.3125 20.3625V20.3625Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                  </svg>
                  <Translate>Download Apple Store</Translate>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Translator>
    </>
  );
}
