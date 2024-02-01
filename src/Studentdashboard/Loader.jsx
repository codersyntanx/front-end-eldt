import React, { useState, useEffect } from 'react';
import './Loader.css'; // Import CSS for styling
import sitelogo from "./Logo (2).svg"

const Loader = () => {
  const [activeDot, setActiveDot] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDot(activeDot => (activeDot + 1) % 12); // Assuming 12 dots in total
    }, 300); // Adjust the interval as needed

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loader-container">
      <div className="loader">
        <div className="circle">
          {[...Array(12)].map((_, index) => (
            <div key={index} className={`dot ${activeDot === index ? 'active' : ''}`}></div>
          ))}
        </div>
        <div className="logo"><img src={sitelogo} alt='loader'></img> </div>
      </div>
    </div>
  );
};

export default Loader;
