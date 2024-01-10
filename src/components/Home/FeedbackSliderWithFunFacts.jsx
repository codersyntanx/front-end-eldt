import React from "react";
import { Translator, Translate } from "react-auto-translate";
import { useSelector } from "react-redux";

export default function FeedbackSliderWithFunFacts({ language }) {
  const languageState = useSelector((state) => state.language);

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
            style={{ paddingBottom: "150px" }}
          >
            <div className="feedback-content flex f-direction-row justify-between">
              <div className="left-block">
                <span className="sub-title">
                  <Translate>Distance learning</Translate>
                </span>
                <h2 className="title">
                  <Translate>
                    Flexible Study at Your Own Language, According to Your Own
                    Needs
                  </Translate>
                </h2>
                <p className="sub " style={{ color: "whitesmoke" }}>
                  <Translate>
                    With the UNITED ELDT, you can get your CDL Endorsement.
                  </Translate>
                </p>
              </div>
              <div className="right-block">
                <div className="card-custom tw-w-full  tw-bg-white tw-text-[#2C292A] Poppins tw-p-10 tw-rounded-xl">
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
          </div>
        </div>
      </Translator>
    </>
  );
}
