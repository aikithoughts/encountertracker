import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
  
 export default function Combatant({ combatant, onDeleteCombatant, isEditMode, isSelected, onSelectCombatant, onDataFromChild }){

    const [editedCombatant, setEditedCombatant] = useState(combatant);
  
    const handleDeleteClick = () => {
      // Call the onDeleteCombatant function with the combatant's name
      onDeleteCombatant(combatant.name);
    };

    const apiUrl = 'https://www.dnd5eapi.co/api/monsters/';
  
    const handleFetchClick = async (name) => {
      try {
        const response = await axios.get(apiUrl + name.replace(/ /g, "-").toLowerCase());
        onDataFromChild(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const renderFetchButton = (name) => (
      <Button
        variant="info"
        onClick={() => handleFetchClick(name)}
        value="name">
        Fetch
      </Button>
    )
  
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setEditedCombatant((prevCombatant) => ({
        ...prevCombatant,
        [name]: value,
      }));
    };

    const inputFields = [
      { name: 'name', type: 'text', readOnly: !isEditMode },
      { name: 'initiative', type: 'number', readOnly: !isEditMode },
      { name: 'type', type: 'text', readOnly: !isEditMode },
      { name: 'currenthp', type: 'number', readOnly: !isEditMode },
      { name: 'totalhp', type: 'number', readOnly: !isEditMode },
    ];

    const renderCombatant = (field) => {
      if (isEditMode) {
        return (
          <input
            type={field.type}
            name={field.name}
            value={editedCombatant[field.name]}
            onChange={handleInputChange}
          />
        )
      } else {
        return <span>{editedCombatant[field.name]}</span>
      }
    }


    return(
        <tr
          id={editedCombatant.id}
          onClick={onSelectCombatant}>
          {inputFields.map((field, index) => (
            <td key={index}>{renderCombatant(field)}</td>
          ))}
          <td>
            <Button variant="warning" onClick={handleDeleteClick}>Delete</Button> {' '}
            {(combatant.type === "enemy") ? renderFetchButton(combatant.name) : ''}
          </td>
        </tr>
    )
  }