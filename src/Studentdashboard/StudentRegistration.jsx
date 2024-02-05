import React, { useEffect, useState } from 'react';
import './Register.css';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import { Modal } from 'antd';
import Successi from "./Group 6674.png"
function StudentRegistration({handleNavigationClick}) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [existingPassword, setExistingPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userId, setUserId]=useState("")
  const [student, setStudent]=useState("")
  const [modalvisible, setModalvisible]=useState(false)

  const [errors, setErrors] = useState({});
  const hided =()=>{
    setModalvisible(false)
  }

  useEffect(() => {
    const personId = localStorage.getItem("userId");
    if (personId) {
      const decoded = jwtDecode(personId);
      setUserId(decoded.id);
      fetchUserInfo();
    }
  }, [userId]);
  
  const fetchUserInfo = () => {
    axios.get(`https://server-of-united-eldt.vercel.app/api/studentbyid/${userId}`)
      .then(res => {
        if (res.data.status === true) {
          setStudent(res.data.student);
        }
      })
      .catch(error => {
        console.error("Error fetching user info:", error);
      });
  };
  

  const handleSave = () => {
    const errors = {};

   

    if (!newPassword.trim()) {
      errors.newPassword = 'New password is required';
    }

    if (newPassword !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(errors).length === 0) {
      console.log(Object.keys(errors).length)
      if (Object.keys(errors).length === 0) {
        axios.put(`https://server-of-united-eldt.vercel.app/api/putstudent/${userId}`,{
        password :newPassword
        })
        .then(res=>{
          if(res.data.status === true){
            setModalvisible(true)
          }
        })
      } else {
        setErrors(errors);
      }      console.log('Form is valid. Perform save operation.');
    } else {
      // Update the state with validation errors
      setErrors(errors);
    }
  };

  return (
    <>
      <div className="main-contain-regist">
        <div className="card-head">My account</div>
        <div className="card-body">
          <form>
          
              <label className="foam-label">First name</label>
            <input
              className="registinput"
              type="text"
              placeholder="Name"
              value={student.firstName}
              readOnly
              style={{backgroundColor:"#F0F0F0"}}
            />
  <label className="foam-label">Middle name</label>
            <input
              className="registinput"
              type="text"
              placeholder="Name"
              value={student.middleName}
              readOnly
              style={{backgroundColor:"#F0F0F0"}}
            />
            <label className="foam-label">Last name</label>
            <input
              className='registinput'
              type="text"
              placeholder="Name"
              value={student.lastName}
              readOnly
              style={{backgroundColor:"#F0F0F0"}}
            />

            <label className="foam-label">Email</label>
            <input
              className='registinput'
              type="email"
              placeholder="Email"
              value={student.Email}
              readOnly
              style={{backgroundColor:"#F0F0F0"}}
            />
              <label className="foam-label">Date of birth</label>
            <input
              className='registinput'
              type="email"
              placeholder="Email"
              value={student.dateOfBirth}
              readOnly
              style={{backgroundColor:"#F0F0F0"}}
            />
              <label className="foam-label">License State</label>
            <input
              className='registinput'
              type="email"
              placeholder="Email"
              value={student.state}
              readOnly
              style={{backgroundColor:"#F0F0F0"}}
            />
             <label className="foam-label">License Number</label>
            <input
              className='registinput'
              type="email"
              placeholder="Email"
              value={student.licenseNumber}
              readOnly
              style={{backgroundColor:"#F0F0F0"}}
            />

            <label className="foam-label">Existing password</label>
            <input
              className='registinput'
              type="text"
              placeholder="Existing Password"
              value={student.password}
              onChange={(e) => setExistingPassword(e.target.value)}
              readOnly
            />

            <label className="foam-label">New password</label>
            <input
              className={`registinput ${errors.newPassword ? 'error-border' : ''}`}
              type="text"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            {errors.newPassword && <div className="error-message">{errors.newPassword}</div>}

            <label className="foam-label">Confirm password</label>
            <input
              className={`registinput ${errors.confirmPassword ? 'error-border' : ''}`}
              type="text"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
          </form>
          <div className='buttonsave'>
              <button className="btn-warning" onClick={handleSave}>
            Save
          </button>
          </div>
        </div>
      </div>
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
  <span className="message">Password changed successfully</span><br></br>
  <span className="exp">Now you can start your course</span>
<button className="buybtn" onClick={()=>{handleNavigationClick("information")}}>Start now</button>
</div>
       </Modal>
    </>
  );
}

export default StudentRegistration;
