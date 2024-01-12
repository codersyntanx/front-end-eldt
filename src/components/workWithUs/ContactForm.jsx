import React from "react";
import TailwindLoader from "../../utils/tailwindLoader";
import { Translator, Translate } from "react-auto-translate";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Axios } from "axios";

export default function ContactForm({ language }) {
const [name,setName]=useState("");
const [email,setEmail]=useState("");
const [phone,setPhone]=useState("");
const [message,setMessage]=useState("");
const [subject, setSubject]=useState("");

  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const sendEmail = async (e) => {
    e.preventDefault()
    setLoading(true);
  
    try {
      const response = await Axios.post("https://your-email-endpoint.com", {
        name,
        email,
        phone,
        message,
        subject,
      });
  
      // Handle the response here
      console.log(response.data); // You might want to do something with the response data
  
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
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
            <Translate>Ready to Begin?</Translate>
          </h2>
          <p>
            <Translate>
            Your email address will not be published. Required fields are marked
            </Translate>
            *
          </p>

          <form id="contactForm">
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
                    value={name}
                    onChange={(e)=>{setName(e.target.value)}}
                    required
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
                    value={email}
                    onChange={(e)=>{setEmail(e.target.value)}}
                    required
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
                    value={phone}
                    onChange={(e)=>{setPhone(e.target.value)}}
                    required
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
                    placeholder="Subject"
                    name="subject"
                    value={subject}
                    onChange={(e)=>{setSubject(e.target.value)}}
                    required
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
                    value={message}
                    onChange={(e)=>{setMessage(e.target.value)}}
                    required
                  />
                </label>
              </div>

              <div className="item text-center">
                <button
                  type="submit"
                  className="default-btn"  
                  onClick={sendEmail}                
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
