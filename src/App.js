import React, { useState } from 'react';
import './App.css';

export default function EncounterBoard() {
  return (
    <div className="encounter-board">
      <h1>Dave's Encounter Tracker</h1>
      <EncounterTable combatants={COMBATANTS} />
    </div>
  )
}

function EncounterTable({ combatants }){
  const [combatantState, setCombatantState] = useState(combatants);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleDeletedCombatant = (combatantName) => {
    const updatedCombatants = combatantState.filter((combatant) => combatant.name !== combatantName);
    setCombatantState(updatedCombatants);
    console.log("Deleted combatant:", combatantName);
  };

  const handleToggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const handleInputChange = (event, index, field) => {
    const { value } = event.target;
    setCombatantState((prevCombatants) => {
      const updatedCombatants = [...prevCombatants];
      updatedCombatants[index][field] = value;
      return updatedCombatants;
    });
  };
  
  const processFormData = (formData) => {
    const newCombatant = {
      id: Date.now(), // Generate a unique ID (you can use a library like uuid for a more reliable unique ID)
      name: formData.name,
      initiative: parseInt(formData.initiative),
      type: formData.type,
      currenthp: parseInt(formData.hitpoints),
      totalhp: parseInt(formData.hitpoints),
    };

    setCombatantState((prevCombatants) => [...prevCombatants, newCombatant]);
  };

  const sortedCombatants = combatantState.slice().sort((a, b) => b.initiative - a.initiative);
  
  const rows = sortedCombatants.map((combatant, index) => (
    <Combatant
      key={combatant.name}
      combatant={combatant}
      onDeleteCombatant={handleDeletedCombatant}
      isEditMode={isEditMode}
      onInputChange={(event, field) => handleInputChange(event, index, field)}
    />
  
  ));
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Initiative</th>
            <th>Type</th>
            <th>Hit Points</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
      <button onClick={handleToggleEditMode}>
        {isEditMode ? "Save" : "Edit Mode"}
      </button>
      <div>
        <h2>Add New Combatant</h2>
        <AddCombatant onSubmitForm={processFormData} />
      </div>
    </div>
  )
}

function AddCombatant({ onSubmitForm }) {
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

function Combatant({ combatant, onDeleteCombatant, isEditMode }){
  const [editedCombatant, setEditedCombatant] = useState(combatant);

  const handleDeleteClick = () => {
    // Call the onDeleteCombatant function with the combatant's name
    onDeleteCombatant(combatant.name);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedCombatant((prevCombatant) => ({
      ...prevCombatant,
      [name]: value,
    }));
  };
  return(
      <tr id={combatant.id}>
        <td>
          <input
            type="text"
            name="name"
            value={editedCombatant.name}
            onChange={handleInputChange}
            readOnly={!isEditMode}
          />
        </td>
        <td>
          <input
            type="number"
            name="initiative"
            value={editedCombatant.initiative}
            onChange={handleInputChange}
            readOnly={!isEditMode}
          />
        </td>
        <td>
          <input
            type="text"
            name="type"
            value={editedCombatant.type}
            onChange={handleInputChange}
            readOnly={!isEditMode}
          />
        </td>
        <td>
          <input
            type="number"
            name="currenthp"
            value={editedCombatant.currenthp}
            onChange={handleInputChange}
            readOnly={!isEditMode}
          />
          /
          <input
            type="number"
            name="totalhp"
            value={editedCombatant.totalhp}
            onChange={handleInputChange}
            readOnly={!isEditMode}
          />
        </td>
        <td><button onClick={handleDeleteClick}>Delete</button></td>
      </tr>
  )
}

const COMBATANTS = [
  {id: 1, name: "Dolor", initiative: 10, type: "player", currenthp: 25, totalhp: 25},
  {id: 2, name: "Gven", initiative: 15, type: "player", currenthp: 35, totalhp: 35},
  {id: 3, name: "Brindle", initiative: 7, type: "player", currenthp: 20, totalhp: 20},
  {id: 4, name: "Mond", initiative: 18, type: "player", currenthp: 22, totalhp: 22},
  {id: 5, name: "Gnoll", initiative: 3, type: "enemy", currenthp: 8, totalhp: 8},
  {id: 6, name: "Gnoll Pack Lord", initiative: 8, type: "enemy", currenthp: 8, totalhp: 32},
  {id: 7, name: "Lyra Swiftarrow", initiative: 21, type: "npc", currenthp: 45, totalhp: 45}
];