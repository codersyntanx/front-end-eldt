import React, { useState } from 'react';
import './Register.css';

function StudentRegistration() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [existingPassword, setExistingPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errors, setErrors] = useState({});

  const handleSave = () => {
    const errors = {};

    if (!firstName.trim()) {
      errors.firstName = 'First name is required';
    }

    if (!lastName.trim()) {
      errors.lastName = 'Last name is required';
    }

    if (!email.trim()) {
      errors.email = 'Email is required';
    }

    if (!existingPassword.trim()) {
      errors.existingPassword = 'Existing password is required';
    }

    if (!newPassword.trim()) {
      errors.newPassword = 'New password is required';
    }

    if (newPassword !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(errors).length === 0) {
      // Perform save operation or API call here
      console.log('Form is valid. Perform save operation.');
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
              className={`registinput ${errors.firstName ? 'error-border' : ''}`}
              type="text"
              placeholder="Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            {errors.firstName && <div className="error-message">{errors.firstName}</div>}

            <label className="foam-label">Last name</label>
            <input
              className={`registinput ${errors.lastName ? 'error-border' : ''}`}
              type="text"
              placeholder="Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            {errors.lastName && <div className="error-message">{errors.lastName}</div>}

            <label className="foam-label">Email</label>
            <input
              className={`registinput ${errors.email ? 'error-border' : ''}`}
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <div className="error-message">{errors.email}</div>}

            <label className="foam-label">Existing password</label>
            <input
              className={`registinput ${errors.existingPassword ? 'error-border' : ''}`}
              type="text"
              placeholder="Existing Password"
              value={existingPassword}
              onChange={(e) => setExistingPassword(e.target.value)}
            />
            {errors.existingPassword && <div className="error-message">{errors.existingPassword}</div>}

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
          <button className="btn-warning" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </>
  );
}

export default StudentRegistration;
