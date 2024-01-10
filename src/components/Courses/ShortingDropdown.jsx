import React from "react";
import { useState } from "react";
import { Translator, Translate } from "react-auto-translate";
import { useSelector } from "react-redux";

export default function ShortingDropdown() {
  const languageState = useSelector((state) => state.language);
  const [short, setShort] = useState("");

  return (
    <>
      <Translator
        from="en"
        to={languageState?.language?.value || "en"}
        googleApiKey={import.meta.env.VITE_GOOGLE_TRANSLATE_KEY}
      >
        <div className="unitedeldt-grid-sorting">
          <div className="ordering">
            <div className="select-box">
              <select
                className="form-select"
                name="short"
                value={short}
                onChange={(e) => setShort(e.target.value)}
              >
                <option value="">
                  <Translate>Sort By</Translate>
                </option>
                <option value="ASC">
                  <Translate late>Price: low to high</Translate>
                </option>
                <option value="DESC">
                  <Translate>Price: high to low</Translate>
                </option>
              </select>
            </div>
          </div>
        </div>
      </Translator>
    </>
  );
}
