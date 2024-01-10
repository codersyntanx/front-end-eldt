import React from "react";
import TailwindLoader from "../../utils/tailwindLoader";
import { Translator, Translate } from "react-auto-translate";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function ContactForm({ language }) {
  const INITIAL_STATE = {
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  };

  const [contact, setContact] = useState(INITIAL_STATE);
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <>
      <Translator
        from="en"
        to={language || "en"}
        googleApiKey={import.meta.env.VITE_GOOGLE_TRANSLATE_KEY}
      >
        <div className="contact-form">
          <h2>
            <Translate>Ready to Get Started?</Translate>
          </h2>
          <p>
            <Translate>
              Your email address will not be published. Required fields are
              marked
            </Translate>
            *
          </p>

          <form id="contactForm" onSubmit={() => {}}>
            <div className="contact-row">
              <div className="item">
                <label>
                  <span>
                    <Translate>Your Name</Translate>
                  </span>
                  <input
                    type="text"
                    placeholder="Placeholder"
                    name="name"
                    value={contact.name}
                    onChange={handleChange}
                  />
                </label>
              </div>

              <div className="item">
                <label>
                  <span>E-mail</span>
                  <input
                    type="text"
                    placeholder="Ex. meuemail@email.com"
                    name="email"
                    value={contact.email}
                    onChange={handleChange}
                  />
                </label>
              </div>

              <div className="item">
                <label>
                  <span>
                    <Translate>Telephone</Translate>
                  </span>
                  <input
                    type="text"
                    placeholder="Ex. +1 (240) 9875-8956"
                    name="phone"
                    value={contact.phone}
                    onChange={handleChange}
                  />
                </label>
              </div>

              <div className="item">
                <label>
                  <span>
                    <Translate>Subject</Translate>
                  </span>
                  <input
                    type="text"
                    name="subject"
                    value={contact.subject}
                    onChange={handleChange}
                    // placeholder={<Translate>Subject</Translate>}
                    placeholder="Subject"
                  />
                </label>
              </div>

              <div className="item">
                <label>
                  <span>
                    <Translate>Message</Translate>
                  </span>
                  <textarea
                    cols="30"
                    rows="5"
                    placeholder="Write your message..."
                    name="message"
                    value={contact.message}
                    onChange={handleChange}
                  />
                </label>
              </div>

              <div className="item text-center">
                <button
                  type="submit"
                  className="default-btn"
                  disabled={disabled}
                >
                  <Translate>Send Message</Translate>{" "}
                  {loading ? <TailwindLoader /> : ""}
                </button>
              </div>
            </div>
          </form>
        </div>
      </Translator>
    </>
  );
}
