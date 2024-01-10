import React, { useState } from "react";
import { motion } from "framer-motion";
import { Translator, Translate } from "react-auto-translate";
import { useSelector } from "react-redux";
import { Modal, Button, } from 'antd';

export default function NewsLetter({ language }) {
  const [email, setEmail] = useState("");
  const languageState = useSelector((state) => state.language);
  const [modalVisible, setModalVisible] = useState(false);
  const showModal = () => {
    setModalVisible(true);
    
  };
  const handleCancel = () => {
    setModalVisible(false);
  };
  return (
    <Translator
      from="en"
      to={languageState?.language?.value || "en"}
      googleApiKey={import.meta.env.VITE_GOOGLE_TRANSLATE_KEY}
    >
      <div className="subscribe-area">
        <div className="container ">
          <div className="subscribe-content">
            <span className="sub-title" onClick={showModal}>
              <Translate>Go At Your Own Pace</Translate>
            </span>
            <h2 className="title">
              <Translate>Subscribe To Our Newsletter</Translate>
            </h2>
            <p>
              <Translate>
                Stay ahead of the competition with United ELDTs comprehensive
                online Entry Level Driving Training course. Subscribe to our
                newsletter for exclusive updates and industry insights.
              </Translate>
            </p>

            <form className="newsletter-form" onSubmit={() => {}}>
              <input
                type="email"
                className="input-newsletter"
                placeholder="Enter your email address"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <motion.button type="submit" className="default-btn">
                <Translate>Subscribe</Translate>
              </motion.button>
            </form>
          </div>
        </div>
      </div>
      <Modal title="Payment Modal" open={modalVisible} onCancel={handleCancel}></Modal>

    </Translator>
    
  );
}
