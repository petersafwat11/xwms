import React, { useState } from 'react';
import Dropdown from './Dropdown';

const DropdownTest = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  
  // Sample options with a mix of values
  const options = [
    "Apple",
    "Banana",
    "Cherry",
    "Durian",
    "Elderberry",
    "Fig",
    "Grape",
    "Honeydew",
    "Jackfruit",
    "Kiwi",
    "Lemon",
    "Mango",
    "Nectarine",
    "Orange",
    "Papaya",
    "Quince",
    "Raspberry",
    "Strawberry",
    "Tangerine",
    "Ugli fruit",
    "Vanilla bean",
    "Watermelon",
    "Xigua",
    "Yellow watermelon",
    "Zucchini"
  ];

  const handleChange = (option) => {
    setSelectedOption(option);
    console.log("Selected option:", option);
  };

  return (
    <div style={{ maxWidth: '400px', margin: '40px auto', padding: '20px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
      <h2>Dropdown with Search Test</h2>
      <p>Try typing in the dropdown to filter options</p>
      
      <Dropdown
        options={options}
        placeholder="Select a fruit"
        onChange={handleChange}
        value={selectedOption}
        label="Fruit Selection"
        required={true}
        id="fruit-dropdown"
      />
      
      {selectedOption && (
        <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f0f7ff', borderRadius: '4px' }}>
          <p><strong>Selected fruit:</strong> {selectedOption}</p>
        </div>
      )}
    </div>
  );
};

export default DropdownTest;
