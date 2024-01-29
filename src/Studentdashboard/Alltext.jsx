import React, { useState } from 'react';

const NameToOptions = ({ names }) => {
  const formatNameToOption = (inputName) => {
    return { value: inputName, label: inputName };
  };

  const options = names.map(formatNameToOption);

  return (
    <div>
      <h1>Generated Options:</h1>
      <pre>{JSON.stringify(options, null, 2)}</pre>
    </div>
  );
};

const App = () => {
  const [inputNames, setInputNames] = useState([]);

  const handleInputChange = (event) => {
    const capitalizedNames = event.target.value
      .split('\n')
      .map(name => name.trim())
      .map(name => name.replace(/\b\w/g, firstLetter => firstLetter.toUpperCase()));

    setInputNames(capitalizedNames);
  };

  return (
    <div>
      <h1>Enter Names:</h1>
      <textarea
        value={inputNames.join('\n')}
        onChange={handleInputChange}
        placeholder="Enter names (one per line)"
        rows={10}
        cols={30}
        style={{ border: "2px solid black" }}
      />
      <NameToOptions names={inputNames} />
    </div>
  );
};

export default App;
