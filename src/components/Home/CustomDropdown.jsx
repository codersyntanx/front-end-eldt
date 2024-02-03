import React, { useState } from 'react';

function CustomSelect({ options, handleLanguageChange, planId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    handleLanguageChange(option, planId);
    setIsOpen(false);
  };

  return (
    <div className="custom-select">
      <div className="selected-option" onClick={toggleDropdown}>
        <img src={selectedOption.image} alt={selectedOption.label} className="language-image" />
        <span>{selectedOption.label}</span>
      </div>
      {isOpen && (
        <div className="options dropoptions">
          {options.map((option) => (
            <div key={option.value} className="option" onClick={() => handleOptionSelect(option)}>
              <img src={option.image} alt={option.label} className="language-image" />
              <span>{option.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CustomSelect;
