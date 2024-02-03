import React from 'react';
import './Loader.css'; // Import CSS for styling
import sitelogo from "./loaderlogo.png"
import loaderimage from "./loaderimage.png"
const Loader = () => {
  return (
    <div className='maincontainer'>
      {/* <span className="loader "></span> */}
      <img src={sitelogo} alt='logo'  style={{position:"absolute"}}/>
      <img src={loaderimage} alt='logo' className='loadermain' />

    </div>
  );
};

export default Loader;
