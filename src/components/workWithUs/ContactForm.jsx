import React from "react";
import { Translator, Translate } from "react-auto-translate";
import { useState } from "react";
import axios from "axios";
import successi from "./Group 6674.png";

export default function ContactForm({ language }) {
  // State variables for form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");

  // State variables for form status
  const [sent, setSent] = useState(true);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Validation function for email
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validation function for the entire form
  const validateForm = () => {
    const newErrors = {};

    // Validate name
    if (!name.trim()) {
      newErrors.name = true;
    }

    // Validate email
    if (!email.trim() || !isValidEmail(email)) {
      newErrors.email = true;
    }

    // Validate phone
    if (!phone.trim()) {
      newErrors.phone = true;
    }

    // Validate subject
    if (!subject.trim()) {
      newErrors.subject = true;
    }

    // Validate message
    if (!message.trim()) {
      newErrors.message = true;
    }

    // Set the errors state
    setErrors(newErrors);

    // Return true if there are no errors
    return Object.keys(newErrors).length === 0;
  };

  // Function to handle form submission
  const sendEmail = async (e) => {
    e.preventDefault();

    // Validate the form
    if (!validateForm()) {
      alert("Please fill in all fields.");
      return;
    }

    // Set loading state to true while sending the email
    setLoading(true);

    try {
      // Send email using axios
      const response = await axios.post("https://server-of-united-eldt.vercel.app/api/contactusemail", {
        name,
        email,
        phone,
        message,
        subject,
      });

      // Check the response and update state accordingly
      if (response.data.message === "Email sent successfully") {
        setSent(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      // Set loading state to false after sending the email
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
