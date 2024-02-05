import React from 'react';
import './Loader.css'; // Import CSS for styling
import sitelogo from "./LOGO ELDT 2024 04 Artboard 5.svg"
import loaderimage from "./loaderimage.png"
const Loader = () => {
  return (
    <div className='logocon'>
      <div className='maincontainer'>
      {/* <span className="loader "></span> */}
      <img className='comlogo' src={sitelogo} alt='logo'  style={{width:"100px"}}/>
      <img src={loaderimage} alt='logo' className='loadermain' />

    </div>
    
    </div>
  
  );
};

export default Loader;
