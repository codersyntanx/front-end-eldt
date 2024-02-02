import React, { useState } from "react";
import { motion } from "framer-motion";
import { Translator, Translate } from "react-auto-translate";
import { useSelector } from "react-redux";
import { Modal, Button } from 'antd';
import axios from "axios";
import done from "./Group 6674.png"
export default function NewsLetter() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const { language } = useSelector((state) => state.language);
 const [mailsent , setMailsent]=useState(true)
 const [loading ,setLoading]=useState(true)
 const sendEmail = async () => {
  setLoading(false);

  try {
    // Validate email
    if (!email || !isValidEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    const response = await axios.post("https://server-of-united-eldt.vercel.app/api/sennews", {
      Email: email,
    });

    if (response.data.message === 'Email sent successfully') {
      setMailsent(false);
    }

    // Clear error and reset email field after successful submission
    setError("");
    setEmail("");
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(true);
  };
};


  const isValidEmail = (email) => {
    // You can use a regex or a more sophisticated validation library
    // This is a simple example using a regex for a basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <Translator
      from="en"
      to={language?.value || "en"}
      googleApiKey={import.meta.env.VITE_GOOGLE_TRANSLATE_KEY}
    >
      <div className="subscribe-area">
        <div className="container">
          <div className="subscribe-content">
            <span className="sub-title">
              <Translate>Go At Your Own Pace</Translate>
            </span>
            <h2 className="title">
              <Translate>Subscribe To Our Newsletter</Translate>
            </h2>
            <p>
              <Translate>
              Stay ahead of the competition with the comprehensive online entry-level driver training course from United ELDT. Subscribe to our newsletter for exclusive updates and industry insights.
              </Translate>
            </p>
{
  mailsent ?(<>
  
  <form className={`newsletter-form ${error ? 'error-border' : ''}`} onSubmit={(e) => { e.preventDefault(); sendEmail(); }}>
  <input
    type="email"
    className='input-newsletter'
    placeholder="Enter your email address"
    name="email"
    value={email}
    onChange={(e) => { setEmail(e.target.value); setError(''); }}
    required
  />

  <motion.button type="button" className="default-btn" onClick={sendEmail}>
  {
  loading ? (
    <Translate>Sign up now</Translate>
  ) : (
    <Translate>Sending...</Translate>
  )
}

  </motion.button>
</form>

            {error && <p className="error-message">{error}</p>}

  </>):(<>
  <div className=" successcontent d-flex">
    <img src={done} alt="success"/><span className="emailsent">Email registered successfully</span>
  </div>
  </>)
}
          </div>
        </div>
      </div>
    </Translator>
  );
}
