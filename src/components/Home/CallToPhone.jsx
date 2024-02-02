import React from "react";
import { Translator, Translate } from "react-auto-translate";
import Swal from "sweetalert2";
import imagecall from "./phoneforcalltocall.png"
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
            <img src={imagecall} />
          </div>
          <div className="right-side">
            <div className="right-content">
              <div className="text-block">
                <h3>
                  <Translate>Get to know our app</Translate>
                </h3>
                <p>
                  <Translate>
                  Enjoy high-level learning methods with our app; study from wherever you want
                  </Translate>
                </p>
              </div>
              <div className="button-block">
               
                <button
                  className="btn  tw-flex tw-justify-center tw-items-center"
                  onClick={() => {
                    Swal.fire("Please Stay tuned");
                  }}
                >
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
  <path d="M22.1596 0C22.2341 0 22.3085 0 22.3872 0C22.5699 2.25671 21.7085 3.94291 20.6617 5.16401C19.6345 6.37667 18.2279 7.5528 15.9529 7.37435C15.8012 5.14996 16.664 3.58881 17.7094 2.37053C18.679 1.23515 20.4565 0.224828 22.1596 0Z" fill="#2C292A"/>
  <path d="M29.0455 23.4889C29.0455 23.5114 29.0455 23.5311 29.0455 23.5522C28.4061 25.4885 27.4942 27.148 26.3813 28.6881C25.3653 30.0862 24.1203 31.9677 21.8974 31.9677C19.9765 31.9677 18.7006 30.7326 16.7319 30.6989C14.6495 30.6651 13.5043 31.7317 11.6002 32.0001C11.3824 32.0001 11.1646 32.0001 10.9511 32.0001C9.55291 31.7977 8.42456 30.6904 7.60253 29.6928C5.17861 26.7447 3.30551 22.9367 2.95703 18.0635C2.95703 17.5858 2.95703 17.1094 2.95703 16.6317C3.10457 13.144 4.79921 10.3084 7.0517 8.93414C8.24048 8.20345 9.8747 7.58096 11.6944 7.85918C12.4743 7.98003 13.271 8.24701 13.9694 8.51118C14.6312 8.76552 15.4589 9.21658 16.2429 9.19269C16.7741 9.17723 17.3024 8.90041 17.8378 8.7051C19.406 8.13881 20.9432 7.48962 22.9695 7.79454C25.4047 8.1627 27.133 9.24468 28.201 10.914C26.141 12.2251 24.5124 14.2007 24.7906 17.5745C25.0379 20.6392 26.8197 22.4322 29.0455 23.4889Z" fill="#2C292A"/>
</svg>
                  <div className="getitbtns"><Translate>Download on the</Translate><br /><span className="getitbtnboldtext"><Translate>App Store</Translate></span></div>
                </button>
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
                  <div className="getitbtns"><Translate>Get it on</Translate> <br /><span className="getitbtnboldtext"><Translate>Google Play</Translate> </span></div>
                </button>

              </div>
            </div>
          </div>
        </div>
      </Translator>
    </>
  );
}
