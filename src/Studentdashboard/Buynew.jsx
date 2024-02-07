import React, { useEffect, useState,useRef } from 'react';
import { Translator, Translate } from "react-auto-translate";
function Buynew({ options, handleLanguageChange,language,plans,showModal }) {
  const [visibleItems, setVisibleItems] = useState(1);
  const [startIndex, setStartIndex] = useState(0);
  const [dropdownStates, setDropdownStates] = useState([]);

  useEffect(() => {
    const updateVisibleItems = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth >= 1920) {
        setVisibleItems(3);
      } else if (screenWidth >= 1440) {
        setVisibleItems(2);
      } else if (screenWidth >= 1080) {
        setVisibleItems(2);
      } else if (screenWidth >= 786) {
        setVisibleItems(1);
      } else {
        setVisibleItems(1);
      }
  
      // Adjust startIndex if it exceeds the number of plans
      if (startIndex + visibleItems > plans.length) {
        setStartIndex(plans.length - visibleItems);
      }
    };
  
    updateVisibleItems();
  
    const handleResize = () => {
      updateVisibleItems();
    };
  
    window.addEventListener('resize', handleResize);
  
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [startIndex, visibleItems, plans.length]);
  
  
  useEffect(() => {
    const initialDropdownState = plans.map((plan) => {
      // Find the option whose value matches plan.language
      const selectedOption = options.find(option => option.value === plan.language) || options[0];
      
      return {
        isOpen: false,
        selectedOption: selectedOption
      };
    });
    setDropdownStates(initialDropdownState);
  }, [plans, options]);
  
  
  

  const handleClickOutside = (event, index) => {
    const dropdownContainers = document.querySelectorAll('.card-content');
    dropdownContainers.forEach((container, idx) => {
      if (index === idx && !container.contains(event.target)) {
        setDropdownStates(prevStates => {
          const updatedStates = [...prevStates];
          updatedStates[index].isOpen = false;
          return updatedStates;
        });
      }
    });
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      dropdownStates.forEach((state, index) => {
        handleClickOutside(event, index);
      });
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [dropdownStates]);

  const toggleDropdown = (index) => {
    setDropdownStates((prevStates) => {
      const updatedStates = [...prevStates];
      updatedStates[index].isOpen = !updatedStates[index].isOpen;
      return updatedStates;
    });
  };

  const handleOption = (option, index, planId) => {
    alert("this we are here")
    setDropdownStates((prevStates) => {
      const updatedStates = [...prevStates];
      updatedStates[index].selectedOption = option;
      updatedStates[index].isOpen = false;
      return updatedStates;
    });
    handleLanguageChange(option, planId);
  };
  
  
  const showNextItem = () => {
    if (startIndex + visibleItems < plans.length) {
      setStartIndex(startIndex + 1);
    }
  };
  
  const showPreviousItem = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };
  
  

  const showItem = (index) => {
    setStartIndex(index);
  };
  return (
    <>
     <Translator
        from="en"
        to={language || "en"}
        googleApiKey={import.meta.env.VITE_GOOGLE_TRANSLATE_KEY}
      >
        <div className='navigationbtn'>
  {startIndex > 0 && (
            <button className="nextbtns" onClick={showPreviousItem}><i class="fa-solid fa-angle-left"></i></button>
          )}
          {/* Button to show next item */}
          {startIndex < plans.length - 1 && (
            <button className='prebtns' onClick={showNextItem}><i class="fa-solid fa-angle-right"></i></button>
          )} 

</div>
<div className='customslider'>
  <div className='container maincontentslider'>
            <div className='mainconofslider'>                {plans.slice(startIndex, startIndex + visibleItems).map((plan, index) => (
                      <div key={plan._id} className=" card-content mx-auto " >
                        <div className="plancard d-flex mt-2">
                          <img src={plan.image} height="58px" alt="plan1" />
                          <span className="flex-end">


                            <sup className="dollar-sup">$</sup>
                            <span className="main-price"> <Translate>{plan.price / 100}</Translate></span>
                          </span>
                        </div>


                        <span className="classer">  <Translate>{plan.courseName}</Translate></span>
                        <div className="d-flex toper">
                          <div className="categoria">


                            <span> <Translate>Category </Translate></span>
                            <br></br>

                            <strong className="strongcontent">  <Translate>{plan.category}</Translate></strong>
                          </div>

                        </div>

                        <div className="dropdown toper" >
                          <Translate>Select the desired language:</Translate><br></br>
                          <div className="custom-select">
              <div className="selected-option" onClick={() => toggleDropdown(index)}>
                <div className='d-flex'> <img src={dropdownStates[index]?.selectedOption.image} alt={dropdownStates[index]?.selectedOption.label} className="language-image" />
                <span className='mx-2'>{dropdownStates[index]?.selectedOption.label}</span></div>
               
                <i class="fa-solid fa-angle-down downicon"></i>
              </div>
              {dropdownStates[index] && dropdownStates[index]?.isOpen && (
  <div className="options dropoptions">
    {options.map((option) => (
   <div key={option?.value} className="option" onClick={() => { console.log("Option clicked"); handleOption(option, index, plan._id); }}>
   <img src={option?.image} alt={option?.label} className="language-image" />
   <span>{option?.label}</span>
 </div>
 
  
    ))}
  </div>
)}

            </div>
    </div>

<div className="toper   Acesso">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="25"
    viewBox="0 0 24 25"
    fill="none"
  >
    <path
      d="M12 21.8086C16.9706 21.8086 21 17.7792 21 12.8086C21 7.83803 16.9706 3.80859 12 3.80859C7.02944 3.80859 3 7.83803 3 12.8086C3 17.7792 7.02944 21.8086 12 21.8086Z"
      stroke="#FBB723"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 7.55859V12.8086H17.25"
      stroke="#FBB723"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>{" "}
  <span className="mx-2"><Translate>Access:</Translate><strong className="strong-text"> Unlimited</strong> </span>
</div>
<div className="mt-3  Acesso">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="25"
    viewBox="0 0 24 25"
    fill="none"
  >
    <path
      d="M12 17.3086C16.1421 17.3086 19.5 13.9507 19.5 9.80859C19.5 5.66646 16.1421 2.30859 12 2.30859C7.85786 2.30859 4.5 5.66646 4.5 9.80859C4.5 13.9507 7.85786 17.3086 12 17.3086Z"
      stroke="#FBB723"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 14.3086C14.4853 14.3086 16.5 12.2939 16.5 9.80859C16.5 7.32331 14.4853 5.30859 12 5.30859C9.51472 5.30859 7.5 7.32331 7.5 9.80859C7.5 12.2939 9.51472 14.3086 12 14.3086Z"
      stroke="#FBB723"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16.5 15.8086V23.3086L12 21.0586L7.5 23.3086V15.8086"
      stroke="#FBB723"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>{" "}
  <span  className="mx-2"><Translate>TPR Certified:</Translate><strong className="strong-text"> Yes</strong> </span>
</div>
<button
  className=" buy-button "
  style={{ marginTop: "40px" }}
  onClick={() => { showModal(plan) }}
>
  <Translate>Buy Now</Translate>
</button>

</div>
))}
  

</div>
<div className="navigation-dots">
            {plans.map((plan, index) => (
              <span
                key={plan._id}
                className={index === startIndex ? "dot active" : "dot"}
                onClick={() => showItem(index)}
              ></span>
            ))}
          </div>
        </div>
</div>
        
    

     
</Translator>       
    </>
   
  );
}

export default Buynew;
