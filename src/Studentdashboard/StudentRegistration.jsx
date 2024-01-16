import React, { useEffect, useState } from 'react';
import './Register.css';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
function StudentRegistration() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [existingPassword, setExistingPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userId, setUserId]=useState("")
  const [student, setStudent]=useState("")

  const [errors, setErrors] = useState({});


  useEffect(() => {
    const personId = localStorage.getItem("userId");
    if (personId) {
      const decoded = jwtDecode(personId);
      setUserId(decoded.id);
      fetchUserInfo();
    }
  }, [userId]);
  
  const fetchUserInfo = () => {
    axios.get(`http://localhost:3003/studentbyid/${userId}`)
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
        axios.put(`http://localhost:3003/api/putstudent/${userId}`,{
        password :newPassword
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
        <div className="card-head">My Account</div>
        <div className="card-body">
          <form>
            <label className="foam-label">First name</label>
            <input
              className="registinput"
              type="text"
              placeholder="Name"
              value={student.firstName}
              readOnly
            />

            <label className="foam-label">Last name</label>
            <input
              className='registinput'
              type="text"
              placeholder="Name"
              value={student.lastName}
              readOnly
            />

            <label className="foam-label">Email</label>
            <input
              className='registinput'
              type="email"
              placeholder="Email"
              value={student.Email}
              readOnly
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
    </>
  );
}

export default StudentRegistration;
