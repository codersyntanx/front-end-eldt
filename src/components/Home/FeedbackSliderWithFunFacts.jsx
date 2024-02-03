import React from "react";
import { Translator, Translate } from "react-auto-translate";
import { useSelector } from "react-redux";
import { Carousel } from 'antd';
import "./feed.css"


 
export default function FeedbackSliderWithFunFacts({ language }) {
  const languageState = useSelector((state) => state.language);
  const settings = {
    // Other carousel settings...
    dotStyle: {
      bottom: '10px', // Adjust the position as needed
    },
    dotsClass: 'slick-dots slick-dots-bottom', // Custom class for styling
  };
  return (
    <>
      <Translator
        from="en"
        to={languageState?.language?.value || "en"}
        googleApiKey={import.meta.env.VITE_GOOGLE_TRANSLATE_KEY}
      >
        <div className="feedback-area">
          <div
            className="container lg:tw-px-4 tw-px-0 "
          >
            <div className="feedback-content flex f-direction-row justify-between">
              <div className="left-block">
                <span className="sub-title">
                  <Translate>Distance learning</Translate>
                </span>
                <h2 className="title" style={{marginTop:"16px"}}>
                  <Translate>
                  Meet those who studied flexibly and in their own language, tailored to their needs.
                  </Translate>
                </h2>
                <p className="sub " style={{ color: "whitesmoke",marginTop:"16px" }}>
                  <Translate>
                    With the UNITED ELDT, you can get your CDL Endorsement.
                  </Translate>
                </p>
              </div>
              <div className="right_side">
                  <div className="svgcontain">
              <svg xmlns="http://www.w3.org/2000/svg" width="68" height="69" viewBox="0 0 68 69" fill="none">
  <g filter="url(#filter0_d_2593_51706)">
    <circle cx="33.9996" cy="34.3512" r="13.1364" fill="url(#paint0_linear_2593_51706)"/>
  </g>
  <g filter="url(#filter1_d_2593_51706)">
    <circle cx="33.9996" cy="34.3512" r="13.1364" fill="url(#paint1_linear_2593_51706)"/>
  </g>
  <circle cx="34.0007" cy="34.3513" r="23.9545" stroke="#FBB723" stroke-opacity="0.5" stroke-width="1.54545"/>
  <circle cx="34" cy="34.3516" r="33.2273" stroke="#FBB723" stroke-width="1.54545"/>
  <defs>
    <filter id="filter0_d_2593_51706" x="13.136" y="13.4876" width="41.728" height="41.7273" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset/>
      <feGaussianBlur stdDeviation="3.86364"/>
      <feComposite in2="hardAlpha" operator="out"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0.117647 0 0 0 0 0.117647 0 0 0 0 0.117647 0 0 0 1 0"/>
      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2593_51706"/>
      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2593_51706" result="shape"/>
    </filter>
    <filter id="filter1_d_2593_51706" x="13.136" y="13.4876" width="41.728" height="41.7273" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset/>
      <feGaussianBlur stdDeviation="3.86364"/>
      <feComposite in2="hardAlpha" operator="out"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0.984314 0 0 0 0 0.717647 0 0 0 0 0.137255 0 0 0 0.65 0"/>
      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2593_51706"/>
      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2593_51706" result="shape"/>
    </filter>
    <linearGradient id="paint0_linear_2593_51706" x1="33.9996" y1="21.2148" x2="33.9996" y2="47.4876" gradientUnits="userSpaceOnUse">
      <stop stop-color="#FBB723"/>
      <stop offset="1" stop-color="#B48622"/>
    </linearGradient>
    <linearGradient id="paint1_linear_2593_51706" x1="33.9996" y1="21.2148" x2="33.9996" y2="47.4876" gradientUnits="userSpaceOnUse">
      <stop stop-color="#FBB723"/>
      <stop offset="1" stop-color="#B48622"/>
    </linearGradient>
  </defs>
</svg></div>

           <Carousel >
   
    <div className="carousel_cover">
      <div className="right-block">
                <div className="card-custom tw-w-full  tw-bg-white tw-text-[#2C292A] Poppins tw-rounded-xl">
                  <div style={{ lineHeight: "160%", marginTop: "20px" }}>
                    Initially, I was skeptical about online CDL endorsement
                    platforms, but this one proved me wrong. The content was
                    up-to-date and relevant, and the interactive quizzes helped
                    me retain the information effectively. Thank you for
                    providing such a valuable resource!
                  </div>
                  <div className="tw-flex tw-my-5 tw-mt-20 ">
                    <img
                      className="tw-w-16 tw-h-16 tw-rounded-full"
                      src="https://api.dicebear.com/7.x/initials/svg?seed=Bella"
                    />
                    <div className="tw-flex tw-flex-col tw-ml-5">
                      <div className="tw-text-yellow-300 tw-font-bold tw-text-lg">
                        David Johnson
                      </div>
                      <div>Motorista de ônibus escolar</div>
                    </div>
                  </div>
                </div>
              </div>  
    </div>
       <div className="carousel_cover">

    <div className="right-block">
                <div className="card-custom tw-w-full  tw-bg-white tw-text-[#2C292A] Poppins  tw-rounded-xl">
                  <div style={{ lineHeight: "160%", marginTop: "20px" }}>
                    Initially, I was skeptical about online CDL endorsement
                    platforms, but this one proved me wrong. The content was
                    up-to-date and relevant, and the interactive quizzes helped
                    me retain the information effectively. Thank you for
                    providing such a valuable resource!
                  </div>
                  <div className="tw-flex tw-my-5 tw-mt-20 ">
                    <img
                      className="tw-w-16 tw-h-16 tw-rounded-full"
                      src="https://api.dicebear.com/7.x/initials/svg?seed=Bella"
                    />
                    <div className="tw-flex tw-flex-col tw-ml-5">
                      <div className="tw-text-yellow-300 tw-font-bold tw-text-lg">
                        David Johnson
                      </div>
                      <div>Motorista de ônibus escolar</div>
                    </div>
                  </div>
                </div>
              </div>  
    </div>
    <div className="carousel_cover">
    <div className="right-block">
                <div className="card-custom tw-w-full  tw-bg-white tw-text-[#2C292A] Poppins  tw-rounded-xl">
                  <div style={{ lineHeight: "160%", marginTop: "20px" }}>
                    Initially, I was skeptical about online CDL endorsement
                    platforms, but this one proved me wrong. The content was
                    up-to-date and relevant, and the interactive quizzes helped
                    me retain the information effectively. Thank you for
                    providing such a valuable resource!
                  </div>
                  <div className="tw-flex tw-my-5 tw-mt-20 ">
                    <img
                      className="tw-w-16 tw-h-16 tw-rounded-full"
                      src="https://api.dicebear.com/7.x/initials/svg?seed=Bella"
                    />
                    <div className="tw-flex tw-flex-col tw-ml-5">
                      <div className="tw-text-yellow-300 tw-font-bold tw-text-lg">
                        David Johnson
                      </div>
                      <div>Motorista de ônibus escolar</div>
                    </div>
                  </div>
                </div>
              </div>      </div>
  </Carousel>
  <div className="svgcontainafter">
              <svg xmlns="http://www.w3.org/2000/svg" width="55" height="56" viewBox="0 0 55 56" fill="none">
  <g filter="url(#filter0_d_2593_51711)">
    <circle cx="27.5" cy="27.8516" r="10.625" fill="url(#paint0_linear_2593_51711)"/>
  </g>
  <g filter="url(#filter1_d_2593_51711)">
    <circle cx="27.5" cy="27.8516" r="10.625" fill="url(#paint1_linear_2593_51711)"/>
  </g>
  <circle cx="27.5" cy="27.8516" r="19.375" stroke="#FBB723" stroke-opacity="0.5" stroke-width="1.25"/>
  <circle cx="27.5" cy="27.8516" r="26.875" stroke="#FBB723" stroke-width="1.25"/>
  <defs>
    <filter id="filter0_d_2593_51711" x="10.625" y="10.9766" width="33.75" height="33.75" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset/>
      <feGaussianBlur stdDeviation="3.125"/>
      <feComposite in2="hardAlpha" operator="out"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0.117647 0 0 0 0 0.117647 0 0 0 0 0.117647 0 0 0 1 0"/>
      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2593_51711"/>
      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2593_51711" result="shape"/>
    </filter>
    <filter id="filter1_d_2593_51711" x="10.625" y="10.9766" width="33.75" height="33.75" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset/>
      <feGaussianBlur stdDeviation="3.125"/>
      <feComposite in2="hardAlpha" operator="out"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0.984314 0 0 0 0 0.717647 0 0 0 0 0.137255 0 0 0 0.65 0"/>
      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2593_51711"/>
      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2593_51711" result="shape"/>
    </filter>
    <linearGradient id="paint0_linear_2593_51711" x1="27.5" y1="17.2266" x2="27.5" y2="38.4766" gradientUnits="userSpaceOnUse">
      <stop stop-color="#FBB723"/>
      <stop offset="1" stop-color="#B48622"/>
    </linearGradient>
    <linearGradient id="paint1_linear_2593_51711" x1="27.5" y1="17.2266" x2="27.5" y2="38.4766" gradientUnits="userSpaceOnUse">
      <stop stop-color="#FBB723"/>
      <stop offset="1" stop-color="#B48622"/>
    </linearGradient>
  </defs>
</svg>
</div>             
              </div>
            
            </div>
          </div>
        </div>
       
       
      </Translator>
    </>
  );
}
