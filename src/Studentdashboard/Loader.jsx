import React from 'react';
import './Loader.css'; // Import CSS for styling
import sitelogo from "./Logo (2).svg"

const Loader = () => {
  return (
    <div className='maincontainer'>
      <span className="loader"><img src={sitelogo} alt='logo' style={{ width: '100px', height: '100px' }} /></span>
    </div>
  );
};

export default Loader;
