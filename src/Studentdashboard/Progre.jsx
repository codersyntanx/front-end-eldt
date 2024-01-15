import { Modal } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
function Progre() {
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
useEffect(()=>{
  const personId = localStorage.getItem("userId")
  if(personId){
    const decoded = jwtDecode(personId);
    setUserId(decoded.id)
  }
},[])
console.log(userId)
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

    if (!middleName.trim()) {
      errors.middleName = 'Middle name is required';
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
    console.log(Object.keys(errors).length)
    if (Object.keys(errors).length === 0) {
      axios.put(`http://localhost:3003/api/putstudent/${userId}`,{
        firstName,
        middleName,
        lastName,
        dateOfBirth :`${year}/${month}/${day}`,
        licenseNumber,
        state
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
<label className="fomlbl">Year</label>
<div class="dropdown">
  <button class="btn dpbtn registinput dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    1994 
  </button>
  <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="#">1995</a></li>
    <li><a class="dropdown-item" href="#">1996</a></li>
    <li><a class="dropdown-item" href="#">1997</a></li>
    <li><a class="dropdown-item" href="#">1998</a></li>
    <li><a class="dropdown-item" href="#">1999</a></li>
    <li><a class="dropdown-item" href="#">2000</a></li>
    <li><a class="dropdown-item" href="#">2001</a></li>
    <li><a class="dropdown-item" href="#">2002</a></li>
    <li><a class="dropdown-item" href="#">2003</a></li>
    <li><a class="dropdown-item" href="#">2004</a></li>
    <li><a class="dropdown-item" href="#">2005</a></li>
  </ul>
</div>
</div>
<div className="dateob">
<label className="fomlbl">Month</label>
<div class="dropdown">
  <button class="btn registinput dpbtn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    {month}
  </button>
  <ul class="dropdown-menu">
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
  <button class="btn dpbtn registinput dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    {day}
  </button>
  <ul class="dropdown-menu">
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
            <input
              className={`registinput ${errors.state ? 'error-border' : ''}`}
              type="text"
              placeholder="State"
              value={state}
              onChange={(e) => setState(e.target.value)}
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
      {/* <Modal
        title="Title"
        open={modalvisible}
        onCancel={hided}
        footer={null}
      >
        <p>this text</p>
      </Modal> */}
    </>
  );
}

export default Progre;
