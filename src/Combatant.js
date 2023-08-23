import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { ArrowRightCircleFill } from 'react-bootstrap-icons';
import { EmojiDizzy } from 'react-bootstrap-icons';
import { XCircleFill } from 'react-bootstrap-icons';
import { Download } from 'react-bootstrap-icons';
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
      <Download
        onClick={() => handleFetchClick(name)}
        value="name"
        className="text-info mr-2"
        size={20}>
      </Download>
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
          onClick={() => onSelectCombatant(editedCombatant.id)}
          >
          <td>
            {isSelected && <ArrowRightCircleFill className="text-success mr-2" size={20}/>}{' '}
            {editedCombatant.currenthp <= 0 && <EmojiDizzy size={20}/>}
          </td>
          {inputFields.map((field, index) => (
            <td key={index}>
            {renderCombatant(field)}
          </td>
          ))}
          <td>
            <XCircleFill className="text-danger mr-2" size={20} onClick={handleDeleteClick}/> {' '}
            {(combatant.type === "enemy") ? renderFetchButton(combatant.name) : ''}
          </td>
        </tr>
    )
  }