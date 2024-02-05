import { Modal } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import Successi from "./Group 6674.png"
import Select from 'react-select';

function Progre({handleNavigationClick}) {

  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [state, setState] = useState('');
  const [modalvisible, setModalvisible]=useState(false)
  const [userId, setUserId]=useState("")
  const [errors, setErrors] = useState({});
 const [day, setDay]=useState(1)
 const [year, setYear]=useState("1928")
 const stateOptions = [
  { value: 'AL', label: 'Alabama' },
  { value: 'AK', label: 'Alaska' },
  { value: 'AZ', label: 'Arizona' },
  { value: 'AR', label: 'Arkansas' },
  { value: 'CA', label: 'California' },
  { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' },
  { value: 'DE', label: 'Delaware' },
  { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' },
  { value: 'HI', label: 'Hawaii' },
  { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' },
  { value: 'IN', label: 'Indiana' },
  { value: 'IA', label: 'Iowa' },
  { value: 'KS', label: 'Kansas' },
  { value: 'KY', label: 'Kentucky' },
  { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' },
  { value: 'MD', label: 'Maryland' },
  { value: 'MA', label: 'Massachusetts' },
  { value: 'MI', label: 'Michigan' },
  { value: 'MN', label: 'Minnesota' },
  { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' },
  { value: 'MT', label: 'Montana' },
  { value: 'NE', label: 'Nebraska' },
  { value: 'NV', label: 'Nevada' },
  { value: 'NH', label: 'New Hampshire' },
  { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' },
  { value: 'NY', label: 'New York' },
  { value: 'NC', label: 'North Carolina' },
  { value: 'ND', label: 'North Dakota' },
  { value: 'OH', label: 'Ohio' },
  { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' },
  { value: 'PA', label: 'Pennsylvania' },
  { value: 'RI', label: 'Rhode Island' },
  { value: 'SC', label: 'South Carolina' },
  { value: 'SD', label: 'South Dakota' },
  { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' },
  { value: 'UT', label: 'Utah' },
  { value: 'VT', label: 'Vermont' },
  { value: 'VA', label: 'Virginia' },
  { value: 'WA', label: 'Washington' },
  { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' },
  { value: 'WY', label: 'Wyoming' },
];

const handleStateChange = (selectedOption) => {
  setState(selectedOption.label);
};
useEffect(()=>{
  const personId = localStorage.getItem("userId")
  if(personId){
    const decoded = jwtDecode(personId);
    setUserId(decoded.id)
  }
},[])
 const [month, setMonth]=useState("Januarry")

const hided =()=>{
  setModalvisible(false)
}
const show =()=>{
  setModalvisible(true)
}
const forday =(day)=>{
setDay(day)
}
const foryear =(day)=>{
  setYear(day)
  }
const formonth =(day)=>{
  setMonth(day)
  }
  const handleSave = (e) => {
    e.preventDefault()
    const errors = {};

    if (!firstName.trim()) {
      errors.firstName = 'First name is required';
    }


    if (!lastName.trim()) {
      errors.lastName = 'Last name is required';
    }

    // if (!dateOfBirth.trim()) {
    //   errors.dateOfBirth = 'Date of birth is required';
    // }

    if (!licenseNumber.trim()) {
      errors.licenseNumber = 'License number is required';
    }

    if (!state.trim()) {
      errors.state = 'State is required';
    }
    if (Object.keys(errors).length === 0) {
      axios.put(`https://server-of-united-eldt.vercel.app/api/putstudent/${userId}`,{
        firstName,
        middleName,
        lastName,
        dateOfBirth :`${year}/${month}/${day}`,
        licenseNumber,
        state
      })
      .then(res=>{
        if(res.data.status === true){
          setModalvisible(true)
        }
      })
      console.log('Form is valid. Perform save operation.');
    } else {
      setErrors(errors);
    }
  };

  return (
    <>
      <div className="main-contain-regist">
        <div className="card-head">Registration</div>
        <div className="card-body">
          <form>
            <label className="foam-label">First name</label>
            <input
              className={`registinput ${errors.firstName ? 'error-border' : ''}`}
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            {errors.firstName && <div className="error-message"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
<path d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z" stroke="#FE2727" stroke-width="1.5" stroke-miterlimit="10"/>
<path d="M8 5V8.5" stroke="#FE2727" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8 11.5C8.41421 11.5 8.75 11.1642 8.75 10.75C8.75 10.3358 8.41421 10 8 10C7.58579 10 7.25 10.3358 7.25 10.75C7.25 11.1642 7.58579 11.5 8 11.5Z" fill="#FE2727"/>
</svg>{errors.firstName}</div>}

            <label className="foam-label">Middle name</label>
            <input
              className={`registinput ${errors.middleName ? 'error-border' : ''}`}
              type="text"
              placeholder="Middle Name"
              value={middleName}
              onChange={(e) => setMiddleName(e.target.value)}
            />
            {errors.middleName && <div className="error-message"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
<path d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z" stroke="#FE2727" stroke-width="1.5" stroke-miterlimit="10"/>
<path d="M8 5V8.5" stroke="#FE2727" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8 11.5C8.41421 11.5 8.75 11.1642 8.75 10.75C8.75 10.3358 8.41421 10 8 10C7.58579 10 7.25 10.3358 7.25 10.75C7.25 11.1642 7.58579 11.5 8 11.5Z" fill="#FE2727"/>
</svg>{errors.middleName}</div>}

            <label className="foam-label">Last name</label>
            <input
              className={`registinput ${errors.lastName ? 'error-border' : ''}`}
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            {errors.lastName && <div className="error-message"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
<path d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z" stroke="#FE2727" stroke-width="1.5" stroke-miterlimit="10"/>
<path d="M8 5V8.5" stroke="#FE2727" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8 11.5C8.41421 11.5 8.75 11.1642 8.75 10.75C8.75 10.3358 8.41421 10 8 10C7.58579 10 7.25 10.3358 7.25 10.75C7.25 11.1642 7.58579 11.5 8 11.5Z" fill="#FE2727"/>
</svg>{errors.lastName}</div>}
<label className="foam-label">Date of birth</label>
<div className="dobs">
  
<div className="dateob">
<label className="fomlbl">Month</label>
<div class="dropdown">
<div class=" registinput dpbtn"  data-bs-toggle="dropdown" aria-expanded="false">
    <input type='text' style={{width:"100%"}} value={month} onChange={(e)=>{setMonth(e.target.value)}}/>

    <i class="fa-solid fa-angle-down mt-1"></i>
</div>
   
  <ul class="dropdown-menu yeardropdown">
  <li><a class="dropdown-item" onClick={()=>{formonth("January")}}>January</a></li>
    <li><a class="dropdown-item" onClick={()=>{formonth("February")}}>February</a></li>
    <li><a class="dropdown-item" onClick={()=>{formonth("March")}}>March</a></li>
    <li><a class="dropdown-item" onClick={()=>{formonth("April")}}>April</a></li>
    <li><a class="dropdown-item" onClick={()=>{formonth("May")}}>May</a></li>
    <li><a class="dropdown-item" onClick={()=>{formonth("June")}}>June</a></li>
    <li><a class="dropdown-item" onClick={()=>{formonth("July")}}>July</a></li>
    <li><a class="dropdown-item" onClick={()=>{formonth("August")}}>August</a></li>
    <li><a class="dropdown-item" onClick={()=>{formonth("September")}}>September</a></li>
    <li><a class="dropdown-item" onClick={()=>{formonth("October")}}>October</a></li>
    <li><a class="dropdown-item" onClick={()=>{formonth("November")}}>November</a></li>
    <li><a class="dropdown-item" onClick={()=>{formonth("December")}}>December</a></li>
  </ul>
</div>
</div>
<div className="dateob">
<label className="fomlbl">Day</label>
<div class="dropdown">
<div class=" registinput dpbtn"  data-bs-toggle="dropdown" aria-expanded="false">
  <input type='number' style={{width:"100%"}} value={day} onChange={(e)=>{setDay(e.target.value)}}/>
    <i class="fa-solid fa-angle-down mt-1"></i>
</div>
  <ul class="dropdown-menu yeardropdown">
    <li><a class="dropdown-item" onClick={()=>{forday("2")}}>2</a></li>
    <li><a class="dropdown-item"  onClick={()=>{forday("3")}}>3</a></li>
    <li><a class="dropdown-item" onClick={()=>{forday("4")}}>4</a></li>
    <li><a class="dropdown-item" onClick={()=>{forday("5")}}>5</a></li>
    <li><a class="dropdown-item" onClick={()=>{forday("6")}}>6</a></li>
    <li><a class="dropdown-item" onClick={()=>{forday("7")}}>7</a></li>
    <li><a class="dropdown-item" onClick={()=>{forday("8")}}>8</a></li>
    <li><a class="dropdown-item" onClick={()=>{forday("9")}}>9</a></li>
    <li><a class="dropdown-item" onClick={()=>{forday("10")}}>10</a></li>
    <li><a class="dropdown-item" onClick={()=>{forday("11")}}>11</a></li>
    <li><a class="dropdown-item" onClick={()=>{forday("12")}}>12</a></li>
    <li><a class="dropdown-item" onClick={()=>{forday("13")}}>13</a></li>
    <li><a class="dropdown-item" onClick={()=>{forday("14")}}>14</a></li>
    <li><a class="dropdown-item" onClick={()=>{forday("15")}}>15</a></li>
    <li><a class="dropdown-item" onClick={()=>{forday("16")}}>16</a></li>
    <li><a class="dropdown-item" onClick={()=>{forday("17")}}>17</a></li>
    <li><a class="dropdown-item" onClick={()=>{forday("18")}}>18</a></li>
    <li><a class="dropdown-item" onClick={()=>{forday("19")}}>19</a></li>
    <li><a class="dropdown-item" onClick={()=>{forday("20")}}>20</a></li>
    <li><a class="dropdown-item" onClick={()=>{forday("21")}}>21</a></li>
    <li><a class="dropdown-item" onClick={()=>{forday("22")}}>22</a></li>
    <li><a class="dropdown-item" onClick={()=>{forday("23")}}>23</a></li>
    <li><a class="dropdown-item" onClick={()=>{forday("24")}}>24</a></li>
    <li><a class="dropdown-item" onClick={()=>{forday("25")}}>25</a></li>
    <li><a class="dropdown-item" onClick={()=>{forday("26")}}>26</a></li>
    <li><a class="dropdown-item" onClick={()=>{forday("27")}}>27</a></li>
    <li><a class="dropdown-item" onClick={()=>{forday("28")}}>28</a></li>
    <li><a class="dropdown-item" onClick={()=>{forday("29")}}>29</a></li>
    <li><a class="dropdown-item" onClick={()=>{forday("30")}}>30</a></li>
    <li><a class="dropdown-item" onClick={()=>{forday("31")}}>31</a></li>
  </ul>
</div>
</div>
<div className="dateob">
<label className="fomlbl">Year</label>
<div class="dropdown">
  <div class=" registinput dpbtn" data-bs-toggle="dropdown" aria-expanded="false">
  <input type='number' style={{width:"100%"}} value={year} onChange={(e)=>{setYear(e.target.value)}}/>
    <i class="fa-solid fa-angle-down mt-1"></i>
</div>
  <ul class="dropdown-menu yeardropdown">
  <li><a class="dropdown-item" onClick={()=>{foryear("2023")}}>2023</a></li>
  <li><a class="dropdown-item" onClick={()=>{foryear("2022")}}>2022</a></li>
  <li><a class="dropdown-item" onClick={()=>{foryear("2021")}}>2021</a></li>
  <li><a class="dropdown-item" onClick={()=>{foryear("2020")}}>2020</a></li>
  <li><a class="dropdown-item" onClick={()=>{foryear("2019")}}>2019</a></li>
  <li><a class="dropdown-item" onClick={()=>{foryear("2018")}}>2018</a></li>
  <li><a class="dropdown-item" onClick={()=>{foryear("2017")}}>2017</a></li>
  <li><a class="dropdown-item" onClick={()=>{foryear("2016")}}>2016</a></li>
  <li><a class="dropdown-item" onClick={()=>{foryear("2015")}}>2015</a></li>
  <li><a class="dropdown-item" onClick={()=>{foryear("2014")}}>2014</a></li>
  <li><a class="dropdown-item" onClick={()=>{foryear("2013")}}>2013</a></li>
  <li><a class="dropdown-item" onClick={()=>{foryear("2012")}}>2012</a></li>
  <li><a class="dropdown-item" onClick={()=>{foryear("2011")}}>2011</a></li>
  <li><a class="dropdown-item" onClick={()=>{foryear("2010")}}>2010</a></li>
  <li><a class="dropdown-item" onClick={()=>{foryear("2009")}}>2009</a></li>
  <li><a class="dropdown-item" onClick={()=>{foryear("2008")}}>2008</a></li>
  <li><a class="dropdown-item" onClick={()=>{foryear("2007")}}>2007</a></li>
  <li><a class="dropdown-item" onClick={()=>{foryear("2006")}}>2006</a></li>
  <li><a class="dropdown-item" onClick={()=>{foryear("2005")}}>2005</a></li>
  <li><a class="dropdown-item" onClick={()=>{foryear("2004")}}>2004</a></li>
  <li><a class="dropdown-item" onClick={()=>{foryear("2003")}}>2003</a></li>
  <li><a class="dropdown-item" onClick={()=>{foryear("2002")}}>2002</a></li>
  <li><a class="dropdown-item" onClick={()=>{foryear("2001")}}>2001</a></li>
  <li><a class="dropdown-item" onClick={()=>{foryear("2000")}}>2000</a></li>
  <li><a class="dropdown-item" onClick={()=>{foryear("1999")}}>1999</a></li>
  <li><a class="dropdown-item" onClick={()=>{foryear("1998")}}>1998</a></li>
  <li><a class="dropdown-item" onClick={()=>{foryear("1997")}}>1997</a></li>
  <li><a class="dropdown-item" onClick={()=>{foryear("1996")}}>1996</a></li>
  <li><a class="dropdown-item" onClick={()=>{foryear("1995")}}>1995</a></li>
  <li><a class="dropdown-item" onClick={()=>{foryear("1994")}}>1994</a></li>
  <li><a class="dropdown-item" onClick={()=>{foryear("1993")}}>1993</a></li>
  <li><a class="dropdown-item" onClick={()=>{foryear("1992")}}>1992</a></li>
  <li><a class="dropdown-item" onClick={()=>{foryear("1991")}}>1991</a></li>
  <li><a class="dropdown-item" onClick={()=>{foryear("1990")}}>1990</a></li>
  <li><a class="dropdown-item" onClick={()=>{foryear("1989")}}>1989</a></li>
  <li><a class="dropdown-item" onClick={()=>{foryear("1988")}}>1988</a></li>
  <li><a class="dropdown-item" onClick={()=>{foryear("1987")}}>1987</a></li>
  <li><a class="dropdown-item" onClick={()=>{foryear("1986")}}>1986</a></li>
  <li><a class="dropdown-item" onClick={()=>{foryear("1985")}}>1985</a></li>
  <li><a class="dropdown-item" onClick={()=>{foryear("1984")}}>1984</a></li>
  <li><a class="dropdown-item" onClick={()=>{foryear("1983")}}>1983</a></li>
  <li><a class="dropdown-item" onClick={()=>{foryear("1982")}}>1982</a></li>
  <li><a class="dropdown-item" onClick={()=>{foryear("1981")}}>1981</a></li>
  <li><a class="dropdown-item" onClick={()=>{foryear("1980")}}>1980</a></li>
  <li><a class="dropdown-item" onClick={()=>{foryear("1979")}}>1979</a></li>
  <li><a class="dropdown-item" onClick={()=>{foryear("1978")}}>1978</a></li>
  <li><a class="dropdown-item" onClick={()=>{foryear("1977")}}>1977</a></li>
  <li><a class="dropdown-item" onClick={()=>{foryear("1976")}}>1976</a></li>
  <li><a class="dropdown-item" onClick={()=>{foryear("1975")}}>1975</a></li>
  <li><a class="dropdown-item" onClick={()=>{foryear("1974")}}>1974</a></li>
  <li><a class="dropdown-item" onClick={()=>{foryear("1973")}}>1973</a></li>
  <li><a class="dropdown-item" onClick={()=>{foryear("1972")}}>1972</a></li>
  <li><a class="dropdown-item" onClick={()=>{foryear("1971")}}>1971</a></li>
  <li><a class="dropdown-item" onClick={()=>{foryear("1970")}}>1970</a></li>
  <li><a class="dropdown-item" onClick={()=>{foryear("1969")}}>1969</a></li>
  <li><a class="dropdown-item" onClick={()=>{foryear("1968")}}>1968</a></li>
  <li><a class="dropdown-item" onClick={()=>{foryear("1967")}}>1967</a></li>
  <li><a class="dropdown-item" onClick={()=>{foryear("1966")}}>1966</a></li>
  <li><a class="dropdown-item" onClick={()=>{foryear("1965")}}>1965</a></li>
  <li><a class="dropdown-item" onClick={()=>{foryear("1964")}}>1964</a></li>
  <li><a class="dropdown-item" onClick={()=>{foryear("1963")}}>1963</a></li>
  <li><a class="dropdown-item" onClick={()=>{foryear("1962")}}>1962</a></li>
  <li><a class="dropdown-item" onClick={()=>{foryear("1961")}}>1961</a></li>
  <li><a class="dropdown-item" onClick={()=>{foryear("1960")}}>1960</a></li>
 
  </ul>
</div>
</div>
</div>
           
           

            <label className="foam-label">Permit number or license number</label>
            <input
              className={`registinput ${errors.licenseNumber ? 'error-border' : ''}`}
              type="text"
              placeholder="License Number"
              value={licenseNumber}
              onChange={(e) => setLicenseNumber(e.target.value)}
            />
            {errors.licenseNumber && <div className="error-message">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
<path d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z" stroke="#FE2727" stroke-width="1.5" stroke-miterlimit="10"/>
<path d="M8 5V8.5" stroke="#FE2727" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8 11.5C8.41421 11.5 8.75 11.1642 8.75 10.75C8.75 10.3358 8.41421 10 8 10C7.58579 10 7.25 10.3358 7.25 10.75C7.25 11.1642 7.58579 11.5 8 11.5Z" fill="#FE2727"/>
</svg>{errors.licenseNumber}</div>}

            <label className="foam-label">State</label>
            <Select
  options={stateOptions}
  value={stateOptions.find((option) => option.value === state)} // Ensure correct display of selected state
  onChange={handleStateChange}
  placeholder="Select State"
  className={`registinput ${errors.licenseNumber ? 'error-border' : ''}`}
  styles={{
    control: (provided) => ({
      ...provided,
      border: 'none',
      width: '100%',
      outline: 'none', // Remove blue border on focus
      boxShadow: 'none', // Remove box shadow on focus
    }),
  }}
/>


            {errors.state && <div className="error-message">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
<path d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z" stroke="#FE2727" stroke-width="1.5" stroke-miterlimit="10"/>
<path d="M8 5V8.5" stroke="#FE2727" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8 11.5C8.41421 11.5 8.75 11.1642 8.75 10.75C8.75 10.3358 8.41421 10 8 10C7.58579 10 7.25 10.3358 7.25 10.75C7.25 11.1642 7.58579 11.5 8 11.5Z" fill="#FE2727"/>
</svg>{errors.state}</div>}
          </form>
          <div className='buttonsave'>
              <button className="btn-warning" onClick={handleSave}>
            Save
          </button>
          </div>
        
        </div>
      </div>
      {/* <button className='btn btn-danger' onClick={show}>Show modal</button> */}
      
      <Modal
        open={modalvisible}
        onCancel={hided}
        closeIcon={null}
        footer={null} 
       >
<div className="mainbody">
  <div className="imgalign">
    <img src={Successi} alt="success"/>
  </div>
  <span className="message">Information sent successfully</span><br></br>
  <span className="exp">Now you can start your course</span>
<button className="buybtn" onClick={()=>{handleNavigationClick("information")}}>Start now</button>
</div>
       </Modal>
    </>
  );
}

export default Progre;
