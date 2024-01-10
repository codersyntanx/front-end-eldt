import { motion } from "framer-motion";
import React, { useState } from "react";
import { Translator, Translate } from "react-auto-translate";
import { useSelector } from "react-redux";

export default function Partner({ language }) {
  const languageState = useSelector((state) => state.language);

  const [partners, setPartners] = useState([
    "partner1.png",
    "partner2.png",
    "partner3.png",
    "partner4.png",
    "partner5.png",
  ]);

  return (
    <>
      <Translator
        from="en"
        to={languageState?.language?.value || "en"}
        googleApiKey={import.meta.env.VITE_GOOGLE_TRANSLATE_KEY}
      >
        <div className="partner-area tw-my-5">
          <div className="container p-5">
            <div className="section-title">
              <span className="sub-title">
                <Translate>Find out who is with United LDT</Translate>
              </span>
              <h2 className="tab-title">
                <Translate>Meet our partners</Translate>
              </h2>
              <p className="sub">
                <Translate>
                  To bring you the best learning experience, we handpick our
                  partners who offer the best learning experience.
                </Translate>
              </p>
            </div>

            <div className="lg:tw-block md:tw-block tw-hidden">
              <div className="d-flex tw-justify-around ">
                {partners.length > 0 &&
                  partners.map((partner, index) => (
                    <motion.div key={index} className="single-partner-item">
                      <img
                        src={"/images/partner/" + partner}
                        alt={partner.name}
                      />
                    </motion.div>
                  ))}
              </div>
            </div>

            <div className="lg:tw-hidden md:tw-hidden tw-block">
              <div className="partner-block-mobile tw-flex tw-flex-col tw-justify-center tw-items-center">
                {partners.length > 0 &&
                  partners.map((partner) => (
                    <motion.div className="single-partner-item">
                      <img src={"/images/partner/" + partner} alt={partner} />
                    </motion.div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </Translator>
    </>
  );
}
