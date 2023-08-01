import React, { useState } from 'react';

export default function AddCombatant({ onSubmitForm }) {
    const [formData, setFormData] = useState({
      name: '',
      initiative: 0,
      type: '',
      hitpoints: 0
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmitForm(formData); // Call the callback function to pass the form data to the parent component
      setFormData({  // Reset the form after submission
        name: '',
        initiative: 0,
        type: '',
        hitpoints: 0
      });
    };
  
    return (
      <form id="addCombatantForm" onSubmit={handleSubmit}>
        <label>Name:
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <label>Initiative:
          <input type="number" id="initiative" value={formData.initiative} onChange={handleChange} name="initiative" required />
        </label>
        <label>Type:
          <input type="text" id="type" value={formData.type} onChange={handleChange} name="type" required />
        </label>
        <label>Hit Points:
          <input type="number" id="hitPoints" value={formData.hitpoints} onChange={handleChange} name="hitpoints" required />
        </label>
        <button type="submit">Add Combatant</button>
      </form>
    );
  }