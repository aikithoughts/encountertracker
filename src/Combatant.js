import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
  
 export default function Combatant({ combatant, onDeleteCombatant, isEditMode, isSelected, onSelectCombatant }){
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
        <tr
          id={combatant.id}
          style={{ backgroundColor: isSelected ? 'lightblue' : 'inherit' }}
          onClick={onSelectCombatant}>
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
          <td><Button variant="warning" onClick={handleDeleteClick}>Delete</Button></td>
        </tr>
    )
  }