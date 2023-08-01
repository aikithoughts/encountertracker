import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Combatant from './Combatant';
import AddCombatant from './AddCombatant';

export default function EncounterTable({ combatants }){
    const [combatantState, setCombatantState] = useState(combatants || []);
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedCombatantId, setSelectedCombatantId] = useState(null);
  
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
        isSelected={selectedCombatantId === combatant.id}
        onSelectCombatant={() => setSelectedCombatantId(combatant.id)}
      />
    
    ));
    return (
      <div>
        <Table striped bordered hover>
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
        </Table>
        <Button variant="primary" onClick={handleToggleEditMode}>
          {isEditMode ? "Save" : "Edit Mode"}
        </Button>
        <div>
          <h2>Add New Combatant</h2>
          <AddCombatant onSubmitForm={processFormData} />
        </div>
      </div>
    )
  }