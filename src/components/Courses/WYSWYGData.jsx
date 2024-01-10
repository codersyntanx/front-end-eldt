import React from "react";
import { Translator, Translate } from "react-auto-translate";

export default function WYSWYGData({
  language = "en",
  data,
  title = "What you will learn",
}) {
  return (
    <>
      <Translator
        from="en"
        to={language || "en"}
        googleApiKey={import.meta.env.VITE_GOOGLE_TRANSLATE_KEY}
      >
        <span></span>
        <h3 className="details-title">
          <Translate>{title}</Translate>
        </h3>
        <div
          className="details-content"
          dangerouslySetInnerHTML={{ __html: data }}
        ></div>
      </Translator>
    </>
  );
}
