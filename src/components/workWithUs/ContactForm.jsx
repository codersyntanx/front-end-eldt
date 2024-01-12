import React from "react";
import TailwindLoader from "../../utils/tailwindLoader";
import { Translator, Translate } from "react-auto-translate";
import { useState } from "react";
import { useSelector } from "react-redux";
import  axios  from "axios";
import successi from "./Group 6674.png"
export default function ContactForm({ language }) {
const [name,setName]=useState("");
const [email,setEmail]=useState("");
const [phone,setPhone]=useState("");
const [message,setMessage]=useState("");
const [subject, setSubject]=useState("");
const [sent, setSent]=useState(true)
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const sendEmail = async (e) => {
    e.preventDefault()
    setLoading(true);
  
    try {
      const response = await axios.post("http://localhost:3003/api/contactusemail", {
        name,
        email,
        phone,
        message,
        subject,
      });
  
    if(response.data.message === "Email sent successfully"){
setSent(false)
    }
  
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
{
  sent ?(
    <>
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
                 
                  {loading ?  <Translate>Sending....</Translate> :  <Translate>Send Message</Translate>}
                </button>
              </div>
            </div>
          </form>
    </>
  ):(<>
  <div className="successsent">
    <div className="d-flex justify-content-center">
    <img src={successi} alt=" success"/>

    </div>
 <Translate>
  Your data has been successfully submitted;</Translate> <br></br>
  <Translate>please await our team's response.</Translate> 
  </div>
    </>)
}
         
        </div>
      </Translator>
    </>
  );
}
