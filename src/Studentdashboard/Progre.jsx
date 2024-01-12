import React, { useState } from 'react';

function Progre() {
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [state, setState] = useState('');

  const [errors, setErrors] = useState({});

  const handleSave = () => {
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

    if (!dateOfBirth.trim()) {
      errors.dateOfBirth = 'Date of birth is required';
    }

    if (!licenseNumber.trim()) {
      errors.licenseNumber = 'License number is required';
    }

    if (!state.trim()) {
      errors.state = 'State is required';
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
            <input
              className={`registinput ${errors.dateOfBirth ? 'error-border' : ''}`}
              type="text"
              placeholder="Date of Birth"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
            {errors.dateOfBirth && <div className="error-message">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
<path d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z" stroke="#FE2727" stroke-width="1.5" stroke-miterlimit="10"/>
<path d="M8 5V8.5" stroke="#FE2727" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8 11.5C8.41421 11.5 8.75 11.1642 8.75 10.75C8.75 10.3358 8.41421 10 8 10C7.58579 10 7.25 10.3358 7.25 10.75C7.25 11.1642 7.58579 11.5 8 11.5Z" fill="#FE2727"/>
</svg>{errors.dateOfBirth}</div>}

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
          <button className="btn-warning" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </>
  );
}

export default Progre;
