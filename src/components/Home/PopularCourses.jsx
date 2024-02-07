import axios, { Axios } from "axios";
import { Translator, Translate } from "react-auto-translate";
import CourseCard from "./CourseCard";
import { getApprovedCourses } from "../../services/Guest";
import { Link } from "react-router-dom";
import { setLanguage } from "../../store/UserActions";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CourseCardNew from "./CourseCardNew";
import { useSelector } from "react-redux";
import Select from 'react-select';
import { useSpring, animated } from "react-spring";
import "./courses.css"
import { useState, useEffect, useRef } from 'react';
import { Modal, Button, notification } from 'antd';
import google from "./images/google-pay-38 1.png"
import apple from "./images/apple-logo-png-apple-mac-vector-logo-download-23 1.png"
import Successi from "./images/Group 6674.png"
import errir from "./images/Group 6674 (2).png"
import { jwtDecode } from "jwt-decode";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
  PaymentRequestButtonElement
} from '@stripe/react-stripe-js';
import CustomDropdown from "./CustomDropdown";
import Buynew from "../../Studentdashboard/Buynew";



const customStyles = {
  control: (provided, state) => ({
    ...provided,
    minHeight: '50px', // Adjust the height of the input field
  }),
  menu: (provided, state) => ({
    ...provided,
    position: 'absolute !important',
    zIndex: '9999 !important',
    overflow: 'visible !important',
    height: "fit-content !important"
  }),
  option: (provided, state) => ({
    ...provided,
    height: '35px !important',
    overflow: 'visible !important',

  }),
};


function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "#FBB723",
        width: "50px",
        borderRadius: "50px",
        height: "50px",
        position: "absolute",
        top: "50%",
        right: "-94px",
        right: 0,
        transform: "translateY(-50%)",
        zIndex: 1,
        textAlign: "center",
        lineHeight: "50px",
        color: "white",
      }}
      onClick={onClick}
    >
      <span style={{ color: "black" }}>Hello</span>
    </div>
  );
}

function SamplepreArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "#FBB723", width: "50px", borderRadius: "50px", height: "50px" }}
      onClick={onClick}
    >Hello</div>
  );
}
export default function PopularCourses({ language ,showCancelButton,handleNavigationClick,large,medium }) {
  const userState = useSelector((state) => state.user);
  const [selectedLang, setSelected] = useState("all");
  const [loading, setLoading] = useState(true);
  const [InitialCourses, setInitialCourses] = useState([]);
  const [localLang, setLocalLang] = useState(language);
  const [courses, setCourses] = useState([]);
  const [cardholderName, setCardholderName] = useState('');
  const [billingAddress, setBillingAddress] = useState('');
  const [zip, setZip] = useState('');
  const [email, setEmail] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [purchase, setpurchase] = useState("")
  const [succ, setSucc] = useState(false)
  const [err, setErr] = useState(false)
  const [available, setAvailable] = useState(false)
  const [coulan, setCoulan] = useState("English")
  const [plans, setPlans] = useState([]);
  const [userId, setUserId] = useState(null);
  const [confirmemail, setConfirmemail] = useState("");

  useEffect(() => {
    const personId = localStorage.getItem("userId");
    if (personId) {
      const decoded = jwtDecode(personId);
      setUserId(decoded);  
      setEmail(decoded.Email)  
      setConfirmemail(decoded.Email)
      setBillingAddress(decoded.Address)
      setCardholderName(decoded.Name)  
      setZip(decoded.zip)
      setBillingAddress(decoded.Address)
    }},[])
  const languageOptions = [
    { value: 'English', label: 'English', image: "https://img.icons8.com/color/24/usa-circular.png", planId: null },
    { value: 'Spanish', label: 'Spanish', image: "https://img.icons8.com/color/24/spain2-circular.png", planId: null },
    { value: 'Portuguese', label: 'Portuguese', image: "https://img.icons8.com/color/24/brazil-circular.png", planId: null },
    { value: 'Russian', label: 'Russian', image: "https://img.icons8.com/color/24/russian-federation-circular.png", planId: null },
    { value: 'Arabic', label: 'Arabic', image: "https://img.icons8.com/color/24/palestine-circular.png", planId: null },
    { value: 'Hindi', label: 'Hindi', image: "https://img.icons8.com/fluency/24/india-circular.png", planId: null },
    { value: 'French', label: 'French', image: "https://img.icons8.com/color/24/france-circular.png", planId: null },
    { value: 'Urdu', label: 'Urdu', image: "https://img.icons8.com/color/24/pakistan-circular.png", planId: null },
  ];
  const visibleModal = () => {
    setSucc(true)
  }
  const errModal = () => {
    setErr(true)
  }
  const availblemodal = () => {
    setAvailable(true)
  }
  const hideModal = () => {
    setSucc(false)
  }
  const hideavailble = () => {
    setAvailable(false)
  }
  const errhideModal = () => {
    setErr(false)
    setModalVisible(true);

  }

  const showModal = async (courseId) => {
    setModalVisible(true);

    setpurchase(courseId)



  };
  const handleCancel = () => {
    setModalVisible(false);
  };
  const stripe = useStripe();
  const elements = useElements();

  const openNotification = (type, message) => {
    notification[type]({
      message,
      duration: 3,
    });
  };

  function removeErrorBorder(elementId) {
    const element = document.getElementById(elementId);
    if (element.classList.contains('error-border')) {
      element.classList.remove('error-border');
    }
  }
function isValidEmail(email) {
    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    
    if (isValid) {
        console.log('Email is valid.');
        return true;
    } else {
        console.log('Email is invalid.');
        return false;
    }
}
  const handlePayment = async () => {
    if (!isValidEmail(email)) {
        openNotification("error", "Please enter a valid email address");
        return;
    }
    if (!cardholderName || !email || !billingAddress || !zip) {
      // Handle validation errors
      if (!cardholderName) document.getElementById('cardholderName').classList.add('error-border');
      if (!email) document.getElementById('email').classList.add('error-border');
      if (!billingAddress) document.getElementById('billingAddress').classList.add('error-border');
      if (!zip) document.getElementById('zip').classList.add('error-border');
      if (!confirmemail) document.getElementById('confirmedemail').classList.add('error-border');
      return;
    }
  if(email != confirmemail){
        openNotification("error","Confirm Email must be same")
    return;
  }
    try {
      setLoading(false);
  
      // Create payment intent
      const response = await axios.post('https://server-of-united-eldt.vercel.app/api/create-payment-intents', {
        amount: purchase.price,
        courseEnrollments: [
          {
            courseId: purchase._id,
            lessonIndex: 0,
            language: purchase.language || 'English', 
          },
        ],
        fullName: cardholderName,
        Email: email,
        price: purchase.price,
        address: billingAddress,
        zip: zip,
      });
  if(response.data.available === true){
    availblemodal()
    return
  }
      if (response.status === 200) {
        // Confirm payment
        const confirmPayment = await stripe.confirmCardPayment(response.data.clientSecret, {
          payment_method: {
            card: elements.getElement(CardNumberElement),
          },
        });
  
        if (confirmPayment.paymentIntent.status === 'succeeded') {
          // Payment confirmed, now create or update student
          await axios.post("https://server-of-united-eldt.vercel.app/api/testersuccessuser", {
            amount: purchase.price,
            courseEnrollments: [
              {
                courseId: purchase._id,
                lessonIndex: 0,
                language: purchase.language,
              },
            ],
            fullName: cardholderName,
            Email: email,
            price: purchase.price,
            address: billingAddress,
            zip: zip,
          });
  
          console.log('Payment confirmed');
          setModalVisible(false);
          visibleModal();
        } else {
          throw new Error('Payment failed. Please try again.');
        }
      } else {
        throw new Error('Failed to create payment intent. Please try again.');
      }
    } catch (error) {
      console.error('Payment error:', error.message);
      errModal();
      setModalVisible(false);
    } finally {
      setLoading(true);
    }
  };
  const handleupward = (idofinput) => {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 786) {
      const targetElement = document.getElementById(idofinput);
      if (targetElement) {
          // Calculate the scroll position by subtracting 100 pixels
          const scrollPosition = targetElement.offsetTop - 100;
          window.scrollTo({ top: scrollPosition, behavior: 'smooth' });

          setTimeout(() => {
              const modalContent = document.getElementById(idofinput); // Selector for Ant Design modal's content
              if (modalContent) {
                  modalContent.style.marginTop = '40px';
              }
          }, 100);
      }
    }

};

  
  
  
  
  
  
  
  
  


  const handleLanguageChange = (selectedOption, planId) => {
    // Update language in state
    setCoulan(selectedOption.value);

    // Find the index of the plan with the specified planId
    const planIndex = plans.findIndex(plan => plan._id === planId);

    if (planIndex !== -1) {
      // Create a copy of the plans array to avoid mutating state directly
      const updatedPlans = [...plans];

      // If language property doesn't exist in the plan, add it
      if (!updatedPlans[planIndex].language) {
        updatedPlans[planIndex].language = selectedOption.value;
      } else {
        // Update the language of the plan with the specified planId
        updatedPlans[planIndex] = {
          ...updatedPlans[planIndex],
          language: selectedOption.value,
        };
      }

      // Update the state with the modified plans
      setPlans(updatedPlans);
      console.log(updatedPlans);
    }
  };




  useEffect(() => {
    axios.get("https://server-of-united-eldt.vercel.app/api/courses").then((res) => {
      setPlans(res.data);
    });
  }, []);

  const [activeDot, setActiveDot] = useState(0);
  const propsSpring = useSpring({
    opacity: 1,
    marginTop: "0px",
    marginBottom: "0px",
    from: { opacity: 0 },
  });
  const handleBeforeChange = (oldIndex, newIndex) => {
    setActiveDot(newIndex);
  };
  const CustomDropdownIndicator = () => (
    <div className="custom-dropdown-indicator">
      <img width="24" height="24" src="https://img.icons8.com/material-sharp/24/expand-arrow--v1.png" alt="expand-arrow--v1" />  </div>
  );


  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplepreArrow />,
    customPaging: (i) => (
      <div
        className={`custom-dot ${i === activeDot ? "active" : ""}`}
        key={i}
        onClick={() => setActiveDot(i)}
        style={{
          position: "relative",
          bottom: "0px",
          width: "20px",
          height: "20px",
          background: i === activeDot ? "#FFD87F" : "#999",
          borderRadius: "50%",
          margin: "0 5px",
          cursor: "pointer",
          marginTop: i === activeDot ? "10px" : "10px",
          transition: "all 0.3s ease-in-out",
        }}
      ></div>
    ),
    beforeChange: handleBeforeChange,
  };



  // Responsive settings
  const responsiveSettings = [
    {
      breakpoint: 2400,
      settings: {
        slidesToShow: 5,
        dots: false
      },
    },
    {
      breakpoint: 1920,
      settings: {
        slidesToShow: 4,
        dots: false,

      },
    },
    {
      breakpoint: 1440,
      settings: {
        slidesToShow: 3,
        dots: false,

      },
    },

    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,

      },
    },
    {
      breakpoint: 786,
      settings: {
        slidesToShow: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
      },
    },
  ];

  // Combine main settings with responsive settings
  const combinedSettings = { ...settings, responsive: responsiveSettings };



  return (
    <>
      <Translator
        from="en"
        to={language || "en"}
        googleApiKey={import.meta.env.VITE_GOOGLE_TRANSLATE_KEY}
      >
        <div className="courses-area tw-my-3" id="courses">
          <div className="container p-4">
            <div className="section-title">
              <span className="sub-title">
                <Translate>Take the course your way</Translate>
              </span>
              <h3 className="tab-title" >
                <Translate>Choose a course in the language of your preference</Translate>
              </h3>
              <span className="sub">
                <Translate>
                  Enjoy high-level learning methods; you are the creator of your own career, and we will guide you every step of the way
                </Translate>
              </span>
            </div>



          </div>
        </div>











        {
          plans.length > 0 ? (
            <>


              {/* <div className="caroselcomponent">
                <animated.div style={propsSpring} className="container" >
                  <Slider {...combinedSettings}>
                    {plans.map((plan) => (
                      <div key={plan._id} className=" card-content mx-auto" >
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
                          <Translate>Select the desired language:</Translate><br></br> */}

                          {/* <Select
                            options={languageOptions}
                            className="mt-1"
                            menuPosition="absolute"
                            classNamePrefix="languageSelect"
                            onClick={() => godown()}
                            isSearchable={false}
                            onChange={(selectedOption) => handleLanguageChange(selectedOption, plan._id)}
                            defaultValue={languageOptions.find((option) => option.value === 'English')}
                            getOptionLabel={(option) => (
                              <div className="d-flex align-items-center" style={{ height: "fit-content", zIndex: "9999" }}>
                                <img src={option.image} alt={option.label} className="language-image" />
                                &nbsp; {option.label}
                              </div>
                            )}
                            styles={customStyles}
                            components={{ DropdownIndicator: CustomDropdownIndicator }}
                          /> */}
                          <div className="customcard">
                                              <CustomDropdown options={languageOptions} handleLanguageChange={handleLanguageChange} language={language} plans={plans}  large={large} medium={medium} showModal={showModal}/>

                          </div>
{/* <div className="buynewcourse">
                                               <Buynew options={languageOptions} handleLanguageChange={handleLanguageChange} language={language} plans={plans} showModal={showModal}/>
</div> */}



                        {/* </div>

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
                  </Slider>
                </animated.div>
              </div> */}
            </>
          ) : (
            <>
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", }}>

                <span>Loading...</span>

              </div>
            </>
          )
        }


        <Modal
          open={modalVisible}
          onCancel={handleCancel}
          className="custom-modal"
          closeIcon={null}
          footer={null} 
         id="mainmodalforpay"
        >
          <div className="mainblack">
            <span className="pricetxt">${purchase.price / 100}.00</span><br></br>
            <span className="description"><span className="categoryi"> {purchase.courseName} </span>
              {
                purchase.language ? (
                  <>({purchase.language})  </>
                ) : (
                  <>(English) </>
                )
              }

                - ELDT Theory certificate
            </span>
          </div>
          <div className="main-content paymentmodal">
            {/* Your payment form and input fields */}
            <div className="gpay">
              <button className="gpaybtn"><img src={google} alt="google" /> PAY</button>
              <button className="applebtn"><img src={apple} alt="apple" /> PAY</button>
            </div>

      
            <input
  type="text"
  className="form-control fnam"
  id="cardholderName"
  placeholder="Full Name"
  value={userId !== null ? userId.Name : cardholderName}
  readOnly={userId !== null}
  onClick={()=>{handleupward("cardholderName")}}
  onFocus={()=>{handleupward("cardholderName")}}
  onChange={(e) => {
    setCardholderName(e.target.value);
    removeErrorBorder('cardholderName');
  }}
/>
<input
  type="text"
  className="form-control fnam"
  id="email"
  placeholder="Email address"
  value={userId !== null ? userId.Email : email}
  readOnly={userId !== null}
  onClick={()=>{handleupward("email")}}
  onFocus={()=>{handleupward("cardholderName")}}
  onChange={(e) => {
    setEmail(e.target.value.toLowerCase());
    removeErrorBorder('email'); // Call removeErrorBorder to remove error class
  }}
/>
<input
  type="text"
  className="form-control fnam"
  id="confirmedemail"
  placeholder="Confirm Email address"
  value={userId !== null ? userId.Email : confirmemail}
  readOnly={userId !== null}
  onClick={()=>{handleupward("confirmedemail")}}
  onFocus={()=>{handleupward("cardholderName")}}

  onChange={(e) => {
    setConfirmemail(e.target.value.toLowerCase());
  }}
/>

            <label className="labeltext">
              <span className="pasword">Payment information</span>
              <span className="secure"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M13 5.5H3C2.72386 5.5 2.5 5.72386 2.5 6V13C2.5 13.2761 2.72386 13.5 3 13.5H13C13.2761 13.5 13.5 13.2761 13.5 13V6C13.5 5.72386 13.2761 5.5 13 5.5Z" stroke="#2C292A" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M5.75 5.5V3.25C5.75 2.65326 5.98705 2.08097 6.40901 1.65901C6.83097 1.23705 7.40326 1 8 1C8.59674 1 9.16903 1.23705 9.59099 1.65901C10.0129 2.08097 10.25 2.65326 10.25 3.25V5.5" stroke="#2C292A" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
              </svg> Secure</span>
            </label>

            <CardNumberElement className="card-element numcard" />
            <div className="d-flex">
              <CardExpiryElement className="card-element numcard2" />
              <CardCvcElement className="card-element numcard3" style={{ width: '100px' }} />
            </div>
            {/* Billing address input fields */}
            <label className="labeltext">
              <span className="pasword">Country or region</span>
            </label>
          
            <input
  type="text"
  className="form-control fnam"
  id="billingAddress"
  placeholder="Address"
  value={userId !== null ? userId.Address : billingAddress}
  readOnly={userId !== null}
  onClick={()=>{handleupward("billingAddress")}}
  onFocus={()=>{handleupward("cardholderName")}}
  onChange={(e) => {
    setBillingAddress(e.target.value);
    removeErrorBorder('billingAddress');
  }}
/>

<input
  type="text"
  className="form-control fname"
  placeholder="Zip code"
  id="zip"
  value={userId !== null ? userId.zip : zip}
  readOnly={userId !== null}
  onClick={()=>{handleupward("zip")}}
  onFocus={()=>{handleupward("cardholderName")}}
  onChange={(e) => {
    setZip(e.target.value);
    removeErrorBorder('zip');
  }}
/>
            <div className="termdiv">
              <span className="term"> By continuing, you agree to the  <span className="condition">Terms of service </span></span>
            </div>
            <button className="buybtn" onClick={handlePayment}>
              {
                loading ? (
                  <>
                    Place your order:${purchase.price / 100}.00 USD
                  </>
                ) : (
                  <>
                    Processing...
                  </>
                )
              }
            </button>
          </div>
          <div className="cancel" onClick={handleCancel}>Cancel</div>
        </Modal>

        <Modal
          open={succ}
          onCancel={hideModal}
          closeIcon={null}
          footer={null}
        >
          <div className="mainbody">
            <div className="imgalign">
              <img src={Successi} alt="success" />
            </div>
            <span className="message">Payment successfully processed</span><br></br>
            <span className="exp">Congratulations! You are now part of United. Click the button below to start your studies.</span>
            {
              showCancelButton ?( <Link to="/login"><button className="buybtn">Start Now</button></Link>):( <button onClick={()=>{handleNavigationClick("information")}} className="buybtn">Start Now</button>)
            }
           
            {/* <Link to="/studentdash"><button className="buybtn2">Start Now</button></Link> */}
          </div>
        </Modal>
        <Modal
          open={err}
          onCancel={errhideModal}
          closeIcon={null}
          footer={null}
        >
          <div className="mainbody">
            <div className="imgalign">

              <img src={errir} alt="success" />
            </div>
            <span className="message" style={{ marginTop: "24px" }}>Error processing payment</span><br></br>
            <span className="exp" >Please try again. If the issue persists, contact your card issuer or try using another card.</span>
            <button className="buybtn" onClick={errhideModal}>To try again</button>
          </div>
        </Modal>
        <Modal
          open={available}
          onCancel={hideavailble}
          closeIcon={null}
          footer={null}
        >
          <div className="mainbody">
            <div className="imgalign">

              <img src={errir} alt="success" />
            </div>
            <span className="message" style={{ marginTop: "24px" }}>You have already purchase this course</span><br></br>
            <span className="exp" >Please buy another course or select diffrent language</span>
            <button className="buybtn" onClick={hideavailble}>To try again</button>
          </div>
        </Modal>
      </Translator>
    </>
  );
}
